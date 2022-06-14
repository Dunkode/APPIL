import { PatrickHand_400Regular } from '@expo-google-fonts/dev'
import { Dimensions, StyleSheet } from 'react-native'

const primaryColor = '#b2dad2'
const secondaryColor = "#d2ece6"
const terciaryColor = "#6CCFB7"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor
    },
    tittleScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "PatrickHand_400Regular"
    },
    textInput: {
        backgroundColor: secondaryColor,
        margin: 10,
        padding: 3,
        borderRadius: 20,
        fontFamily: "PatrickHand_400Regular",
        fontSize: 32,
    },
    textInputContainer: {
        width: "85%",
        height: "25%",

    },
    button: {
        borderRadius: 20,
        width: "100%",
    },
    textInEndContainer: {
        justifyContent: 'flex-end',
        width: "100%",

    },
    textMinor: {
        fontSize: 20,
        fontFamily: "PatrickHand_400Regular"

    },
    textLarge: {
        fontSize: 32,
        fontFamily: "PatrickHand_400Regular",
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: secondaryColor,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
        padding: 10
    },
    centralize: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: secondaryColor,
        width: "100%",
        minHeight: 60
    },
    tail: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: primaryColor,
        width: "100%",
    },
    mapVisualization: {
        flex: 1,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 100
    },
    cardContainer: {
        borderRadius: 20,
        borderWidth: 2,
        width: "100%",
        backgroundColor: secondaryColor,
        marginBottom: 25
    },
    dialog: {
        backgroundColor: primaryColor,
        maxHeight: "70%"
    },
    cardProdContainer: {
        flex: 1,
        backgroundColor: secondaryColor,
        width: "100%",
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        flexDirection: "row", 
        alignItems:"center"
    }
})