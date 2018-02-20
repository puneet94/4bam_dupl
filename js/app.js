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
import FontAwesome, { Icons } from 'react-native-fontawesome';


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
            <FontAwesome style={appStyles.headerIcon}>
            {Icons.bars}
            </FontAwesome>:
            <FontAwesome style={appStyles.headerIcon}>
            {Icons.close}
            </FontAwesome> }
          </View>
        </TouchableWithoutFeedback>
    }),
  }
},);



export default bamApp;