import { useState, useLayoutEffect } from 'react'
import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../components/StyleComponent'
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native'

export default function Login(props) {

  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const {navigation} = props

  const validarCredenciais = () => {
    console.log(email)
    console.log(pass)
  }


  return (
    <View style={Styles.container}>
      <Text>APPIL</Text>

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
          color={"green"}
          onPress={() => validarCredenciais()} />

      </View>


      <View style={Styles.textInEnd}>
        <Text>
          Não tem uma conta? Clique
        </Text>
        <TouchableOpacity
          onPress={ () => navigation.push("CadastroUsuario")}
        >
          <Text style={{ color: 'blue', fontWeight: 'bold' }}> aqui </Text>
        </TouchableOpacity>
        <Text>
          para se cadastrar
        </Text>
      </View>
    </View>
  )
}