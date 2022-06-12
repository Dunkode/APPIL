import { View, Text, TextInput, Alert, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'
import { Button, Checkbox, Dialog } from 'react-native-paper'
import { createRemedio } from '../utils/CrudRemedioProvider'
import { Image } from '@rneui/themed'
import { getAllFarmacias } from '../utils/CrudFarmaciaProvider'

export default function CadastroRemedio(props) {
    const { navigation } = props

    const [nomeGenerico, setNomeGenerico] = useState("")
    const [nomeComercial, setNomeComercial] = useState("")
    const [valor, setValor] = useState()
    const [quantidade, setQuantidade] = useState()
    const [farmacia, setFarmacia] = useState("")
    const [idFarmacia, setIdFarmacia] = useState("")
    const [checked, setChecked] = useState(false)
    const [visible, setVisible] = useState(false)
    const [farmaciasCadastradas, setFarmaciasCadastradas] = useState([])

    const auth = getAuth()

    useLayoutEffect(() => {
        getAllFarmacias()
            .then((lista) => setFarmaciasCadastradas(lista))
            .catch((error) => Alert.alert("Erro ao consultar Farmácias:" + error))
    }, [])

    const verificaForm = () => {
        if (nomeGenerico && nomeComercial && valor && quantidade && farmacia) {
            const dados = {
                "nomeGenerico": nomeGenerico,
                "nomeComercial": nomeComercial,
                "valor": valor,
                "quantidade": quantidade,
                "promocao": checked,
                "farmacia": farmacia,
                "idFarmacia": idFarmacia
            }
            createRemedio(dados, auth.currentUser.uid)
                .then(() => {
                    Alert.alert("Cadastro do remédio " + nomeGenerico + " criado com sucesso!")
                    limpaForm()
                })
                .catch((error) => Alert.alert("Erro ao cadastrar o remédio " + nomeGenerico + ":\n" + error))
        } else {
            Alert.alert("Preencha todos os dados do formulário!")
        }
    }

    const limpaForm = () => {
        setNomeComercial("")
        setNomeGenerico("")
        setValor()
        setQuantidade()
        setFarmacia("")
        setIdFarmacia("")
        setChecked(false)
    }

    // }

    return (
        <View style={[Styles.container, Styles.centralize]}>

            <Header
                width={40}
                height={40}
                headerTittle="CADASTRO"
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
                            setVisible(!visible)
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
                    onPress={() => verificaForm()}
                >
                    Cadastrar
                </Button>
            </ScrollView>

            <Dialog visible={visible} >
                <Dialog.Title>Selecione uma farmácia</Dialog.Title>
                <Dialog.Content>
                    <FlatList
                        data={farmaciasCadastradas}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setFarmacia(item.data().nome)
                                    setIdFarmacia(item.id)
                                    setVisible(!visible)
                                }}>
                                    <Text
                                        style={{ fontSize: 23, fontWeight: "bold" }}>

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
        </View>
    )
}