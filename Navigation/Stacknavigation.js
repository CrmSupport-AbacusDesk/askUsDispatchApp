import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from '../screens/Dashboard';
import CouponScan from '../screens/CouponScan';
import InvoiceDetail from '../screens/InvoiceDetail';
import BoxDetail from '../screens/BoxDetail';
import AppTheme from '../Componenets/AppTheme.js/AppTheme';
const MyStack = () => {
  const Stack = createNativeStackNavigator()
  return (
   
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ 
            title: 'ASK US', 
            headerTintColor:'white',
           headerStyle: {
            backgroundColor:AppTheme.Danger,
            borderBottomWidth: 0,
            color:'white'
            // headerTitleStyle: { fontSize: 16 }
        }
      }} />
        {/* <Stack.Screen name="CouponScan" component={CouponScan} options={{ 
            title: 'Coupon Scan', 
            headerTintColor:'white',
           headerStyle: {
            backgroundColor:AppTheme.Danger,
            borderBottomWidth: 0,
            //  fontSize: 16 
        }
      }}/> */}
        <Stack.Screen name="InvoiceDetail" component={InvoiceDetail} options={{ 
            title: 'Invoice Detail', 
            headerTintColor:'white',
           headerStyle: {
            backgroundColor:AppTheme.Danger,
            borderBottomWidth: 0,
            //  fontSize: 16 
        }
      }}/>
      
      </Stack.Navigator>
    
  );
};

export default MyStack;

