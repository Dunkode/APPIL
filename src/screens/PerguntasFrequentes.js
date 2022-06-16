import { Text, View } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'

export default function PerguntasFrequentes(props) {
    const {navigation} = props
    return (
        <View style={Styles.container}>
            <Header
                width={40}
                height={40}
                spaceBetween={85}
                headerTittle={"FAQ"}
                useConfig={false}
            />

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    A opção Cadastrar Remédios permite o usuário indicar o valor dos remédios e suas respectivas farmácias.
                </Text>

            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    A opção Ver Farmácias indica quais farmácias existentes na cidade e quais são os remédios que já foram associados
                </Text>
            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    A opção Procurar Remédios é utilizada para mostrar os remédios cadastrados, assim como editá-los ou excluí-los.
                </Text>
            </View>

        <Tail navigation={navigation}></Tail>
        </View>
    )
}