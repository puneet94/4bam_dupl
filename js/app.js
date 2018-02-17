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
            <Text>{"="}</Text>:
            <Text>{"X"}</Text> }
          </View>
        </TouchableWithoutFeedback>
    }),
  }
},);



export default bamApp;