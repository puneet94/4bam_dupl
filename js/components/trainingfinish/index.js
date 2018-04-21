import React, { PureComponent } from 'react';
import {Text,View,Button,Alert} from "react-native";
import store from "react-native-simple-store";
import Rating from "../rating";
import {getNextAlarm2,getNextAlarm} from "../../services/dateService";
export default class TrainingFinish extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            time: "",
            day: ""
        }
    }
    onRating=(rating)=>{
        Alert.alert(`Thanks for the ${rating} rating`);
    }
    componentWillMount = async ()=>{
        if(this.props.navigation.state.params){
            const localNotification = this.props.navigation.state.params.localNotification;
            const alarmID = this.props.navigation.state.params.alarmID;
                let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                //alarmID?getNextAlarm2(alarmID,ALARM_DAYS,ALARM_TIMES):
                const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                this.setState({time:alarmTime,day:dayName});             
        }        
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                <Text>{"Next alarm at"}</Text>
                <Text>{this.state.time}</Text>
                <Text>{this.state.day}</Text>
                <Rating onRating={this.onRating}/>
            </View>
        );
    }
}