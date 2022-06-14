import { useLayoutEffect, useState } from 'react'
import React from 'react'
import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView,  } from 'react-native'
import { Divider } from "@rneui/themed"
import { Button, Checkbox } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage"

import Styles from '../components/StyleComponent'
import * as AuthenticationProvider from "../utils/AuthenticationProvider"
import LogoAppil from '../components/LogoAppil'


export default function Login(props) {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [checked, setChecked] = useState(false)
  const [submitDisable, setSubmitDisable] = useState(false)

  const { navigation } = props

  useLayoutEffect(() => {
    verifyReminder()
  }, [])

  const verifyReminder = async () => {
    let persistedEmail = await AsyncStorage.getItem("email")
    let persistedPass = await AsyncStorage.getItem("pass")
    if (persistedEmail && persistedPass) {
      setEmail(persistedEmail)
      setPass(persistedPass)
      setChecked(true)
    }
  }

  const reminder = async () => {
    if (checked) {
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem("pass", pass)

    } else {
      await AsyncStorage.removeItem("email")
      await AsyncStorage.removeItem("pass")
    }
  }

  const validateCredentials = async () => {
    reminder()
    if (email.length > 0 && pass.length > 0) {
      try {
        setSubmitDisable(true)
        await AuthenticationProvider.validateUser(email, pass)
        setSubmitDisable(false)
        navigation.replace("Menu")

      } catch (error) {
        setSubmitDisable(false)
        console.log(error)
        Alert.alert("Erro ao fazer login: " + error)
      }

    } else {
      Alert.alert("Preencha os campos de E-mail e Senha!")

    }
  }

  return (
    <View style={[Styles.container, Styles.centralize]}>

      <LogoAppil />

      <ScrollView style={[Styles.textInputContainer]}>
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
            mode="contained"
            style={Styles.button}
            uppercase={false}
            labelStyle={Styles.textMinor}
            color='#6CCFB7'
            onPress={() => validateCredentials()}
            disabled={submitDisable}>
            Acessar
          </Button>


        <View style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color="#6CCFB7"
            />
          <Text style={Styles.textLarge}>Lembrar-me</Text>
        </View>

      </ScrollView>

      <View style={Styles.textInEndContainer}
      >
        <Divider width={2} color='black' />
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={Styles.textMinor}>
            Não tem uma conta? Clique
          </Text>

          <TouchableOpacity
            onPress={() => navigation.push("CadastroUsuario")}
          >
            <Text style={[Styles.textMinor, { color: 'blue' }]}> aqui </Text>
          </TouchableOpacity>

          <Text style={Styles.textMinor}>
            para se cadastrar
          </Text>

        </View>
      </View>

    </View>
  )
}