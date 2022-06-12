import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login';
import Sobre from './src/screens/Sobre';
import CadastroUsuario from './src/screens/CadastroUsuario';
import MapsFarmacias from './src/screens/MapsFarmacias';
import ListaRemedios from './src/screens/ListaRemedios';
import PerguntasFrequentes from './src/screens/PerguntasFrequentes';
import Estrutura from './src/screens/Estrutura';
import Menu from "./src/screens/Menu";
import {
  useFonts,
  PatrickHand_400Regular,
  PatrickHandSC_400Regular
} from '@expo-google-fonts/dev';
import { StatusBar } from 'react-native';
import CadastroRemedio from './src/screens/CadastroRemedio';


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
          screenOptions={
            { headerShown:false }
          }
        >

          <Stack.Screen
            name='Login'
            component={Login}
            options={
              { title: "Login", headerShown:false }
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
            name='MapsFarmacias'
            component={MapsFarmacias}
            options={
              { title: "MapsFarmacias" }
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
          />
          <Stack.Screen
            name='Estrutura'
            component={Estrutura}            
          />
          <Stack.Screen
            name='CadastroRemedio'
            component={CadastroRemedio}            
          />

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
