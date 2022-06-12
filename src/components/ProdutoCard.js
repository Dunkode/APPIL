import { View, Text } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'

export default function ProdutoCard(props) {
    const remedio = props.remedio
    console.log(remedio)
    return (
        <View style={Styles.cardContainer}>
            <Text>Nome Genérico: {remedio.nomeGenerico}</Text>
            <Text>Nome Comercial: {remedio.nomeComercial}</Text>
            <Text>Valor: {remedio.valor}</Text>
            <Text>Quantidade na embalagem: {remedio.quantidade}</Text>
            <Text>Promoção: {remedio.promocao ? "Sim" : "Não"}</Text>
        </View>
    )
}