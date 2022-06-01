import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../components/StyleComponent'
import { TextInput } from 'react-native'

export default function Login() {
  return (
    <View style={Styles.container}>
      <Text>Login</Text>
      
      <View>
        <TextInput
          placeholder='E-mail'
          style={Styles.textInput}
        >

        </TextInput>
        
      </View>
      
      <View>
        <TextInput
          placeholder='Senha'
          style={Styles.textInput}
        >
        </TextInput>
        
      </View>
    </View>
  )
}