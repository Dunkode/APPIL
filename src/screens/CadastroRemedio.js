import { View, Text, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Image } from '@rneui/themed'
import { getAuth } from 'firebase/auth'
import { Button, Checkbox, Dialog } from 'react-native-paper'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'
import { saveRemedio } from '../utils/CrudRemedioProvider'
import { getAllFarmacias } from '../utils/CrudFarmaciaProvider'
import formValidator from '../utils/FormValidator'
import StatusDialog from '../components/StatusDialog'


export default function CadastroRemedio(props) {
    const auth = getAuth()
    const { navigation } = props
    const { route } = props

    const remedioEdition = route.params

    const [nomeGenerico, setNomeGenerico] = useState(remedioEdition ? remedioEdition.nomeGenerico : "")
    const [nomeComercial, setNomeComercial] = useState(remedioEdition ? remedioEdition.nomeComercial : "")
    const [valor, setValor] = useState(remedioEdition ? remedioEdition.valor : undefined)
    const [quantidade, setQuantidade] = useState(remedioEdition ? remedioEdition.quantidade : undefined)
    const [farmacia, setFarmacia] = useState(remedioEdition ? remedioEdition.farmacia : "")
    const [idFarmacia, setIdFarmacia] = useState(remedioEdition ? remedioEdition.idFarmacia : "")
    const [checked, setChecked] = useState(remedioEdition ? remedioEdition.promocao : false)

    const [dlgFarmVisible, setDlgFarmVisible] = useState(false)

    const [dlgStatusVisible, setDlgStatusVisible] = useState(false)
    const [errorInForm, setErrorInForm] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])

    const [farmaciasCadastradas, setFarmaciasCadastradas] = useState([])

    useLayoutEffect(() => {
        getAllFarmacias()
            .then((lista) => setFarmaciasCadastradas(lista))
            .catch((error) => {
                setDlgStatusVisible(true)
                setErrorInForm(true)
                setErrorMessage([{ "id": 10, "message": "Erro ao procurar Farmácias: " + error }])
            })
    }, [])


    const formObject = () => {
        return [
            {
                "form": nomeGenerico,
                "formName": "Nome Genérico",
                "message": "Deve conter ao menos 4 caracteres!",
                "rule": (nomeGenerico.length < 4)
            },
            {
                "form": nomeComercial,
                "formName": "Nome Comercial",
                "message": "Deve conter ao menos 4 caracteres!",
                "rule": (nomeComercial.length < 4)
            },
            {
                "form": valor,
                "formName": "Valor",
            },
            {
                "form": quantidade,
                "formName": "Quantidade",
            },
            {
                "form": farmacia,
                "formName": "Farmácia",
            },
        ]
    }

    const enviarDados = () => {
        let forms = formObject()
        let { haveError, listOfErrors } = formValidator(forms)

        if (!haveError) {
            const dados = remedioEdition ?
                {
                    "id": remedioEdition.id,
                    "nomeGenerico": nomeGenerico,
                    "nomeComercial": nomeComercial,
                    "valor": valor,
                    "quantidade": quantidade,
                    "promocao": checked,
                    "farmacia": farmacia,
                    "idFarmacia": idFarmacia
                }
                :
                {
                    "nomeGenerico": nomeGenerico,
                    "nomeComercial": nomeComercial,
                    "valor": valor,
                    "quantidade": quantidade,
                    "promocao": checked,
                    "farmacia": farmacia,
                    "idFarmacia": idFarmacia
                }

            saveRemedio(dados, auth.currentUser.uid)
                .then(() => {
                    setDlgStatusVisible(true)
                    setErrorInForm(false)
                    setErrorMessage([{ "id": 10, "message": `Remédio ${nomeGenerico} ${remedioEdition ? "editado" : "cadastrado"} com sucesso!` }])
                    limpaForm()
                })
                .catch((error) => {
                    setDlgStatusVisible(true)
                    setErrorInForm(true)
                    setErrorMessage([{ "id": 11, "message": "Erro ao enviar dados: " + error }])
                })
        } else {
            setDlgStatusVisible(true)
            setErrorInForm(true)
            setErrorMessage(listOfErrors)
        }
    }

    const limpaForm = () => {
        setNomeComercial("")
        setNomeGenerico("")
        setValor(undefined)
        setQuantidade(undefined)
        setFarmacia("")
        setIdFarmacia("")
        setChecked(false)
    }

    return (
        <View style={[Styles.container, Styles.centralize]}>

            <Header
                width={40}
                height={40}
                headerTittle={remedioEdition ? "EDIÇÃO" : "CADASTRO"}
                spaceBetween={80}
                useConfig={false}
            >

            </Header>

            <ScrollView style={[Styles.textInputContainer]}>

                <TextInput
                    placeholder='Nome Genérico'
                    value={nomeGenerico}
                    onChangeText={(g) => setNomeGenerico(g)}
                    style={Styles.textInput}

                />

                <TextInput
                    placeholder='Nome Comercial'
                    value={nomeComercial}
                    onChangeText={(c) => setNomeComercial(c)}
                    style={Styles.textInput}
                />

                <TextInput
                    placeholder='Valor'
                    value={valor}
                    onChangeText={(v) => setValor(v)}
                    style={Styles.textInput}
                />
                <TextInput
                    placeholder='Quantidade'
                    value={quantidade}
                    onChangeText={(q) => setQuantidade(q)}
                    style={Styles.textInput}
                />


                <View style={[Styles.centralize, { flexDirection: "row" }]}>

                    <TextInput
                        placeholder='Farmácia'
                        value={farmacia}
                        onChangeText={(f) => setFarmacia(f)}
                        style={[Styles.textInput, { width: "82%" }]}
                        editable={false}
                    />
                    <Image
                        source={require("../../assets/google-maps.png")}
                        style={{ width: 40, height: 40, }}
                        onPress={() => {
                            setDlgFarmVisible(!dlgFarmVisible)
                        }}
                    />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(!checked)
                        }}
                        color="#6CCFB7"
                    />
                    <Text style={Styles.textLarge}>Promoção</Text>

                </View>

                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textMinor}
                    color='#6CCFB7'
                    onPress={() => enviarDados()}
                >
                    {remedioEdition ? "Editar" : "Cadastrar"}
                </Button>
            </ScrollView>

            <Dialog
                visible={dlgFarmVisible}
                onDismiss={() => setDlgFarmVisible(!dlgFarmVisible)}
                style={Styles.dialog}>
                <Dialog.Title style={Styles.textMinor}>Selecione uma farmácia</Dialog.Title>
                <Dialog.Content>
                    <FlatList
                        data={farmaciasCadastradas}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setFarmacia(item.data().nome)
                                    setIdFarmacia(item.id)
                                    setDlgFarmVisible(!dlgFarmVisible)
                                }}>
                                    <Text
                                        style={Styles.textLarge}
                                    >
                                        {item.data().nome}

                                    </Text>
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={item => item.id}>

                    </FlatList>

                </Dialog.Content>
            </Dialog>

            <Tail navigation={navigation} />

            <StatusDialog
                visible={dlgStatusVisible}
                isSucess={!errorInForm}
                content={errorMessage}
                disableFunction={() => setDlgStatusVisible(false)}
            >

            </StatusDialog>
        </View>
    )
}