import { useLayoutEffect, useState } from 'react'
import React from 'react'
import { View, Text, Alert, TextInput, TouchableOpacity, ScrollView, } from 'react-native'
import { Divider } from "@rneui/themed"
import { Button, Checkbox, Dialog } from 'react-native-paper'
import AsyncStorage from "@react-native-async-storage/async-storage"

import Styles from '../components/StyleComponent'
import * as AuthenticationProvider from "../utils/AuthenticationProvider"
import LogoAppil from '../components/LogoAppil'
import formValidator from '../utils/FormValidator'
import StatusDialog from '../components/StatusDialog'


export default function Login(props) {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [checked, setChecked] = useState(false)
  const [submitDisable, setSubmitDisable] = useState(false)
  const [dlgVisible, setDlgVisible] = useState(false)
  const [errorInForm, setErrorInForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])


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

  const formObject = () => {
    return [
      {
        "form": email,
        "formName": "E-mail",
        "message": "Deve conter ao menos 6 caracteres!",
        "rule": (email.length < 6)
      }
      ,
      {
        "form": pass,
        "formName": "Senha",
        "message": "Deve conter ao menos 6 caracteres!",
        "rule": (pass.length < 6)
      }
    ]
  }

  const validateCredentials = async () => {
    reminder()
    let forms = formObject()
    let { haveError, listOfErrors } = formValidator(forms)


    if (!haveError) {
      try {
        setSubmitDisable(true)
        await AuthenticationProvider.validateUser(email, pass)
        setSubmitDisable(false)
        navigation.replace("Menu")

      } catch (error) {
        setSubmitDisable(false)
        setDlgVisible(true)
        setErrorInForm(true)
        setErrorMessage([{"id": 10, "message": "Resultado: erro ao login: " + error}])
      }

    } else {
      setDlgVisible(true)
      setErrorInForm(true)
      setErrorMessage(listOfErrors)

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

      <StatusDialog
        visible={dlgVisible}
        isSucess={!errorInForm}
        content={errorMessage}
        disableFunction={() => setDlgVisible(false)}
      >

      </StatusDialog>
    </View>
  )
}