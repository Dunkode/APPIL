import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'
import { getAuth } from 'firebase/auth'
import { StatusBar } from 'expo-status-bar'
import { Dialog } from 'react-native-paper'

import Styles from '../components/StyleComponent'
import Tail from '../components/Tail'
import Header from '../components/Header'
import { getAllFarmacias } from '../utils/CrudFarmaciaProvider'
import { getRemediosByUserAndFarmacia } from '../utils/CrudRemedioProvider'
import ProdutoCard from '../components/ProdutoCard'
import StatusDialog from '../components/StatusDialog'

export default function MapsFarmacias(props) {

  const { navigation } = props

  const [myLocation, setMyLocation] = useState()
  const [farmaciasCadastradas, setFarmaciasCadastradas] = useState([])
  const [farmaciaSelecionada, setFarmaciaSelecionada] = useState({})
  const [remediosFarmaciaSelecionada, setRemediosFarmaciaSelecionada] = useState([])
  const [visible, setVisible] = useState(false)
  const [dlgStatusVisible, setDlgStatusVisible] = useState(false)
  const [errorInForm, setErrorInForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])

  let nomeFarmacia = farmaciaSelecionada.data ? farmaciaSelecionada.data().nome : undefined

  const requestMyPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      return
    } else {
      let location = await Location.getCurrentPositionAsync({})
      setMyLocation(location)
    }

  }

  const onSelectFarmacia = async (farmacia) => {
    const auth = getAuth()
    setFarmaciaSelecionada(farmacia)
    getRemediosByUserAndFarmacia(farmacia.id, auth.currentUser.uid)
      .then((remedios) => {
        setRemediosFarmaciaSelecionada(remedios)
        setVisible(!visible)
      })
      .catch((error) => {
        setDlgStatusVisible(true)
        setErrorInForm(true)
        console.log(error)
        setErrorMessage([{"id": 10, "message": "Erro ao procurar Remédios: " + error}])

      })

  }

  useLayoutEffect(() => {
    requestMyPosition()

    getAllFarmacias()
      .then((lista) => setFarmaciasCadastradas(lista))
      .catch((error) => {
        setDlgStatusVisible(true)
        setErrorInForm(true)
        setErrorMessage([{"id": 11, "message": "Erro ao consultar Farmácias: " + error.erro}])
      })

  }, [])


  if (myLocation) {
    return (
      <View style={[Styles.container, Styles.centralize]}>
        <Header
          width={40}
          height={40}
          spaceBetween={10}
          headerTittle={"FARMÁCIAS DISPONÍVEIS"}
          useConfig={false}
        >

        </Header>
        <MapView
          style={Styles.mapVisualization}
          initialRegion={{
            latitude: myLocation.coords.latitude,
            longitude: myLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}>

          {myLocation && <Marker
            coordinate={
              {
                latitude: myLocation.coords.latitude,
                longitude: myLocation.coords.longitude
              }
            }
            title={"Sua Localização"}
          />}

          {farmaciasCadastradas.map((farmacia, key) => {
            return (
              <Marker
                key={key}
                coordinate={{
                  latitude: farmacia.data().lat,
                  longitude: farmacia.data().long
                }}
                title={farmacia.data().nome}
                onPress={() => {
                  onSelectFarmacia(farmacia)
                }}
              />
            )
          })}
        </MapView>

        <Tail navigation={navigation}></Tail>

        <Dialog
          visible={visible}
          onDismiss={() => setVisible(!visible)}
          style={Styles.dialog}>
          <Dialog.Title style={Styles.textMinor}>Produtos da {nomeFarmacia}: </Dialog.Title>
          <Dialog.ScrollArea>
            {remediosFarmaciaSelecionada.length > 0 ?
              <FlatList
                data={remediosFarmaciaSelecionada}
                renderItem={({ item }) => {
                  return (
                    <ProdutoCard
                      remedio={item.data()}
                    >
                    </ProdutoCard>
                  )
                }}
                keyExtractor={item => item.id}>

              </FlatList>
              :
              <Text style={Styles.textMinor}>
                Sem remédios cadastrados para {nomeFarmacia}
              </Text>
            }

          </Dialog.ScrollArea>
        </Dialog>

        <StatusDialog
          visible={dlgStatusVisible}
          isSucess={!errorInForm}
          content={errorMessage}
          disableFunction={() => setDlgStatusVisible(false)}
        >

        </StatusDialog>
      </View>
    )
  } else {
    return (
      <View style={[Styles.container, Styles.centralize]}>
        <Text>Carregando mapa...</Text>
        <StatusBar></StatusBar>

      </View>
    )
  }
}