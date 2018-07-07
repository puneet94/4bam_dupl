import React, { PureComponent } from 'react';
import {Text,View,Button,Alert} from "react-native";
import store from "react-native-simple-store";
import Rating from "../rating";
import {getNextAlarm2,getNextAlarm} from "../../services/dateService";
const GERMAN_DAYS_MAPPING = {
    MONDAY: "MONTAG",
    TUESDAY: "DIENSTAG",
    WEDNESDAY: "MITTWOCH",
    THURSDAY: "DONNERSTAG",
    FRIDAY: "FREITAG",
    SATURDAY: "SAMSTAG",
    SUNDAY: "SONNTAG"
}
export default class TrainingFinish extends PureComponent{
    
    constructor(props){
        super(props);
        this.state = {
            time: "",
            day: "",
            totalDuration: 0
        }
    }
    onRating=(rating)=>{
        //Alert.alert(`Thanks for the ${rating} rating`);
    }
    componentWillMount = async ()=>{
        if(this.props.navigation.state.params){
            const totalDuration = this.props.navigation.state.params.totalDuration;
                let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                this.setState({time:alarmTime,day:dayName,totalDuration});             
                Alert.alert("total duration",totalDuration+"-");
        }        
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                <Text style={{color: 'black'}}>Dein nächstes Training am {GERMAN_DAYS_MAPPING[ this.state.day.toUpperCase()]} um {this.state.time} Uhr</Text>
        {/*<Rating onRating={this.onRating}/>*/}
            </View>
        );
    }
}