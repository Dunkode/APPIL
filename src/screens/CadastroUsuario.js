import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Divider } from '@rneui/base'
import { Dialog } from 'react-native-paper'
import { TouchableOpacity } from 'react-native'
import { Button } from 'react-native-paper'

import Styles from '../components/StyleComponent'
import * as AuthenticationProvider from "../utils/AuthenticationProvider"
import * as CrudUserProvider from "../utils/CrudUserProvider"
import LogoAppil from '../components/LogoAppil'
import formValidator from '../utils/FormValidator'
import StatusDialog from '../components/StatusDialog'

export default function CadastroUsuario(props) {

  const { navigation } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [submitDisable, setSubmitDisable] = useState(false)

  const [dlgVisible, setDlgVisible] = useState(false)
  const [errorInForm, setErrorInForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState([])


  const formObject = () => {
    return [
      {
        "form": name,
        "formName": "Nome",
        "message": "Deve conter ao menos 3 caracteres!",
        "rule": (name.length < 3)
      },
      {
        "form": password,
        "formName": "Senha",
        "message": "Deve conter ao menos 6 caracteres!",
        "rule": (password.length < 6)
      },
      {
        "form": rePassword,
        "formName": "Confirmação da senha",
        "message": "Deve ser igual a senha!",
        "rule": (rePassword != password)
      },
    ]
  }


  const validateInfo = async () => {
    setSubmitDisable(true)
    let forms = formObject()
    console.log(rePassword == password)
    let { haveError, listOfErrors } = formValidator(forms)

    if (!haveError) {
      try {
        const data = { "name": name, "email": email }
        let creationResponse = await AuthenticationProvider.createUser(email, password)
        let creationDocResponse = await CrudUserProvider.createUserDocument(data)
        setDlgVisible(true)
        setErrorMessage([{ "id": 9, "message": "Usuário cadastrado com sucesso!" }])
        setErrorInForm(false)
        setDlgVisible(true)
        setSubmitDisable(false)
      } catch (error) {
        setErrorMessage([{ "id": 10, "message": "Ocorreu um erro ao cadastrar o usuário => " + error.erro }])
        setErrorInForm(true)
        setDlgVisible(true)
        setSubmitDisable(false)
        
      }
      
    } else {
      setErrorMessage(listOfErrors)
      setErrorInForm(true)
      setDlgVisible(true)
      setSubmitDisable(false)
    }
  }

  return (
    <View style={[Styles.container, Styles.centralize]}>

      <LogoAppil />

      <ScrollView style={Styles.textInputContainer}>
        <TextInput
          placeholder='Insira seu nome completo'
          value={name}
          onChangeText={(n) => setName(n)}
          style={Styles.textInput}
        />

        <TextInput
          placeholder='Insira seu e-mail'
          keyboardType="email-address"
          autoCapitalize='none'
          value={email}
          onChangeText={(e) => setEmail(e)}
          style={Styles.textInput}
        />

        <TextInput
          placeholder='Insira uma senha'
          secureTextEntry
          value={password}
          onChangeText={(p) => setPassword(p)}
          style={Styles.textInput}
        />

        <TextInput
          placeholder='Reinsira a senha'
          secureTextEntry
          value={rePassword}
          onChangeText={(rp) => setRePassword(rp)}
          style={Styles.textInput}
        />

        <Button
          disabled={submitDisable}
          mode="contained"
          style={Styles.button}
          labelStyle={Styles.textMinor}
          color='#6CCFB7'
          onPress={() => validateInfo()} >
          Cadastrar
        </Button>
      </ScrollView>

      <View style={{ width: "100%" }}>
        <Divider width={2} color='black' />
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={Styles.textMinor}>
            Voltar para a tela de
          </Text>

          <TouchableOpacity
            onPress={() => { navigation.replace("Login") }}
          >
            <Text style={[Styles.textMinor, { color: 'blue' }]}> Login </Text>
          </TouchableOpacity>


        </View>
      </View>

      <StatusDialog
        visible={dlgVisible}
        isSucess={!errorInForm}
        content={errorMessage}
        disableFunction={() => setDlgVisible(false)}
      />

    </View>
  )
}