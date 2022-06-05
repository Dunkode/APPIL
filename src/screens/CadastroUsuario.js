import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Styles from '../components/StyleComponent'
import { TextInput } from 'react-native'
import { Button, Divider } from '@rneui/base'
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

  const [errorMessage, setErrorMessage] = useState([])


  const validateInfo = () => {
    let temErros = false
    let errorList = []

    if (name == "") {
      errorList.push({"name":"Informe o seu nome!"})
      temErros = true
    }

    if (email == "") {
      errorList.push({"email":"Informe o seu email!"})
      temErros = true
    }

    if (password == "") {
      errorList.push({"password":"Informe a sua senha!"})
      temErros = true
    }

    if (rePassword == "") {
      errorList.push({"rePassword" : "Informe a reinserção da senha!"})
      temErros = true
    }

    if (Object.keys(errorMessage).length >= 0) {
      temErros = true
    }
    
    if (Object.keys(errorList).length >= 0 ){
      setErrorMessage(errorList)
    }

    if (temErros) {
      console.log("erro->", errorMessage)
      setVisible(true)

    } else {
      try {
        // AuthenticationProvider.createUser(email, password)
        console.log(errorMessage)
      } catch (error) {
        console.log('asdasdasdasd')
      }
    }
  }

  return (
    <View style={Styles.container}>

      <Dialog
        isVisible={visible}
        onBackdropPress={() => setVisible(!visible)}
      >
        <Dialog.Title title="Erro!" />
        {
          errorMessage.map((item) => {
            return (
              <Text>{Object.values(item)}</Text>
            )
          })}
      </Dialog>

      <View style={Styles.textInputContainer}>
        <Text>CadastroUsuario</Text>
      </View>



      <View style={[Styles.textInputContainer]}>
        <TextInput
          placeholder='Insira seu nome completo'
          onEndEditing={() => {
            if (name.length < 3) {
              errorMessage.push ({"Nome": "O nome deve conter mais de 2 dígitos!"})
              setErrorMessage(errorMessage)
            }
          }}
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
          onEndEditing={() => {
            if (password.length <= 6) {
              errorMessage.push({"password" : "A senha deve ter no mínimo 6 caracteres!"})
              setErrorMessage(errorMessage)
            }
          }}
          style={Styles.textInput}
        />

        <TextInput
          placeholder='Reinsira a senha'
          secureTextEntry
          value={rePassword}
          onChangeText={(rp) => setRePassword(rp)}
          onEndEditing={() => {
            if (rePassword.length <= 6 || rePassword != password) {
              errorMessage.push({"rePassword" : "as senhas devem ser iguais!"})
              setErrorMessage(errorMessage)
            }
          }}
          style={Styles.textInput}
        />

      </View>

      <View style={Styles.textInputContainer}>
        <Button
          title='Cadastrar'
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
            onPress={() => navigation.replace("Login")}
          >
            <Text style={{ color: 'blue', fontWeight: 'bold' }}> Login </Text>
          </TouchableOpacity>


        </View>
      </View>

    </View>
  )
}