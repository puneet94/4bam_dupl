'use strict';
import React, { Component } from 'react';
import{Text} from "react-native";
import { DrawerNavigator } from 'react-navigation';
import TrainingScreen from "../training";
import AlarmScreen from "../alarm";
import TrainingFinishScreen from "../trainingfinish";
import LocalNotificationScreen from "../localnotification";
import HomeScreen from "../home";
import LoginScreen from "../login";
import AccountScreen from "../account";
import SettingsScreen from "../settings";
import InprintScreen from "../inprint";

import NewsScreen from "../newslist";
import DrawerContainer from "./DrawerContainer";
import appVars from '../../appVars';
import appStyles from '../../appStyles';

const Menu = DrawerNavigator({
  /*Login: {
    screen: LoginScreen,
  },*/
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
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labelTimeTable.toUpperCase()}</Text>,
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
      headerTitle:  <Text style={ appStyles.headerTitle }>{"benachrichtigung".toUpperCase()}</Text>,
    }),
  },
  Account: {
    screen: AccountScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labelAccount.toUpperCase()}</Text>,
    }),
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labelSettings.toUpperCase()}</Text>,
    }),
  },
  Inprint: {
    screen: InprintScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle:  <Text style={ appStyles.headerTitle }>{appVars.labelInprint.toUpperCase()}</Text>,
    }),
  },
},
{
  contentComponent: DrawerContainer,
  drawerWidth: appVars.drawerWidth,
}
);

export default Menu;