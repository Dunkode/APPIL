import { View, Text, Alert } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'
import { Image } from '@rneui/themed/dist/Image'
import { deleteRemedio } from '../utils/CrudRemedioProvider'

export default function CardProdutoPerFarmacia(props) {
    const { navigation } = props
    const remedio = props.remedio

    const editarRemedio = () => {
        navigation.push("CadastroRemedio", remedio)
    }

    const deletarRemedio = (remedio) => {
        deleteRemedio(remedio)
        .then(() => Alert.alert("Remédio " + remedio.nomeGenerico + " excluído com sucesso!"))
        .catch((error) => Alert.alert("Erro ao deletar remédio:\n" + error))
    }

    return (
        <View style={[Styles.cardProdContainer]}>
            <Image
                source={require("../../assets/medicine.png")}
                style={{
                    width: 60,
                    height: 60,
                    margin: 10,
                }}
            />
            <View style={{ flex: 1 }}>
                <Text style={Styles.textLarge}>{remedio.nomeGenerico}</Text>
                <Text style={Styles.textMinor}>{remedio.nomeComercial}</Text>
            </View>

            <View style={{ alignSelf: "flex-end", flex: 1 }}>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Image
                        source={require("../../assets/botao-editar.png")}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 10
                        }}
                        onPress={() => editarRemedio()}
                    />
                    <Image
                        source={require("../../assets/lixeira.png")}
                        style={{
                            width: 30,
                            height: 30,
                            margin: 10
                        }}
                        onPress={() => deletarRemedio(remedio)}
                    />
                </View>

                <View style={[Styles.centralize, { backgroundColor: "#6CCFB7", borderRadius: 10, margin: 10 }]}>
                    <Text style={Styles.textMinor}>Valor: {remedio.valor}</Text>
                    <Text style={Styles.textMinor}>Quantidade: {remedio.quantidade}</Text>

                </View>
            </View>

        </View>
    )
}