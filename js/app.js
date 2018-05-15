import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import { StackNavigator } from 'react-navigation';
import appVars from './appVars';
import appStyles from './appStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MenuScreen from './components/menu';
import LoginScreen from "./components/login";
const bamApp = StackNavigator({
    Login: {
        screen: LoginScreen,
        
    },
    Menu : {
      screen: MenuScreen,
      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: appVars.colorWhite,
        },
        headerLeft: <TouchableWithoutFeedback  onPress={() => {
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen')
          } else {
            navigation.navigate('DrawerClose')
          }
        }}>
          <View style={appStyles.iconWrapper} >
          {(navigation.state.index === 0)?
            <MaterialIcons name="menu" style={appStyles.headerIcon}>
            
            </MaterialIcons>:
            <MaterialIcons name="close" style={appStyles.headerIcon}>
            
            </MaterialIcons> }
          </View>
        </TouchableWithoutFeedback>
    }),
  }
},);



export default bamApp;