
import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './Navigation/Stacknavigation';
import { PermissionsAndroid, Platform } from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
const App = () => {
  return (
    <View style={styles.container}>
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;