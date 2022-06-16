import { View, FlatList, Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'

import Styles from '../components/StyleComponent'
import Header from '../components/Header'
import Tail from '../components/Tail'
import CardProdutoPerFarmacia from '../components/CardProdutoPerFarmacia'
import { getRemediosByUser } from '../utils/CrudRemedioProvider'
import { getAuth } from 'firebase/auth'
import StatusDialog from '../components/StatusDialog'

export default function ListaRemedios(props) {

  const { navigation } = props

  const [remedios, setRemedios] = useState({})

  const [dlgVisible, setDlgVisible] = useState(false)
  const [errorInForm, setErrorInForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])

  useLayoutEffect(() => {
    const auth = getAuth()
    getRemediosByUser(auth.currentUser.uid)
      .then((remedios) => { setRemedios(remedios) })
      .catch((error) => {
        setDlgVisible(true)
        setErrorInForm(true)
        setErrorMessage([{"id": 10, "message": "Erro ao procurar remédios: " + error}])
      })

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

      <StatusDialog
        visible={dlgVisible}
        isSucess={!errorInForm}
        content={errorMessage}
        disableFunction={() => setDlgVisible(false)}
      />

    </View>
  )
}