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
import ExerciseGalleryScreen from './components/exerciseGallery';
import OneSignal from 'react-native-onesignal';
import store from 'react-native-simple-store';


OneSignal.addEventListener('opened', async (values)=>{   
  console.log("without newsid");  
  console.log(values);
    if(values.notification.payload.additionalData && values.notification.payload.additionalData.newsid){
        await store.save('deepLinkNewsId',values.notification.payload.additionalData.newsid);
    }
    
});
const bamApp = StackNavigator({
    Menu : {
      screen: MenuScreen,
      navigationOptions: ({navigation}) => ({
        headerStyle: {
          backgroundColor: appVars.colorWhite,
        },
        headerLeft:
          <View style={appStyles.iconWrapper} >
          <Hamburger active={navigation.state.index}
          type="spin"
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
  ExerciseGallery: {
    screen: ExerciseGalleryScreen
  },
  NewsDetail: {
    screen: NewsDetailScreen
  }
},);



export default bamApp;