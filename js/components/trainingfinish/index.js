import React, { PureComponent } from 'react';
import {Text,View,Button,Alert,Slider} from "react-native";
import appVars from "../../appVars";
import appStyles from "../../appStyles";
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
            totalDuration: 0,
            ratingVisible: false,
            
        }
    }
    navigateHomePage = ()=>{
        const { navigation } = this.props;
        navigation.navigate("Home");
    }
    onRating=async (rating)=>{
        //Alert.alert(`Thanks for the ${JSON.stringify(rating)} rating`);
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/rating.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(rating)
        });
        const response2 = await response.json();
        
        if(response2["@status"]=="OK"){
            this.navigateHomePage();
        }
    }
    
    async fetchRating() {
      let userStoredID  = await store.get(appVars.STORAGE_KEY);
      let apiHitPoint = appVars.apiUrl+"/rating.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
      const response = await fetch(apiHitPoint);
      const json = await response.json();
      if(json.response[0].voteday===true && json.response.length) {
          this.setState({ratingVisible: true});
      }
    }

    componentWillMount = async ()=>{
        await this.fetchRating();
                     
                
        if(this.props.navigation.state.params){
            const totalDuration = this.props.navigation.state.params.totalDuration;
                let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                console.log("alarm_check",ALARM_TIMES,ALARM_DAYS);
                const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                this.setState({time:alarmTime,day:dayName,totalDuration});             
                Alert.alert("total duration",totalDuration+"-");
        }        
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>

                {this.state.ratingVisible===true?<Rating onRating={this.onRating}/>: null }
                
                {this.state.day?<Text style={{color: 'black'}}>Dein nächstes Training am {GERMAN_DAYS_MAPPING[ this.state.day.toUpperCase()]} um {this.state.time} Uhr</Text>: null }


  <Button
  onPress={this.navigateHomePage}
  
  title="Skip"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>


            </View>
        );
    }
}