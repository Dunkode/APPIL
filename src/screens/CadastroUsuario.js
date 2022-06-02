import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../components/StyleComponent'
import { TextInput, Button } from 'react-native'

export default function CadastroUsuario(props) {

  const { navigation } = props

  return (
    <View style={Styles.container}>
      
      <View style={Styles.textInputContainer}>
        <Text>CadastroUsuario</Text>
      </View>



      <View style={[Styles.textInputContainer]}>
        <TextInput
          placeholder='Insira seu nome completo'
          // value={email}
          // onChangeText={(e) => setEmail(e)}
          style={Styles.textInput}

        />

        <TextInput
          placeholder='Insira seu e-mail'
          secureTextEntry
          // value={pass}
          // onChangeText={(p) => setPass(p)}
          style={Styles.textInput}
        />

        <TextInput
          placeholder='Insira uma senha'
          secureTextEntry
          // value={pass}
          // onChangeText={(p) => setPass(p)}
          style={Styles.textInput}
        />
        <TextInput
          placeholder='Reinsira a senha'
          secureTextEntry
          // value={pass}
          // onChangeText={(p) => setPass(p)}
          style={Styles.textInput}
        />

      </View>

      <View style={Styles.textInputContainer}>
        <Button
          title='Acessar'
          style={Styles.button}
          color={"green"}
          onPress={() => validarCredenciais()} />

      </View>
    </View>
  )
}