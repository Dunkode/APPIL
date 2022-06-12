import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import * as Location from "expo-location"
import MapView, { Marker } from 'react-native-maps'

import Styles from '../components/StyleComponent'
import Tail from '../components/Tail'
import Header from '../components/Header'
import { StatusBar } from 'expo-status-bar'
import { getAllFarmacias } from '../utils/CrudFarmaciaProvider'
import { Dialog } from 'react-native-paper'
import { getRemediosByUserAndFarmacia } from '../utils/CrudRemedioProvider'
import { getAuth } from 'firebase/auth'
import ProdutoCard from '../components/ProdutoCard'
import { DialogButton } from '@rneui/base/dist/Dialog/Dialog.Button'

export default function MapsFarmacias(props) {

  const { navigation } = props

  const [myLocation, setMyLocation] = useState()
  const [farmaciasCadastradas, setFarmaciasCadastradas] = useState([])
  const [farmaciaSelecionada, setFarmaciaSelecionada] = useState({})
  const [remediosFarmaciaSelecionada, setRemediosFarmaciaSelecionada] = useState([])
  const [visible, setVisible] = useState(false)

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
    .catch((error) => Alert.alert("erro ao procurar os remédios: " + error))
    
  }

  useLayoutEffect(() => {
    requestMyPosition()

    getAllFarmacias()
      .then((lista) => setFarmaciasCadastradas(lista))
      .catch((error) => Alert.alert("Erro ao consultar Farmácias:" + error))

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


        <Dialog visible={visible} onDismiss={() => setVisible(!visible)}>
          <Dialog.Title>Produtos da {farmaciaSelecionada.data ? farmaciaSelecionada.data().nome : "nada"}: </Dialog.Title>
          <Dialog.Content>
            <FlatList
              data={remediosFarmaciaSelecionada}
              renderItem={({ item }) => {
                console.log(item)
                return (
                  <ProdutoCard
                    remedio={item.data()}
                  >

                  </ProdutoCard>
                )
              }}
              keyExtractor={item => item.id}>

            </FlatList>

          </Dialog.Content>
        </Dialog>

        <Tail navigation={navigation}></Tail>
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