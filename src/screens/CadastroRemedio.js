import { View, Text, TextInput, Alert, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { Image } from '@rneui/themed'
import { getAuth } from 'firebase/auth'
import { Button, Checkbox, Dialog } from 'react-native-paper'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'
import { saveRemedio } from '../utils/CrudRemedioProvider'
import { getAllFarmacias } from '../utils/CrudFarmaciaProvider'


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
    const [dlgErrorVisible, setDlgErrorVisible] = useState(false)
    const [errorDialog, setErrorDialog] = useState([])
    const [dlgSuccesVisible, setDlgSucessVisible] = useState(false)

    const [farmaciasCadastradas, setFarmaciasCadastradas] = useState([])

    useLayoutEffect(() => {
        getAllFarmacias()
            .then((lista) => setFarmaciasCadastradas(lista))
            .catch((error) => {
                Alert.alert("Erro ao consultar Farmácias:" + error)
                console.log(error)
            })
    }, [])

    const verificaForm = () => {
        let temErro = true
        let errorList = []

        if (nomeGenerico == "") {
            errorList.push({ "id": 1, "Genérico": "Nome genérico deve ser informado!" })
        }
        if (nomeGenerico.length < 4) {
            errorList.push({ "id": 2, "Genérico": "Nome genérico precisa ter ao menos 3 letras" })
        }

        if (nomeComercial == "") {
            errorList.push({ "id": 3, "Comerical": "Nome comercial deve ser informado!" })
        }
        if (nomeComercial.length < 4) {
            errorList.push({ "id": 4, "Comerical": "Nome comercial precisa ter ao menos 3 letras" })
        }

        if (!valor) {
            errorList.push({ "id": 5, "Valor": "Valor deve ser informado!" })
        }

        if (!quantidade) {
            errorList.push({ "id": 6, "Quantidade": "Quantidade deve ser informada!" })
        }

        if (farmacia == "") {
            errorList.push({ "id": 7, "Farmácia": "Fármacia deve ser selecionada!" })
        }

        if (errorList.length > 0) {
            temErro = true
        }

        return { temErro, errorList }
    }

    const enviarDados = () => {
        let { temErro, errorList } = verificaForm()

        console.log(temErro)

        if (!temErro) {
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

            console.log(dados)
            saveRemedio(dados, auth.currentUser.uid)
                .then(() => {
                    setDlgSucessVisible(!setDlgSucessVisible)
                    limpaForm()
                })
                .catch((error) => {
                    setErrorDialog([{ "id": 11, "Resultado": error }])
                    setDlgErrorVisible(!dlgErrorVisible)
                    console.log(error)
                })
        } else {
            const verificaForm = () => {
                let temErro = true
                let errorList = []

                if (nomeGenerico == "") {
                    errorList.push({ "id": 1, "Genérico": "Nome genérico deve ser informado!" })
                }
                if (nomeGenerico.length < 4) {
                    errorList.push({ "id": 2, "Genérico": "Nome genérico precisa ter ao menos 3 letras" })
                }

                if (nomeComercial == "") {
                    errorList.push({ "id": 3, "Comerical": "Nome comercial deve ser informado!" })
                }
                if (nomeComercial.length < 4) {
                    errorList.push({ "id": 4, "Comerical": "Nome comercial precisa ter ao menos 3 letras" })
                }

                if (!valor) {
                    errorList.push({ "id": 5, "Valor": "Valor deve ser informado!" })
                }

                if (!quantidade) {
                    errorList.push({ "id": 6, "Quantidade": "Quantidade deve ser informada!" })
                }

                if (farmacia == "") {
                    errorList.push({ "id": 7, "Farmácia": "Fármacia deve ser selecionada!" })
                }

                if (errorList.length > 0) {
                    temErro = true
                }

                return { temErro, errorList }
            }
            setErrorDialog(errorList)
            setDlgErrorVisible(!dlgErrorVisible)
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

            <Dialog
                visible={dlgErrorVisible}
                onDismiss={() => {
                    setDlgErrorVisible(!dlgErrorVisible)
                    setErrorDialog([])
                }}
                style={Styles.dialog}
            >
                <Dialog.Title title="Erro!" />
                <Dialog.ScrollArea>
                    {
                        errorDialog.map((item) => {
                            return (
                                <Text>{Object.keys(item)[1]}: {Object.values(item)[1]}</Text>
                            )
                        })
                    }
                </Dialog.ScrollArea>
            </Dialog>

            <Dialog
                visible={dlgSuccesVisible}
                onDismiss={() => setDlgSucessVisible(!dlgSuccesVisible)}
                style={Styles.dialog}
            >
                <Dialog.Title title="Sucesso!" />
                {
                    remedioEdition ?
                        <Text>Remédio {nomeGenerico} cadastrado com sucesso!</Text>
                        :
                        <Text>Remédio {nomeGenerico} editado com sucesso!</Text>
                }

            </Dialog>

        </View>
    )
}