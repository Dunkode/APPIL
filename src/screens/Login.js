import { useLayoutEffect, useState } from 'react'
import React from 'react'
import { View, Text, Alert, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Divider } from "@rneui/themed"
import { Button, Checkbox } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage"

import Styles from '../components/StyleComponent'
import * as AuthenticationProvider from "../utils/AuthenticationProvider"


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
    if (persistedEmail) {
      setEmail(persistedEmail)
      setPass(persistedPass)
      setChecked(true)
    }
  }

  const reminder = async () => {
    setChecked(!checked)

    if (!checked) {
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem("pass", pass)

    } else {
      await AsyncStorage.removeItem("email")
      await AsyncStorage.removeItem("pass")
    }
  }

  const validateCredentials = async () => {

    if (email.length > 0 && pass.length > 0) {
      try {
        setSubmitDisable(true)
        let userData = await AuthenticationProvider.validateUser(email, pass)
        navigation.push("Menu")
        setSubmitDisable(false)
        
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
    <View style={Styles.container}>

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
          mode="contained"
          style={Styles.button}
          uppercase={false}
          labelStyle={Styles.textMinor}
          color='#6CCFB7'
          onPress={() => validateCredentials()}
          disabled={submitDisable}>
          Acessar
        </Button>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked)
              reminder()}}
            color="#6CCFB7"
          />
          <Text style={Styles.textLarge}>Lembrar-me</Text>
        </View>

      </View>

      <View style={[Styles.textInEndContainer, { width: "100%" }]}>
        <Divider width={2} color='black' />
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={Styles.textMinor}>
            Não tem uma conta? Clique
          </Text>

          <TouchableOpacity
            onPress={() => navigation.replace("CadastroUsuario")}
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