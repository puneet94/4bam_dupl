/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Alert,
  Text,
  View,Linking,PushNotificationIOS
  
} from 'react-native';
import moment from "moment";
import PushNotification from 'react-native-push-notification';
import TimeTable from "./components/TimeTable";
import store from 'react-native-simple-store';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});//rest of code will be performing for iOS on background too
  
const NOTIFICATION_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
function scheduleLocalNotification(message, date, id, payload) {
  //message: type String
  console.log("called schedule");
  //date: type String  format 'YYYY-MM-DD HH:mm' (NOTIFICATION_DATE_TIME_FORMAT)

  //construct the notification parameters
   const fireDate = moment(date, NOTIFICATION_DATE_TIME_FORMAT).toDate();
  /*const fireDate = moment()
    //.add(3, 'seconds')
    .toDate();*/
  const notification = {
    id: createPushId(id), //for android cancel notification (must be stringified number)
    message,
    number: 0, //necessary for iOS cancellation (not sure why)
    date: fireDate,
    repeatType: getRepeatType(id),
    //for ios only
    userInfo: {
      id: createPushId(id), //for ios cancel notfication (can be any string)
      ...payload,
    },
    //for android only
    data: JSON.stringify(payload),
  };

  //schedule the notification
  PushNotification.localNotificationSchedule(notification);
}
const NOTIFICATION_TYPE_TO_ID = {
  fruit: {id:'111',repeatType: 'minute'},
  meat: {id:'222',repeatType: 'day'},
  sunday: {id:'333',repeatType: 'week'},
  monday: {id:'444',repeatType: 'week'},
  tuesday: {id:'555',repeatType: 'week'},
  wednesday: {id:'666',repeatType: 'week'},
  thursday: {id:'777',repeatType: 'week'},
  friday: {id:'888',repeatType: 'week'},
  saturday: {id:'999',repeatType: 'week'}
};


 function createPushId(pushType) {
  return NOTIFICATION_TYPE_TO_ID[pushType].id;
}

function getRepeatType(pushType) {
  return NOTIFICATION_TYPE_TO_ID[pushType].repeatType;
}
  //BackgroundTimer.stopBackgroundTimer();
export default class App extends Component {
  componentWillMount = async()=>{
    console.log("enterd will mount");
    //PushNotification.cancelLocalNotifications({id: '111'});
    
/*

scheduleLocalNotification(
  'Week notification for sunday',
  '2018-02-04 22:18',
  'sunday',
  {foo: 'bar'}
);

scheduleLocalNotification(
  'Week notification for monday',
  '2018-02-05 22:18',
  'monday',
  {foo: 'bar'}
);

scheduleLocalNotification(
  'Week notification for tuesdday',
  '2018-02-06 22:18',
  'tuesday',
  {foo: 'bar'}
);

scheduleLocalNotification(
  'Week notification for wednesday',
  '2018-02-07 22:18',
  'wednesday',
  {foo: 'bar'}
);

scheduleLocalNotification(
  'Week notification for thursday',
  '2018-02-08 22:18',
  'thursday',
  {foo: 'bar'}
);

scheduleLocalNotification(
  'Week notification for friday',
  '2018-02-09 22:18',
  'friday',
  {foo: 'bar'}
);

scheduleLocalNotification(
  'Week notification for saturday',
  '2018-02-10 22:18',
  'saturday',
  {foo: 'bar'}
);
*/
    PushNotification.configure({
    
        // (optional) Called when Token is generated (iOS and Android)
        onRegister: function(token) {
            console.log( 'TOKEN:', token );
        },
    
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
            console.log( 'NOTIFICATION:', notification );
            Alert.alert(notification.message);
            // process the notification
            
            // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
    
        
        permissions: {
            alert: true,
            badge: true,
            sound: true
        },
    
        // Should the initial notification be popped automatically
        // default: true
        popInitialNotification: true,
    
        /**
          * (optional) default: true
          * - Specified if permissions (ios) and token (android and ios) will requested or not,
          * - if not, you must call PushNotificationsHandler.requestPermissions() later
          */
        requestPermissions: true,
    });
  }
  render() {

    return (
      <View style={styles.container}>
        <TimeTable name="person1"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
