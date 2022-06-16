import { Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import Styles from '../components/StyleComponent'
import { Dialog } from 'react-native-paper'

export default function StatusDialog(props) {

    const isSucess = props.isSucess
    const content = props.content
    let [visible, setVisible] = useState(false)

    let title = isSucess ? "Sucesso!" : "Erro!"

    useEffect(() => {
        setVisible(props.visible)
    }, [props.visible])
    

    return (
        <Dialog
            visible={visible}
            onDismiss={props.disableFunction}
            style={Styles.dialog}
        >
            <Dialog.Title style={Styles.textLarge}>{title}</Dialog.Title>
            <Dialog.ScrollArea style={{margin:20}}>
                {
                    content.map((item) => {
                        return (
                            <Text style={Styles.textMinor}>{item.message}</Text>
                        )
                    })

                }
            </Dialog.ScrollArea>
        </Dialog>
    )
}