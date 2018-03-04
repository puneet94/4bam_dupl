'use strict';
import React, { Component } from 'react';
import{Image,ScrollView} from "react-native";
import { DrawerNavigator } from 'react-navigation';


import TimeTableScreen from "../timetable";
import TrainingScreen from "../training";
import TrainingFinishScreen from "../trainingfinish";
import LocalNotificationScreen from "../localnotification";
import HomeScreen from "../home";
import DrawerContainer from "./DrawerContainer";
import appVars from '../../appVars';
import appStyles from '../../appStyles';

const Menu = DrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitleStyle: appStyles.headerTitle,    
      headerTitle: appVars.labelHome.toUpperCase(),
    }),
  },
  TimeTable: {
    screen: TimeTableScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle: appVars.labelTimeTable.toUpperCase(),
    }),
  },
  Training: {
    screen: TrainingScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle: appVars.labeleTraining.toUpperCase(),
    }),
  },
  TrainingFinish: {
    screen: TrainingFinishScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle: appVars.labeleTraining.toUpperCase(),
    }),
  },
  LocalNotification: {
    screen: LocalNotificationScreen,
    navigationOptions : ({ navigation, screenProps }) => ({
      headerTitle: "notification".toUpperCase(),
    }),
  },
},
{
  contentComponent: DrawerContainer,
  drawerWidth: appVars.drawerWidth,
}
);

export default Menu;