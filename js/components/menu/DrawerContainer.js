import React from 'react'
import { Text, View, PushNotificationIOS,ScrollView, TouchableWithoutFeedback, Image, Platform, Linking, Alert} from 'react-native';
import OpenSettings from 'react-native-open-settings';
import appVars from '../../appVars';
import appStyles from '../../appStyles';


import PushNotification from 'react-native-push-notification';
import OneSignal from 'react-native-onesignal';
import store from 'react-native-simple-store';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image'
import moment from "moment";

class DrawerContainer extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			firstName: "",
			groupName: "",
			logo: ""
		}
	}

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

    performLogout = ()=> {
        store.save("LOGGED_IN",false);
            store.delete(appVars.STORAGE_KEY)
            const { navigation } = this.props;
            navigation.navigate('Login');
    }
	configureLocalNotification(){
		
		PushNotification.configure({
				// (optional) Called when Token is generated (iOS and Android)
				onRegister: function(token) {
					console.log( 'TOKEN:', token );
				},
				// (required) Called when a remote or local notification is opened or received
				onNotification: (notification)=> {
					console.log("local notification received",notification);
					const { navigation } = this.props;
					
					//Alert.alert(" IGNORE THIS ALERT ",notification.id+ " " +" "+ notification.data.alarmID);
					//Alert.alert("USER INFO",);
					
					store.delete("PENDING_EXERCISE");
					(notification.fireDate || notification.data) && navigation.navigate('LocalNotification',
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
		let firstName = await store.get("FIRSTNAME");
		let groupName = await store.get("GROUPTITLE");
		let pushgroup = await store.get("GROUPS");
		let logo = await store.get("GROUPLOGO");

        this.setState({
            firstName
		});
		this.setState({
            groupName
		});
		this.setState({
            logo
		});
		

		
		OneSignal.getPermissionSubscriptionState(async (status)=>{

			if(!status.notificationsEnabled){
				//OneSignal.setSubscription(true);
				OneSignal.sendTag("group", pushgroup);

			Alert.alert(
				'Push notification',
				'If push notification are not enabled the app wont work properly. Do you want to enable?',
				[
				  {text: 'Deny', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				  {text: 'Accept', onPress: ()=>{
					  if(Platform.OS === 'android'){
						OpenSettings.openSettings()
					  }else{
						Linking.openURL('app-settings:1')
					  }	
				}}
				],
				{ cancelable: true}
			  )
			
				
			}            
        });
		this.configureLocalNotification();
		//OneSignal.init("edf77b0d-d501-4977-a101-1f0f26fe4d77",{kOSSettingsKeyAutoPrompt : true});//425266528939");
		
		OneSignal.addEventListener('received', this.onReceived);
		OneSignal.addEventListener('opened', this.onOpened);
		OneSignal.addEventListener('registered',this.onRegistered);
		OneSignal.addEventListener('ids', this.onIds);
		


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
		this.openTrainingScreen("appstart");
		
	}
	componentWillUnmount=()=> {
		
			OneSignal.removeEventListener('received', this.onReceived);
			OneSignal.removeEventListener('opened', this.onOpened);
			
			OneSignal.removeEventListener('ids', this.onIds);
			
				Linking.removeEventListener('url', (event)=>{
					
				});
			
	}

	onReceived(notification) {
		console.log("notification received",notification);
	}
	naviagatePage = (newsid)=>{
		const { navigation } = this.props;
		navigation.navigate('NewsDetail', {newsid});
	}

	onOpened=(openResult)=> {

		if(openResult && openResult.notification && openResult.notification.payload && openResult.notification.payload.additionalData){
			openResult.notification.payload.additionalData.newsid && this.naviagatePage(openResult.notification.payload.additionalData.newsid);  
		}
		
	}
	onRegistered(notifData) {
		console.log("on registered",notifData);
	}
	logout = ()=>{
        store.delete(appVars.STORAGE_KEY)
        const { navigation } = this.props;
        navigation.navigate('Login');
	}


	openTrainingScreen = async (appstart)=>{
		var currentTime = moment();
		//console.log("date diff",moment().diff(moment("28-07-2018","DD-MM-YYYY"), 'days'));
		let pendingExercise = await store.get("PENDING_EXERCISE");
		let exerciseRestart = false;
		if(pendingExercise){
			
			let {previousExerciseTime} = pendingExercise;
			if(previousExerciseTime){

				previousExerciseTime = moment(previousExerciseTime,"DD-MM-YYYY");
				var currentTime = moment();
				
				if(currentTime.diff(previousExerciseTime, 'days')>0){
					exerciseRestart = false;
				} else{
					exerciseRestart = true
				}
			}else{
				exerciseRestart = false;
			}
		}else{
			exerciseRestart = false;
		}
		if(appstart){
			if(exerciseRestart){
				
				this.checkUserAuthenticated("Training",{exerciseRestart});
			}else{
				store.delete("PENDING_EXERCISE");
			}
			return;
			
		}else{
			
				this.checkUserAuthenticated("Training",{exerciseRestart});			
		
		}
		
	}
	checkUserAuthenticated = async (pageUrl,pageParams)=>{
		let APIKEY = appVars.apiKey;
		let userStoredID  = await store.get(appVars.STORAGE_KEY);
		
		if(userStoredID){
			let authFetch  = await fetch(`https://www.app-4bam.de/api/user.html?authtoken=${[APIKEY]}&userid=${userStoredID}`);
			let authResponse = await authFetch.json();
			console.log("auth response",authResponse);
			if(authResponse["@status"]=="OK"){
				const { navigation } = this.props;
				navigation.navigate(pageUrl,{...pageParams,isAllowToWatchVideo:authResponse.response.isAllowToWatchVideo});
			}else{
				this.logout();
			}
		}else{
			this.logout();
		}
		

	}
	onIds(device) {
		console.log("onids called");
		console.log(device);
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

			<Image source={require ('../../../assets/images/app_bg_drawer.png')} style={{position: 'absolute',
	left: 0,
	top: 0,width: appVars.drawerWidth, height: appVars.drawerWidth}} />
			
			<View style={{alignItems:'center',
				justifyContent:'center',height: 200, width: appVars.drawerWidth}}> 

			<FastImage
			  style={{
				borderWidth: 2,
				borderColor: appVars.colorMain,
				alignItems:'center',
				justifyContent:'center',
				width:100,
				height:100,
				borderRadius:100,
			}}
          	source={{uri: appVars.serverUrl+'/'+this.state.logo}}
        	/>

			<Text style={{fontFamily: appVars.fontMain,  color: appVars.colorWhite, fontSize: 24 }}>{this.state.firstName}</Text>
			<Text style={{fontFamily: appVars.fontText,  color: appVars.colorWhite, fontSize: 11, marginLeft:10,marginRight:10}}>{this.state.groupName}</Text>
	

			
			</View>

			<TouchableWithoutFeedback onPress={() => navigation.navigate('Home')} >
				<View style={[appStyles.drawerItem,this.isActiveClass('Home')]}>
				<MaterialCommunityIcons style={appStyles.drawerIcon} name="home-account" />
				<Text style={appStyles.drawerLabel}>{appVars.labelHome.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>
			<View style={appStyles.drawerSeperator} />
			<TouchableWithoutFeedback onPress={() => navigation.navigate('Alarms')} >
				<View style={[appStyles.drawerItem,this.isActiveClass('Alarms')]}>
				<MaterialCommunityIcons name="alarm-multiple" style={appStyles.drawerIcon} />
				<Text style={appStyles.drawerLabel}>{appVars.labelTimeTable.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			<View style={appStyles.drawerSeperator} />
			
			<TouchableWithoutFeedback onPress={() => this.openTrainingScreen()} style={this.isActiveClass('settings')}>
				<View style={[appStyles.drawerItem,this.isActiveClass('training')]}>
				<MaterialCommunityIcons style={appStyles.drawerIcon} name="view-carousel" />
				
				<Text style={appStyles.drawerLabel}>{appVars.labeleTraining.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>

			<View style={appStyles.drawerSeperator} />
			
			<TouchableWithoutFeedback onPress={() => this.checkUserAuthenticated('News')} style={this.isActiveClass('settings')}>
				<View style={[appStyles.drawerItem,this.isActiveClass('news')]}>
				<MaterialCommunityIcons style={appStyles.drawerIcon} name="view-list" />
				
				<Text style={appStyles.drawerLabel}>{appVars.labelNews.toUpperCase()}</Text>
				</View>
			</TouchableWithoutFeedback>
			
			<View style={appStyles.drawerSeperator} />
			
		</ScrollView>
		
		
		)
	}
}
export default DrawerContainer;

//adb shell input keyevent 82