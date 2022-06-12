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

        <Tail navigation={navigation}></Tail>
        </View>
    )
}