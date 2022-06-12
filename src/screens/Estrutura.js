import { Text, View } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'

export default function Estrutura(props) {
    const {navigation} = props
    return (
        <View style={Styles.container}>
            <Header
                width={40}
                height={40}
                spaceBetween={85}
                headerTittle={"ESTRUTURA"}
                useConfig={false}
            />

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    Diretório assets - Contém as imagens usadas no App
                </Text>

            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    Diretório src - Diretório base
                </Text>
            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    Diretório components - Contém os componentes utilizados no projeto
                </Text>
            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    Diretório config - Contém os arquivos de configuração
                </Text>
            </View>

            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    Diretório screens - Contém as telas do App, junto com toda sua lógica de exibição
                </Text>
            </View>
            <View style={Styles.buttonContainer}>
                <Text style={Styles.textMinor}>
                    Diretório utils - Contém códigos utilitarios, implementando funções de terceiros
                </Text>
            </View>

        <Tail navigation={navigation}></Tail>
        </View>
    )
}