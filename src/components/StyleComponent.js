import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b2dad2',
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
        backgroundColor: '#d2ece6',
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
    },
    textInEndContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    textMinor:{
        fontSize: 20,
        fontFamily: "PatrickHand_400Regular"

    },
    textLarge: {
        fontFamily: "PatrickHand_400Regular",
        fontSize: 32
    }
})