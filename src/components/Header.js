import { Image } from "@rneui/themed";
import { Text, View } from "react-native";
import Styles from './StyleComponent'


export default function Header(props) {

    const width = props.width
    const height = props.height
    const spaceBetween = props.spaceBetween
    const headerTittle = props.headerTittle
    const useConfig = props.useConfig
    const {navigation}  = props

    return (
        <View style={Styles.header}>
            <Image
                source={require("../../assets/pill.png")}
                style={{
                    width: width,
                    height: height,
                    marginRight: spaceBetween
                }}
            />
            <Text style={Styles.textLarge}>{headerTittle}</Text>

            {useConfig ?
                
                <Image
                    source={require("../../assets/config.png")}
                    style={{
                        width: width,
                        height: height,
                        justifyContent: 'center',
                        alignContent: "center",
                        marginLeft: spaceBetween,
                    }}
                    onPress={() => {navigation.push("Estrutura")}}
                    />
                :
                <Image
                    source={require("../../assets/pill.png")}
                    style={{
                        width: width,
                        height: height,
                        marginLeft: spaceBetween,
                    }}
                />
            }


        </View>
    );
}