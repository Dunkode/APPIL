import { View, Text } from 'react-native'
import React from 'react'
import Styles from '../components/StyleComponent'
import { TextInput } from 'react-native'
import { Button, Divider } from '@rneui/base'
import { TouchableOpacity } from 'react-native'

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
          title='Cadastrar'
          style={Styles.button}
          color='#6CCFB7'
          titleStyle={{ color: 'black', fontWeight: 'bold' }}
          buttonStyle={{ borderRadius: 20 }}
          onPress={() => { }} />

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