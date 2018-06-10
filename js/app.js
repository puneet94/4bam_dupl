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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        headerLeft: <TouchableWithoutFeedback  onPress={() => {
          if (navigation.state.index === 0) {
            navigation.navigate('DrawerOpen')
          } else {
            navigation.navigate('DrawerClose')
          }
        }}>
          <View style={appStyles.iconWrapper} >
          {(navigation.state.index === 0)?
            <MaterialCommunityIcons name="menu" style={appStyles.headerIcon} />:
            <MaterialCommunityIcons name="close" style={appStyles.headerIcon} />}
          </View>
        </TouchableWithoutFeedback>
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