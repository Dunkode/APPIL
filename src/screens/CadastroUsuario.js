import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Styles from '../components/StyleComponent'
import { TextInput } from 'react-native'
import { Divider, Button } from '@rneui/base'
import { Dialog } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'

import * as AuthenticationProvider from "../utils/AuthenticationProvider"

export default function CadastroUsuario(props) {

  const { navigation } = props

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [visibleSucess, setVisibleSucess] = useState(false)
  const [submitEnable, setSubmitEnable] = useState(false)

  const [errorMessage, setErrorMessage] = useState([])


  const validateInfo = async () => {
    setSubmitEnable(true)
    let { temErros, errorList } = verifyTextInputs()

    if (temErros) {
      console.log("erro->", errorMessage)
      setVisible(true)

    } else {
      try {
        let creationResponse = await AuthenticationProvider.createUser(email, password)
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

    if (errorMessage.length > 0) {
      temErros = true
    }

    if (errorList.length > 0) {
      setErrorMessage(errorList)
    }

    return { temErros, errorList }
  }

  return (
    <View style={Styles.container}>

      <Dialog
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(!visible)
          setErrorMessage([])
          setSubmitEnable(!submitEnable)
        }}
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
          setSubmitEnable(!submitEnable)
        }}
      >
        <Dialog.Title title="Sucesso!" />
        <Text>Usuário cadastrado com sucesso!</Text>

      </Dialog>

      <View style={Styles.textInputContainer}>
        <Text>CadastroUsuario</Text>
      </View>



      <View style={[Styles.textInputContainer]}>
        <TextInput
          placeholder='Insira seu nome completo'
          value={name}
          onChangeText={(n) => setName(n)}
          style={Styles.textInput}
        />

        <TextInput
          placeholder='Insira seu e-mail'
          keyboardType="email-address"
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

      </View>

      <View style={Styles.textInputContainer}>
        <Button
          title='Cadastrar'
          disabled={submitEnable}
          style={Styles.button}
          color='#6CCFB7'
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          buttonStyle={{ borderRadius: 20 }}
          onPress={() => validateInfo()} />

      </View>

      <View style={{ width: "100%" }}>
        <Divider width={2} color='black' />
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text>
            Voltar para a tela de
          </Text>

          <TouchableOpacity
            onPress={() => { navigation.replace("Login") }}
          >
            <Text style={{ color: 'blue', fontWeight: 'bold' }}> Login </Text>
          </TouchableOpacity>


        </View>
      </View>

    </View>
  )
}