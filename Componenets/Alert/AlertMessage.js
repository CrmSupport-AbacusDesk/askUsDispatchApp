import React, { useState, useEffect } from 'react';
import { StyleSheet,Button } from 'react-native';
import Dialog from 'react-native-dialog';
import AppTheme from '../AppTheme.js/AppTheme';


const AlertMessage = ({ type, title, message, visible, handleCancel, handleOk, labelOK, labelCancel }) => {
    return(
        <Dialog.Container visible={visible} style={{ marginTop: -18 }} footerStyle={{borderTopColor:'grey'}}>
            <Dialog.Title style={type == 'error' ? styles.errorTitle : styles.successTitle}>{ title }</Dialog.Title>
        <Dialog.Description style={type=='success' ? styles.smessage :  styles.message}>
                {message}
            </Dialog.Description>
        <Dialog.Button label={labelCancel} onPress={handleCancel} />
        <Dialog.Button label={labelOK}  onPress={handleOk}/>
      </Dialog.Container>
    )
}
export default AlertMessage;

const styles = StyleSheet.create({
    errorTitle: {
        color: '#D84949',
        fontSize: 15,
        fontWeight:'bold'
    },
    successTitle: {
        // color: '#009A49',
        color:'#333333',
        fontSize: 15,
        fontWeight:'bold'
    },
    message: {
        fontSize:14
    },
    smessage:{
        fontSize:14,
        color:AppTheme.Success
    }
})
