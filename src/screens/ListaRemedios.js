import { View, Text, FlatList, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'
import CardProdutoPerFarmacia from '../components/CardProdutoPerFarmacia'
import { getRemediosByUser } from '../utils/CrudRemedioProvider'
import { getAuth } from 'firebase/auth'
import { Ramabhadra_400Regular } from '@expo-google-fonts/dev'

export default function ListaRemedios(props) {

  const { navigation } = props

  const [remedios, setRemedios] = useState({})

  useLayoutEffect(() => {
    const auth = getAuth()
    getRemediosByUser(auth.currentUser.uid)
      .then((remedios) => { setRemedios(remedios) })
      .catch((error) => Alert.alert("erro ao procurar os remédios: " + error))

  }, [])

  return (
    <View style={Styles.container}>
      <Header
        width={40}
        height={40}
        spaceBetween={90}
        headerTittle={"PRODUTOS"}
        useConfig={true}
        navigation={navigation}
      />

      <FlatList
        data={remedios}
        renderItem={({ item }) => {

          return (
            <CardProdutoPerFarmacia
              remedio={item}
              navigation={navigation}
            >


            </CardProdutoPerFarmacia>
          )
        }}
        keyExtractor={item => item.id}
      />

      <Tail navigation={navigation} />
    </View>
  )
}