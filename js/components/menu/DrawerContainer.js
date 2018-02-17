import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, TouchableWithoutFeedback, Platform, Linking} from 'react-native'

import appVars from '../../appVars';
import appStyles from '../../appStyles';

import { NavigationActions } from 'react-navigation'

import OneSignal from 'react-native-onesignal';
import store from 'react-native-simple-store';
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
	componentWillMount = async ()=> {
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
                <Text name="cog" style={appStyles.drawerIcon}>{"&"}</Text>
                    <Text style={appStyles.drawerLabel}>{appVars.labelHome.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			<View style={appStyles.drawerSeperator} />


			<TouchableWithoutFeedback onPress={() => navigation.navigate('Training')} style={this.isActiveClass('settings')}>
				<View style={[appStyles.drawerItem,this.isActiveClass('training')]}>
					<Text name="cog" style={appStyles.drawerIcon}>{"@"}</Text>
					<Text style={appStyles.drawerLabel}>{appVars.labeleTraining.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			<View style={appStyles.drawerSeperator} />

			<TouchableWithoutFeedback onPress={() => navigation.navigate('TimeTable')} style={this.isActiveClass('imprint')}>
				<View style={[appStyles.drawerItem,this.isActiveClass('timetable')]}>
					<Text name="balance-scale" style={appStyles.drawerIcon}>{"#"}</Text>
					<Text style={appStyles.drawerLabel}>{appVars.labelTimeTable.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>
		</ScrollView>
		)
	}
}

export default DrawerContainer;