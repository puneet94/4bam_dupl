'use strict';
import React, { Component } from 'react';
import{Image,ScrollView,Text} from "react-native";
import { DrawerNavigator } from 'react-navigation';
import TrainingScreen from "../training";
import AlarmScreen from "../alarm";
import TrainingFinishScreen from "../trainingfinish";
import LocalNotificationScreen from "../localnotification";
import HomeScreen from "../home";
import NewsScreen from "../newslist";
import DrawerContainer from "./DrawerContainer";
import appVars from '../../appVars';
import appStyles from '../../appStyles';

const Menu = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitleStyle: appStyles.headerTitle,    
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labelHome.toUpperCase()}</Text>,
    }),
  },
  Alarms: {
    screen: AlarmScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>ALARM</Text>,
    }),
  },
  Training: {
    screen: TrainingScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle: <Text style={ appStyles.headerTitle }>{appVars.labeleTraining.toUpperCase()}</Text>,
    }),
  },
  TrainingFinish: {
    screen: TrainingFinishScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labeleTraining.toUpperCase()}</Text>,
    }),
  },
  News: {
    screen: NewsScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labelNews.toUpperCase()}</Text>,
    }),
  },
  LocalNotification: {
    screen: LocalNotificationScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>{"notification".toUpperCase()}</Text>,
    }),
  },
},
{
  contentComponent: DrawerContainer,
  drawerWidth: appVars.drawerWidth,
}
);

export default Menu;