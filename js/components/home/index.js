import React, { Component } from 'react';
import {Text,View,Button,BackHandler,Platform,Alert} from "react-native";
import store from "react-native-simple-store";
import appVars from "../../appVars";
import Toast, {DURATION} from 'react-native-easy-toast'
import {getNextAlarm} from "../../services/dateService";
import HTMLView from 'react-native-htmlview';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.backButtonListener = null;
        this.exitApp = 0;
        this.state = {
            position: 'bottom',
            dayMessages: [],
            weekPlan: {}
        }
    }
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
        this.fetchWeekView();
        this.fetchDayMessage();
        /*let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                if(ALARM_DAYS && ALARM_TIMES){
                    const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                }*/
        let firstName = await store.get("FIRSTNAME");
        this.setState({
            firstName
        });
               
        this.attachBackHandler();
    }

    componentWillUnmount = ()=>{
        if(Platform.OS === 'android' && this.backButtonListener) {
            this.backButtonListener.remove();
        }
    }
    logOut = ()=>{
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
        
        this.setState({dayMessages:json.response});
        
    }

    async fetchWeekView() {
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/weekview.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        this.setState({weekPlan: json.response});
        
    }
    renderWeekPlan = ()=>{
        if(Object.keys(this.state.weekPlan).length){
            const weekDays = Object.keys(this.state.weekPlan).sort();
            return weekDays.map((weekDay)=>{
                const dayPlans = this.state.weekPlan[weekDay];
                return <View style={{flex:1}} key={weekDay}>
                    <Text>{weekDay}</Text>
                   {
                        dayPlans.map((dayPlan,index)=>{
                            return <View style={{flex:1}} key={index}>
                                
                                <Text>{dayPlan.title}</Text>
                            </View>
                        })
                    }
                </View>
            });
        }
    }
    render(){
        return (
            <View style={{flex:1,backgroundColor: appVars.colorWhite}}>
                <Text>Hallo {this.state.firstName}</Text>    
                <View style={{flex:1}}>
                    {
                        this.state.dayMessages.map((dayMessage)=>{
                        
                        
                            
                        return <View style={{flex:1}} key={dayMessage.id}>
                                
                                <Text>{dayMessage.title}</Text>
                                <HTMLView
                                    value={dayMessage.text}
                                />
                            </View>
                        })
                    }
                    
                </View>
                <View style={{flex:6}}>
                        {
                            this.renderWeekPlan()
                        }
                    </View>
                    <View style={{flex:1}}>
                        <Button
                        onPress={()=>this.logOut()}
                        title="Log OUT"
                        color={appVars.colorMain}
                        />
                    </View>
                <Toast ref="toast" position={this.state.position}/>
            </View>
        )
    }
}