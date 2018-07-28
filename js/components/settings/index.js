"use strict"
import React, { Component } from 'react';
import { 
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    Text,
    Alert,
    Switch,
    Picker,
    ToastAndroid,
    Slider,
    Platform
} from 'react-native'
import store from 'react-native-simple-store';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import OneSignal from 'react-native-onesignal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast, {DURATION} from 'react-native-easy-toast';

class SettingsScreen extends Component {
    constructor(props){
            super(props);
            this.state = {
                data: {},
                userPushnotification: true,
            }
        }

        fetchdata = async () => {
            
            let userid = await store.get(appVars.STORAGE_KEY);
            let noVideos = await store.get(appVars.NO_VIDEOS);
            const api = `${appVars.apiUrl}/user.html?authtoken=${appVars.apiKey}&userid=${userid}`;
          
            
            this.setState({ loading: true});
          
              fetch(api)
                .then(res => res.json())
                .then(res => {
                    console.log("user_data",res.response);
                  this.setState({
                    data: res.response || [],
                    error: res.error || null,
                    loading : false,
                    refreshing: false,
                    noVideos
                  })
                })
                .catch(error => {
                  this.setState({ error, loading: false });
                })
                
          };
    changeNoVideos = (params)=>{
        
        this.setState({
            noVideos: !params
        });
        store.save(appVars.NO_VIDEOS,!params);  
    }
      componentWillMount = async()=>{
        this.fetchdata();
        let fontSize = Number.parseInt(await store.get('fontSize'),10);
        if(fontSize){
          this.setState({
            fontSize
          });
        }
        OneSignal.getPermissionSubscriptionState((status)=>{
            console.log("subscription status",status);
            this.setState({
                userPushnotification: status.subscriptionEnabled
            });
            
        });
      }

    logOut = ()=>{

        Alert.alert(
            'Abmelden?',
            'Möchten Sie sich wirklich abmelden?',
            [
              {text: 'Abbrechen', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Abmelden', onPress: () => this.performLogout()},
            ],
            { cancelable: false }
          )
    }

      
    performLogout = ()=> {
        store.save("LOGGED_IN",false);
            store.delete(appVars.STORAGE_KEY)
            const { navigation } = this.props;
            navigation.navigate('Login');
    }

      changePushNotification = (value)=>{
        this.setState({userPushnotification: value});
        console.log("subscription value",value);
        OneSignal.setSubscription(value);
        if(Platform.OS === 'android') {        
            ToastAndroid.show(`Benachrichtigungen ${value?"eingeschaltet":"ausgeschaltet"}`, ToastAndroid.SHORT);
            } else {
            this.refs.toast.show(`Benachrichtigungen ${value?"eingeschaltet":"ausgeschaltet"}`, 2000);
          }
      }
      


    
      render() {
          return (
        <View style={appStyles.contenContainer}>
            <Toast ref="toast" style={appStyles.iOSToast} textStyle={appStyles.iOSToastText}/>
            <View style={appStyles.contentElement}>
                <Text style={appStyles.contentHeadline}>{appVars.textPushnotificationsHeadline}</Text>
                <Text style={appStyles.contentText}>{appVars.textPushnotifications}</Text>
                <View style={appStyles.settingsWrapper}>
                    <Text style={appStyles.settingsColStart}>{appVars.labelPushnotifications}</Text>
                    <View style={appStyles.settingsColEnd}>
                        <Switch onValueChange={ this.changePushNotification} value={this.state.userPushnotification} />
                    </View>
               </View>
            </View>

            
            <View style={appStyles.contentSeperator} />

      
            <Toast ref="toast" style={appStyles.iOSToast} textStyle={appStyles.iOSToastText}/>
            <View style={appStyles.contentElement}>
                <Text style={appStyles.contentHeadline}>{appVars.textVideosettingHeadline} VIDEOSSETTIING</Text>
                <Text style={appStyles.contentText}>{appVars.textVideosetting}</Text>
                {
                        this.state.data.isAllowToWatchVideo &&<View style={appStyles.settingsWrapper}>
                    <Text style={appStyles.settingsColStart}>VIDEO ON / OFF</Text>
                    <View style={appStyles.settingsColEnd}>
                    <Switch onValueChange={(params)=>this.changeNoVideos(params)} value={!this.state.noVideos}/>
                    </View>


                     
                       
                            
                     
                    

               </View>}
            </View>

            <View style={appStyles.contentSeperator} />


        <View style={appStyles.contentSeperator} />
                
                <View style={{marginBottom:5, paddingTop: 5}}>


                <TouchableHighlight onPress={()=>this.logOut()} style={{backgroundColor:appVars.colorMain,padding:10, marginRight: 10,marginLeft: 10, height:35, borderRadius:5}}>
                    <View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
                        <MaterialCommunityIcons name="power-settings" style={{fontSize:18,color: "white",marginRight: 5}}/>
                        <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>ABMELDEN</Text>
                    </View>
                </TouchableHighlight>
                </View>    
        </View>
        )
    }
  }

export default SettingsScreen;
