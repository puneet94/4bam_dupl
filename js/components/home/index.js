import React, { Component } from 'react';
import {Text,View,ScrollView,ActivityIndicator,BackHandler,Platform,Alert,TouchableOpacity,TouchableHighlight} from "react-native";
import store from "react-native-simple-store";
import appVars from "../../appVars";
import appStyles from "../../appStyles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-easy-toast'

import HTMLView from 'react-native-htmlview';


export default class Home extends Component{
    constructor(props){
        super(props);
        this.backButtonListener = null;
        this.days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
        this.exitApp = 0;
        this.state = {
            position: 'bottom',
            dayMessages: [],
            weekPlan: {},
            homeLoading: true
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight: <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
              <MaterialCommunityIcons name="account" style={{color: appVars.colorMain,fontSize:24,marginRight:10}} />
        </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <MaterialCommunityIcons name="settings" style={{color: appVars.colorMain,fontSize:24,marginRight:5}} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Inprint')}>
              <MaterialCommunityIcons name="dots-vertical" style={{color: appVars.colorMain,fontSize:24,marginRight:10}} />
            </TouchableOpacity>
    
        </View>
        };
      };       

    onClick=(text, position, duration,withStyle)=>{
        this._mounted && this.setState({
            position: position,
        });
        if(withStyle){
            this.refs.toastWithStyle.show(text, duration);
        }else {
            this.refs.toast.show(text, duration);
        }
    }

    backHandlerListener = ()=>{
        // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
        // Typically you would use the navigator here to go to the last state.
        this.exitApp++;
        if(this.exitApp==1){
            this.onClick('Press again to exit', 'bottom', 1000);
        }
        else if(this.exitApp==2){
            BackHandler.exitApp();
        }
        setTimeout(() => {this.exitApp = 0}, 1000);
        return true;
    }
    attachBackHandler = ()=>{
        if(Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', this.backHandlerListener);
        }
    }

    componentWillMount = async()=>{
        this._mounted = true;
        await this.fetchWeekView();
        await this.fetchDayMessage();
        
        let firstName = await store.get("FIRSTNAME");
        this._mounted && this.setState({
            firstName
        });
               
        this.attachBackHandler();

        this.props.navigation.setParams({ 
            handleLogout: this.logOut
        });   
        this._mounted && this.setState({
            homeLoading: false
        }) 

    }

    componentWillUnmount = ()=>{
        this._mounted = false;
        if(Platform.OS === 'android' && this.backButtonListener) {
            this.backButtonListener.remove();
        }
    }



    start= async  (pageParams)=>{
        let APIKEY = appVars.apiKey;
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
		console.log(userStoredID);
		if(userStoredID){
			let authFetch  = await fetch(`https://www.app-4bam.de/api/user.html?authtoken=${[APIKEY]}&userid=${userStoredID}`);
			let authResponse = await authFetch.json();
			console.log("auth response",authResponse.response);
			if(authResponse["@status"]=="OK"){
				const { navigation } = this.props;
				navigation.navigate('Training',{...pageParams,isAllowToWatchVideo:authResponse.response.isAllowToWatchVideo});
			}else{
				this.logout();
			}
		}else{
			this.logout();
		}

    }


    async fetchDayMessage(){
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/motd.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        if(json.response && json.response.length) {
            this._mounted && this.setState({dayMessages:json.response});
        }
        
    }

    
    async fetchWeekView() {
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/weekview.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        this._mounted && this.setState({weekPlan: json.response});
        
    }

    day(name) {
        
        return  this.days[name];
        
    }

    renderWeekPlan = ()=>{
        
        if(Object.keys(this.state.weekPlan).length){
            const weekDays = Object.keys(this.state.weekPlan).sort();
            
            return weekDays.map((weekDay)=>{
                var timeline_dot_outer;
                var timeline_text;

               if(this.state.weekPlan[weekDay].today===true ) {

                timeline_dot_outer = appStyles.timeline_dot_outer_today;

               } else {

                timeline_dot_outer = appStyles.timeline_dot_outer;

               }
               if(this.state.weekPlan[weekDay].care===true){
                timeline_text = appStyles.timeline_text_care;
               }else{
                timeline_text = appStyles.timeline_text;
               }
                const dayPlans = this.state.weekPlan[weekDay].blocks;                          
                return <View style={appStyles.timeline_container} key={weekDay}>

                <View style={appStyles.timeline_datecontainer}>
                
                <Text style={appStyles.timeline_date}>{this.day(weekDay-1)}
                </Text>

                </View>

           
                <View style={appStyles.timeline_line_container}>
                    <View style={timeline_dot_outer}>
                        <View style={appStyles.timeline_dot_inner} />
                    </View>
                
                <View style={appStyles.timeline_line} />
            
            </View>
        
           
            <View style={appStyles.timeline_content}>
       

        
                   { dayPlans.map((dayPlan,index)=>{
                return <View key={dayPlan.id}>
                        <Text style={timeline_text}>{dayPlan.title}</Text>
                        
                        </View>
                            })
                        }
                        <View style={appStyles.timeline_content_seperator} />
                   </View>
                   </View>


   

            });
        }
    }
        render(){
            return (
                !this.state.homeLoading?<View style={{flex:1, backgroundColor: appVars.colorWhite}}>
                    <View style={appStyles.contentElement}>
                        <View style={{height:150}}>
                            {
                                this.state.dayMessages.map((dayMessage)=>{    
                                    return <ScrollView key={dayMessage.id}>
                                        <Text style={appStyles.headline}>{dayMessage.title}</Text>
    
                                        <HTMLView addLineBreaks={false} value={dayMessage.text} stylesheet={appStyles} onLinkPress={(url) => handleExternalUrl(url)} />
                                    </ScrollView>
                                })
                            }
                        </View>
                    </View>
                    <ScrollView style={appStyles.contenContainer}>
                        <View style={appStyles.contentElement}>{this.renderWeekPlan()}
                        </View>
                </ScrollView>
                
                <View style={appStyles.contentSeperator} />
                
                <View style={{marginBottom:5, paddingTop: 5}}>


                <TouchableHighlight onPress={()=>this.start()}style={{backgroundColor:appVars.colorMain,padding:10, marginRight: 10,marginLeft: 10, height:35, borderRadius:5}}>
                    <View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
                        <MaterialCommunityIcons name="view-carousel" style={{fontSize:18,color: "white",marginRight: 5}}/>
                        <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>JETZT TRAINIEREN</Text>
                    </View>
                </TouchableHighlight>
                </View>     
                <Toast ref="toast" position={this.state.position}/>
            </View>:<View style={{flex:1,justifyContent:"center", backgroundColor: appVars.colorWhite, alignItems:"center"}}><ActivityIndicator size="large"/></View>
        )
    }
}
