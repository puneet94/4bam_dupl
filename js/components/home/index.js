import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Button,Dimensions,BackHandler,Platform,Alert,TouchableOpacity, PixelRatio} from "react-native";
import store from "react-native-simple-store";
import appVars from "../../appVars";
import appStyles from "../../appStyles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';import Toast, {DURATION} from 'react-native-easy-toast'
import {getNextAlarm} from "../../services/dateService";
import HTMLView from 'react-native-htmlview';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.backButtonListener = null;
        this.days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'So', 'So'];
        this.exitApp = 0;
        this.state = {
            position: 'bottom',
            dayMessages: [],
            weekPlan: {}
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight: <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
          <TouchableOpacity onPress={() => params.handleLogout()}>
              <MaterialCommunityIcons name="power-settings" style={{color: appVars.colorMain,fontSize:24,marginRight:10}} />
              </TouchableOpacity>
        </View>
        };
      };       

    onClick=(text, position, duration,withStyle)=>{
        this.setState({
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
        this.fetchWeekView();
        this.fetchDayMessage();
        /*let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                if(ALARM_DAYS && ALARM_TIMES){
                    const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                }*/
        let firstName = await store.get("FIRSTNAME");
        this._mounted && this.setState({
            firstName
        });
               
        this.attachBackHandler();

        this.props.navigation.setParams({ 
            handleLogout: this.logOut
        });    

    }

    componentWillUnmount = ()=>{
        this._mounted = false;
        if(Platform.OS === 'android' && this.backButtonListener) {
            this.backButtonListener.remove();
        }
    }

    logOut = ()=>{

        Alert.alert(
            'Abmelden?',
            'Möchtest Du dich wirklich abmelden?',
            [
              {text: 'Abbrechen', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Abmelden', onPress: () => this.performLogout()},
            ],
            { cancelable: false }
          )
    }

    start(){
        const { navigation } = this.props;
        navigation.navigate('Training');
    }

    performLogout = ()=> {
        store.save("LOGGED_IN",false);
            store.delete(appVars.STORAGE_KEY)
            const { navigation } = this.props;
            navigation.navigate('Login');
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
                
                const dayPlans = this.state.weekPlan[weekDay].blocks;                          
                return <View style={appStyles.timeline_container} key={weekDay}>

                <View style={appStyles.timeline_datecontainer}>
                
                <Text style={appStyles.timeline_date}>{this.day(weekDay-1)}
                </Text>

                </View>

           
                <View style={appStyles.timeline_line_container}>
                    <View style={appStyles.timeline_dot_outer}>
                        <View style={appStyles.timeline_dot_inner} />
                    </View>
                
                <View style={appStyles.timeline_line} />
            
            </View>
        
           
            <View style={appStyles.timeline_content}>
       

        
                   { dayPlans.map((dayPlan,index)=>{
                return <View key={dayPlan.id}>
                        <Text style={appStyles.timeline_text}>{dayPlan.title}</Text>
                        
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
                <View style={{flex:1, backgroundColor: appVars.colorWhite}}>
                    
                    <View style={appStyles.contentElement}>
    
                        <View style={{height:150}}>
                    
                    
    
                    
                        {
                            this.state.dayMessages.map((dayMessage)=>{    
                             
    
                            return <ScrollView style={appStyles.contentElement} key={dayMessage.id}>
                                    
    
                                    <Text style={appStyles.headline}>{dayMessage.title}</Text>
    
                                    <HTMLView addLineBreaks={false} value={dayMessage.text} 
    
                                    stylesheet={appStyles}
    
                                    onLinkPress={(url) => handleExternalUrl(url)} />
    
    
                                </ScrollView>
                            }
                            
                            )
                        }
                        
                        </View>
                    </View>

                <ScrollView style={appStyles.contenContainer}>
                <View style={appStyles.contentElement}>
                        {
                            this.renderWeekPlan()
                        }
                        </View>
                </ScrollView>
                
                <View style={appStyles.contentSeperator} />
                
                <View style={{marginLeft: 15, marginTop:10, marginBottom: 10, marginRight: 15}}>
                        <Button
                        onPress={this.start.bind(this)}
                        title="JETZT TRAINIEREN"
                        color={appVars.colorMain}
                        />
                </View>

                <Toast ref="toast" position={this.state.position}/>
            </View>
        )
    }
}
