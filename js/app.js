import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import { StackNavigator } from 'react-navigation';
// https://github.com/GeekyAnts/react-native-hamburger

import Hamburger from 'react-native-hamburger';
import appVars from './appVars';
import appStyles from './appStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MenuScreen from './components/menu';
import LoginScreen from "./components/login";
import NewsDetailScreen from './components/newsdetail';

import OneSignal from 'react-native-onesignal';
import store from 'react-native-simple-store';


OneSignal.addEventListener('opened', async (values)=>{   
  console.log("opened"); 
    if(values.notification.payload.additionalData.newsid){
        await store.save('deepLinkNewsId',values.notification.payload.additionalData.newsid);
    }
    
});
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
        headerLeft:
          <View style={appStyles.iconWrapper} >
          <Hamburger active={navigation.state.index}
          type="spinCross"
          color={appVars.colorMain}
          onPress={() => 
            {
            if (navigation.state.index === 0) {
              navigation.navigate('DrawerOpen');
            } else {
              navigation.navigate('DrawerClose')
              navigation.state.index === 0;
            }
          }}/>
          </View>
    }),
  },
  NewsDetail: {
    screen: NewsDetailScreen
  }
},);



export default bamApp;