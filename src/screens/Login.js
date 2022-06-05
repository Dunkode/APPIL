import { useState, useLayoutEffect } from 'react'
import { View, Text, Alert } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { Divider } from "@rneui/themed"
import { Button } from '@rneui/base'
import { Checkbox } from 'react-native-paper'

import Styles from '../components/StyleComponent'
import * as AuthenticationProvider from "../utils/AuthenticationProvider" 


export default function Login(props) {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [checked, setChecked] = React.useState(false);

  const { navigation } = props

  const validarCredenciais = async () => {
    try {
      let userData = await AuthenticationProvider.validateUser(email, pass)
      navigation.push("Menu")
      
    } catch (error){
      console.log(error)
      Alert.alert("Erro ao fazer login: " + error)
    }
  }


  return (
    <View style={Styles.container}>

      <View style={Styles.textInputContainer}>
        <Text>APPIL</Text>
      </View>

      <View style={Styles.textInputContainer}>
        <TextInput
          placeholder='E-mail'
          value={email}
          keyboardType="email-address"
          onChangeText={(e) => setEmail(e)}
          style={Styles.textInput}

        />

        <TextInput
          placeholder='Senha'
          secureTextEntry
          value={pass}
          onChangeText={(p) => setPass(p)}
          style={Styles.textInput}
        />


        <Button
          title='Acessar'
          style={Styles.button}
          color='#6CCFB7'
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          buttonStyle={{ borderRadius: 20 }}
          onPress={() => validarCredenciais()} />

        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked)
            }}
            color="#6CCFB7"
          />
          <Text>Lembrar-me</Text>
        </View>

      </View>



      <View style={[Styles.textInEnd, { width: "100%" }]}>
        <Divider width={2} color='black' />
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>
            Não tem uma conta? Clique
          </Text>

          <TouchableOpacity
            onPress={() => navigation.replace("CadastroUsuario")}
          >
            <Text style={{ color: 'blue', fontWeight: 'bold' }}> aqui </Text>
          </TouchableOpacity>

          <Text>
            para se cadastrar
          </Text>

        </View>
      </View>

    </View>
  )
}