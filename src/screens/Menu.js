import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'

import Styles from '../components/StyleComponent'
import { Button } from 'react-native-paper'
import { Divider } from '@rneui/themed'
import Header from '../components/Header'
import { logoff } from '../utils/AuthenticationProvider'

export default function Menu(props) {

    const { navigation } = props

    const deslogar = async () => {
        try {
            await logoff()
            navigation.replace("Login")

        } catch (error) {
            Alert.alert("Erro ao fazer login: " + error)
        }
    }
    return (
        <View style={[Styles.container]}>
            <Header
                width={40}
                height={40}
                spaceBetween={111}
                headerTittle={"MENU"}
                useConfig={true}
                navigation={navigation}
            />

            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textLarge}
                    color='#6CCFB7'
                    onPress={() => { navigation.push("CadastroRemedio") }}>
                    Cadastrar remédio
                </Button>
            </View>

            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textLarge}
                    color='#6CCFB7'
                    onPress={() => navigation.push("MapsFarmacias")}>
                    Ver farmácia
                </Button>
            </View>

            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textLarge}
                    color='#6CCFB7'
                    onPress={() => { }}>
                    Procurar remédios
                </Button>
            </View>

            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textLarge}
                    color='#6CCFB7'
                    onPress={() => { navigation.push("PerguntasFrequentes") }}>
                    FAQ
                </Button>
            </View>

            <View style={Styles.textInEndContainer}>
                <Divider width={2} color='black' />
                <View style={[Styles.centralize, { flexDirection: 'row' }]}>

                    {/* <View style={[Styles.centralize, { height: "50%", backgroundColor: "#d2ece6", borderRadius: 10, marginRight: 20 }]}> */}
                    <TouchableOpacity
                        onPress={() => { navigation.push("Sobre") }}
                        style={{ backgroundColor: "#d2ece6", borderRadius: 10, marginRight: 20, padding: 3 }}
                    >
                        <Text style={[Styles.textMinor, { color: 'blue' }]}> Mais infomações </Text>
                    </TouchableOpacity>

                    {/* </View> */}

                    {/* <View style={[Styles.centralize, { marginLeft: 20 }]}> */}
                    <Button
                        mode="contained"
                        style={[Styles.button, { marginLeft: 20, width: 100}]}
                        uppercase={false}
                        labelStyle={Styles.textMinor}
                        color='#6CCFB7'
                        onPress={() => deslogar()}>
                        Logoff
                    </Button>

                    {/* </View> */}
                </View>
            </View>

        </View>

    )
}