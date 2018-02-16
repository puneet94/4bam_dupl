import {
    PushNotificationIOS
    
  } from 'react-native';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';




const NOTIFICATION_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';

export function scheduleLocalNotification(message, date, id, repeatType,payload) {

  //message: type String
  console.log("called schedule",arguments);
  //date: type String  format 'YYYY-MM-DD HH:mm' (NOTIFICATION_DATE_TIME_FORMAT)

  //construct the notification parameters
   const fireDate = moment(date, NOTIFICATION_DATE_TIME_FORMAT).toDate();
  /*const fireDate = moment()
    //.add(3, 'seconds')
    .toDate();*/
  const notification = {
    id: id, //for android cancel notification (must be stringified number)
    message,
    number: 0, //necessary for iOS cancellation (not sure why)
    date: fireDate,
    repeatType: repeatType,
    popInitialNotification: true,
    //for ios only
    userInfo: {
      id: id, //for ios cancel notfication (can be any string)
      ...payload,
    },
    //for android only
    data: JSON.stringify(payload),
  };

  //schedule the notification
  PushNotification.localNotificationSchedule(notification);
}



export function cancelNotification(id){
    console.log("called cancel",id);
    PushNotification.cancelLocalNotifications({id});
}
