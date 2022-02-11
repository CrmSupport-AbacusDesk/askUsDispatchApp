import { StyleSheet } from 'react-native';
import AppTheme from '../AppTheme.js/AppTheme';

const GlobelStyle = StyleSheet.create({

    cardMaterial: {
        flex:1,
        alignItems:'center',
        backgroundColor: AppTheme.Light,
        shadowColor: AppTheme.Dark,
        shadowOffset: { width: 0, height: 2, },
        shadowOpacity: 0.40,
        shadowRadius: 6.27,
        elevation: 12,
        borderTopRightRadius: 18,
        borderTopLeftRadius:18
    },
    MasterCount: {
        borderRadius: 4,
        backgroundColor: '#e6eefc',
        height: 30,
        marginLeft: 26,
        width: '12%',
        borderWidth: 2,
        borderColor: AppTheme.LightBlue,
        alignItems: 'center',
        justifyContent: 'center'
    },

})
 export default GlobelStyle;