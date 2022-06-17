import { Text, View } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'

export default function Sobre(props) {
    const {navigation} = props
    return (
        <View style={Styles.container}>
            <Header
                width={40}
                height={40}
                spaceBetween={85}
                headerTittle={"SOBRE"}
                useConfig={false}
            />

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textLarge}>
                    Desenvolvedores:
                </Text>

            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textLarge}>
                    Éderson Vidal - FullStack Developer
                </Text>
            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textLarge}>
                    Eduardo Bido - Design & Regras de negócio
                </Text>
            </View>

            <View style={[Styles.buttonContainer, {flex:2}]}>
                <Text style={Styles.textLarge}>
                    Modo utilizado: Expo
                </Text>
                <Text style={Styles.textMinor}>
                    O Expo trás uma enorme facilidade no quesito de testes do que está sendo desenvolvido, por permitir roda-lo no celular e na Web ao mesmo tempo e sem necessidade de cabos.
                </Text>
            </View>

        <Tail navigation={navigation}></Tail>
        </View>
    )
}