import { StyleSheet } from 'react-native';
import AppTheme from '../AppTheme.js/AppTheme';

const GlobelStyle = StyleSheet.create({

    cardMaterial: {
        backgroundColor: AppTheme.Light,
        shadowColor: AppTheme.Dark,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.20,
        shadowRadius: 6.27,
        elevation: 9,
        borderTopRightRadius: 8,
        borderTopLeftRadius:8
    },
    MasterCount: {
        borderRadius: 4,
        backgroundColor: AppTheme.statusBar,
        height: 30,
        marginLeft: 26,
        width: '12%',
        borderWidth: 2,
        borderColor: AppTheme.Secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },

})
 export default GlobelStyle;