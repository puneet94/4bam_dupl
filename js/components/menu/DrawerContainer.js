import React from 'react'
import { StyleSheet, Text, View, PushNotificationIOS,ScrollView, Image, TouchableWithoutFeedback, Platform, Linking,Alert} from 'react-native';

import appVars from '../../appVars';
import appStyles from '../../appStyles';

import { NavigationActions } from 'react-navigation'
import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';
import store from 'react-native-simple-store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


class DrawerContainer extends React.Component {
	handleURL = (url)=>{
		const route = url.replace(/.*?:\/\//g, '');
		const id = route.match(/\/([^\/]+)\/?$/)[1];
		const routeName = route.split('/')[0];
		const routeName2 = route.split('/')[1];
		console.log(routeName);
		console.log(routeName2);
		console.log(id);
		if(routeName2=="newsfeed"){
			this.naviagatePage(id);
		}
		
	}
	configureLocalNotification(){
		
		PushNotification.configure({
				// (optional) Called when Token is generated (iOS and Android)
				onRegister: function(token) {
					console.log( 'TOKEN:', token );
				},
				// (required) Called when a remote or local notification is opened or received
				onNotification: (notification)=> {
					
					const { navigation } = this.props;
					
					
					//Alert.alert(" IGNORE THIS ALERT ",notification.id+ " " +" "+ notification.data.alarmID);
					//Alert.alert("USER INFO",);
					
					
					store.delete("PENDING_EXERCISE");
					navigation.navigate('LocalNotification',
						{
							localNotification:true,
							alarmID:notification.id || notification.data.id || notification.data.alarmID}
						);
					
					// process the notification
					
					// required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
					notification.finish(PushNotificationIOS.FetchResult.NoData);
					return;
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
	componentWillMount = async ()=> {
		
		
		this.configureLocalNotification();
		
		/*OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('registered', this.onRegistered);
		OneSignal.addEventListener('ids', this.onIds);*/
		let newsid = await store.get('deepLinkNewsId'); 
		store.delete('deepLinkNewsId');
		if(newsid){
			this.naviagatePage(newsid);
		}
		if (Platform.OS === 'android') {
			Linking.getInitialURL().then(url => {
				if(url){
					this.handleURL(url);
				}
				
			});
		} else {
				Linking.addEventListener('url', (event)=>{
					
					if(event.url){
						this.handleURL(event.url);
					}
				});
			}
	}
	componentDidMount = async ()=>{
		let pendingExercise = await store.get("PENDING_EXERCISE");
		if(pendingExercise){
			Alert.alert("Found exercise",pendingExercise.totalDuration+"--"+pendingExercise.currentExercise);
			const { navigation } = this.props;
			navigation.navigate("Training",{exerciseRestart: true});
			return;
		}
	}
	componentWillUnmount=()=> {
			/*OneSignal.removeEventListener('received', this.onReceived);
			OneSignal.removeEventListener('opened', this.onOpened);
			OneSignal.removeEventListener('registered', this.onRegistered);
			OneSignal.removeEventListener('ids', this.onIds);
			
				Linking.removeEventListener('url', (event)=>{
					
				});*/
			
	}

	onReceived(notification) {
		
	}
	naviagatePage = (newsid)=>{
		const { navigation } = this.props;
		navigation.navigate('NewsDetail', {newsid});
	}

	onOpened=(openResult)=> {
		
/*
		onNotificationOpened: function(message, data, isActive) {
			if (data.p2p_notification) {
			  for (var num in data.p2p_notification) {
				// console.log(data.p2p_notification[num]);
			  }
			}
		  }
*/

		this.naviagatePage(openResult.notification.payload.additionalData.newsid);  
	}

	onRegistered(notifData) {


		
	}

	onIds(device) {
		
		store.save("PUSH_TOKEN",device.pushToken);
		store.save("USER_ID",device.userId);
	}
	isActiveClass = (key)=>{

		if(this.props.activeItemKey.toLowerCase()===key.toLowerCase()){
			return {
				backgroundColor: appVars.colorDrawerIsActiveBackgroundColor
			};
		}

	}
	render = ()=> {

		const { navigation } = this.props
		return (
		<ScrollView style={appStyles.drawerContainer}>



			<TouchableWithoutFeedback onPress={() => navigation.navigate('Home')} >
				<View style={[appStyles.drawerItem,this.isActiveClass('home')]}>
				<MaterialIcons style={appStyles.drawerIcon} name="home">
				
				</MaterialIcons>
				<Text style={appStyles.drawerLabel}>{appVars.labelHome.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			<View style={appStyles.drawerSeperator} />
			
			<TouchableWithoutFeedback onPress={() => navigation.navigate('Alarms')} >
				<View style={[appStyles.drawerItem,this.isActiveClass('Alarms')]}>
				<FontAwesome name="calendar" style={appStyles.drawerIcon} >
				
				</FontAwesome>
				<Text style={appStyles.drawerLabel}>{"Alarms".toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			<View style={appStyles.drawerSeperator} />
			
			<TouchableWithoutFeedback onPress={() => navigation.navigate('Training')} style={this.isActiveClass('settings')}>
				<View style={[appStyles.drawerItem,this.isActiveClass('training')]}>
				<MaterialIcons style={appStyles.drawerIcon} name="play-arrow">
				
				</MaterialIcons>
				
				<Text style={appStyles.drawerLabel}>{appVars.labeleTraining.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			
		</ScrollView>
		)
	}
}
export default DrawerContainer;

//adb shell input keyevent 82