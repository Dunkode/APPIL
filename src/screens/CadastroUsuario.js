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

export default function CadastroUsuario(props) {

  const { navigation } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [visibleSucess, setVisibleSucess] = useState(false)
  const [submitDisable, setSubmitDisable] = useState(false)

  const [errorMessage, setErrorMessage] = useState([])


  const validateInfo = async () => {
    setSubmitDisable(true)
    let { temErros, errorList } = verifyTextInputs()

    if (temErros) {
      setVisible(true)

    } else {
      try {
        const data = { "name": name, "email": email }
        let creationResponse = await AuthenticationProvider.createUser(email, password)
        let creationDocResponse = await CrudUserProvider.createUserDocument(data)
        setVisibleSucess(true)
      } catch (error) {
        errorList.push({ "id": 9, "Resultado": "Ocorreu um erro ao cadastrar o usuário => " + error })
        setErrorMessage(errorList)
        setVisible(true)

      }
    }
  }

  const verifyTextInputs = () => {
    let temErros = false
    let errorList = []

    if (name == "") {
      errorList.push({ "id": 1, "Nome": "Informe o seu nome!" })
    }
    if (name.length < 3) {
      errorList.push({ "id": 2, "Nome": "O nome deve conter mais de 2 dígitos!" })
    }

    if (email == "") {
      errorList.push({ "id": 3, "Email": "Informe o seu email!" })
    }

    if (password == "") {
      errorList.push({ "id": 4, "Senha": "Informe a sua senha!" })
    }
    if (password.length < 6) {
      errorList.push({ "id": 5, "Senha": "A senha deve ter no mínimo 6 caracteres!" })
    }

    if (rePassword == "") {
      errorList.push({ "id": 7, "Confirmação da senha": "Informe a confirmação da senha!" })
    }
    if (rePassword.length < 6 || rePassword != password) {
      errorList.push({ "id": 8, "Confirmação da senha": "As senhas devem ser iguais!" })
    }

    if (errorList.length > 0) {
      temErros = true
      setErrorMessage(errorList)
    }

    return { temErros, errorList }
  }

  return (
    <View style={[Styles.container, Styles.centralize]}>

      <Dialog
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(!visible)
          setErrorMessage([])
          setSubmitDisable(!submitDisable)
        }}
        style={Styles.dialog}
        >
        <Dialog.Title title="Erro!" />
        {
          errorMessage.map((item) => {
            return (
              <Text>{Object.keys(item)[1]}: {Object.values(item)[1]}</Text>
            )
          })}
      </Dialog>

      <Dialog
        isVisible={visibleSucess}
        onBackdropPress={() => {
          navigation.replace("Menu")
          setSubmitDisable(!submitDisable)
        }}
        style={Styles.dialog}
      >
        <Dialog.Title title="Sucesso!" />
        <Text>Usuário cadastrado com sucesso!</Text>

      </Dialog>

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

    </View>
  )
}