import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Sobre from './src/screens/Sobre';
import CadastroUsuario from './src/screens/CadastroUsuario';
import ListaFarmacias from './src/screens/ListaFarmacias';
import ListaRemedios from './src/screens/ListaRemedios';
import PerguntasFrequentes from './src/screens/PerguntasFrequentes';
import Menu from "./src/screens/Menu";
import {
  useFonts,
  PatrickHand_400Regular,
  PatrickHandSC_400Regular

} from '@expo-google-fonts/dev';
import { StatusBar } from 'react-native';




export default function App() {

  let [fontsLoaded] = useFonts({
    PatrickHand_400Regular,
    PatrickHandSC_400Regular
  });
  const Stack = createNativeStackNavigator()


  if (!fontsLoaded) {
    return <StatusBar />;
  } else {

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Login'
        >

          <Stack.Screen
            name='Login'
            component={Login}
            options={
              { title: "Login" }
            }
          />

          <Stack.Screen
            name='CadastroUsuario'
            component={CadastroUsuario}
            options={
              { title: "Cadastrar-se" }
            }
          />

          <Stack.Screen
            name='ListaRemedios'
            component={ListaRemedios}
            options={
              { title: "Remédios" }
            }
          />

          <Stack.Screen
            name='ListaFarmacias'
            component={ListaFarmacias}
            options={
              { title: "ListaFarmacias" }
            }
          />

          <Stack.Screen
            name='PerguntasFrequentes'
            component={PerguntasFrequentes}
            options={
              { title: "PerguntasFrequentes" }
            }
          />

          <Stack.Screen
            name='Sobre'
            component={Sobre}
            options={
              { title: "Sobre" }
            }
          />

          <Stack.Screen
            name='Menu'
            component={Menu}
            options={
              { title: "Menu" }
            }
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
