import { View, Text } from 'react-native'
import React, { useState } from 'react'

import Styles from '../components/StyleComponent'
import { Dialog } from 'react-native-paper'

export default function StatusDialog(props) {

    const isSucess = useState(props.isSucess)
    const content = useState(props.content)

    const [visible, setVisible] = useState(props.visible)

    return (
        <Dialog
            visible={visible}
            onDismiss={() => setVisible(!visible)}
            style={Styles.dialog}
        >
            <Dialog.Title title={isSucess ? "Sucesso!" : "Erro!"} />
            <Dialog.ScrollArea>
                {
                    content.map((item) => {
                        return (
                            <Text>{item.message}</Text>
                        )
                    })
                }
            </Dialog.ScrollArea>
        </Dialog>
    )
}