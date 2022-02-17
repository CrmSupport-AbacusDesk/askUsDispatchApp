import React from 'react'
import { Dimensions, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function SnackbarComponent({ visible, message }) {
    return (
        <View style={{ width: Dimensions.get('screen').width }}>
            <Snackbar
                style={{ position: 'absolute', bottom: 30, left: 100, zIndex: 99999 }}
                // style={{alignItems:'center',justifyContent:"center"}}
                visible={visible}
            >
                {message}
            </Snackbar>
        </View>
    )
}