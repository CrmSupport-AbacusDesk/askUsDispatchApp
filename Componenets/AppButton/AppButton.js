import React from 'react'
import { Button } from 'react-native-paper';
import AppTheme from '../AppTheme.js/AppTheme';

export default function AppButton({ title, onPress, disabled, loading }) {
    return (
        <Button mode="contained" loading={loading} disabled={disabled} onPress={onPress}
            labelStyle={{ letterSpacing: 0 ,fontSize:12}} color={AppTheme.Success}>
            {title}
        </Button>
    )
}