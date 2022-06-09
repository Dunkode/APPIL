import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import Styles from '../components/StyleComponent'
import { Button } from 'react-native-paper'
import { Divider } from '@rneui/themed'

export default function Menu(props) {

    return (
        <View style={Styles.container}>
            <Text>Menu</Text>
            <View style={Styles.buttonContainer}>

                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textMinor}
                    color='#6CCFB7'
                    onPress={() => { }}>
                    Cadastrar remédio
                </Button>
            </View>

            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textMinor}
                    color='#6CCFB7'
                    onPress={() => { }}>
                    Ver farmácia
                </Button>
            </View>
            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textMinor}
                    color='#6CCFB7'
                    onPress={() => { }}>
                    Procurar remédios
                </Button>
            </View>
            <View style={Styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={Styles.button}
                    uppercase={false}
                    labelStyle={Styles.textMinor}
                    color='#6CCFB7'
                    onPress={() => { }}>
                    FAQ
                </Button>
            </View>

            <View style={Styles.textInEndContainer}>
                <Divider width={2} color='black' />
                <View style={{ flex : 1, flexDirection: 'row', alignContent: "space-around" }}>
                    <TouchableOpacity
                        style={{ backgroundColor: "#d2ece6", borderRadius: 10 }}
                        onPress={() => { }}
                    >
                        <Text style={[Styles.textMinor, { color: 'blue' }]}> Mais infomações </Text>
                    </TouchableOpacity>

                    <Button
                        mode="contained"
                        style={[Styles.button, {width: "20%"}]}
                        uppercase={false}
                        labelStyle={Styles.textMinor}
                        color='#6CCFB7'
                        onPress={() => { }}>
                        Logoff
                    </Button>
                </View>
            </View>

        </View>

    )
}