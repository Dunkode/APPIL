import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../components/StyleComponent'
import { Image } from '@rneui/themed'

export default function LogoAppil() {
  return (
    <View style={Styles.tittleScreen}>
        <Image
          source={require("../../assets/logo_appil.png")}
          style={{
            width: 250,
            height: 150,
            justifyContent: 'center',
            alignContent: "center"
          }}
        />
    </View>
  )
}