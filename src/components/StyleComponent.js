import { StyleSheet } from 'react-native'

const primaryColor = '#b2dad2'
const secondaryColor = "#d2ece6"
const terciaryColor = "#6CCFB7"


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tittleScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "PatrickHand_400Regular"
    },
    textInput: {
        flex: 1,
        backgroundColor: secondaryColor,
        margin: 10,
        padding: 3,
        borderRadius: 20,
        maxHeight:70,
        fontFamily: "PatrickHand_400Regular",
        fontSize: 32
    },
    textInputContainer: {
        flex: 1,
        width: "85%",
        height: "25%",
        
    },
    button: {
        justifyContent: 'center',
        borderRadius: 20,
        width: "85%"
    },
    textInEndContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: "100%"
    },
    textMinor:{
        fontSize: 20,
        fontFamily: "PatrickHand_400Regular"

    },
    textLarge: {
        fontFamily: "PatrickHand_400Regular",
        fontSize: 32
    },
    buttonContainer: {
        flex:1,
        backgroundColor: secondaryColor,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginStart: 20
    }
})