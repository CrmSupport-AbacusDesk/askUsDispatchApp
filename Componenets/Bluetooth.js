import { BleManager } from 'react-native-ble-plx';
import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Bluetooth extends Component {
    render() {
        super();
        this.manager = new BleManager();
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}

