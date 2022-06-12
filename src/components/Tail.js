import { Divider, Image } from "@rneui/themed";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import Styles from './StyleComponent'


export default function Tail(props) {

    const { navigation } = props

    return (
        <View style={Styles.textInEndContainer}>
            <Divider width={2} color='black' />
            <View style={Styles.tail}>
                <Button
                    mode="contained"
                    style={[Styles.button, { width: "30%" }]}
                    labelStyle={Styles.textMinor}
                    color='#6CCFB7'
                    onPress={() => { navigation.goBack()}}>
                    Voltar
                </Button>

                <Image
                    source={require("../../assets/config.png")}
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: 'center',
                        alignContent: "center",
                        marginLeft: 100
                    }}
                    onPress={() => { navigation.push("Estrutura") }}
                />
                
            </View>

        </View>
    );
}