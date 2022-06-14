import { View, Text } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'

export default function ProdutoCard(props) {
    const remedio = props.remedio
    console.log(remedio)
    return (
        <View style={Styles.cardContainer}>
            <View style={{marginStart:10}}>
                <Text style={Styles.textMinor}>Nome Genérico: {remedio.nomeGenerico}</Text>
                <Text style={Styles.textMinor}>Nome Comercial: {remedio.nomeComercial}</Text>
                <Text style={Styles.textMinor}>Valor: {remedio.valor}</Text>
                <Text style={Styles.textMinor}>Quantidade na embalagem: {remedio.quantidade}</Text>
                <Text style={Styles.textMinor}>Promoção: {remedio.promocao ? "Sim" : "Não"}</Text>
            </View>
        </View>
    )
}