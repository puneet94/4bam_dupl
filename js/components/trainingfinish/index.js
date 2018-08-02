import React, { PureComponent } from 'react';
import {Text,View,Button,Alert,Slider,Image,ScrollView,TouchableHighlight} from "react-native";
import appVars from "../../appVars";
import appStyles from "../../appStyles";
import store from "react-native-simple-store";
import Rating from "../rating";
import {getNextAlarm2,getNextAlarm} from "../../services/dateService";
const GERMAN_DAYS_MAPPING = {
    MONDAY: "Montag",
    TUESDAY: "Dienstag",
    WEDNESDAY: "Mittwoch",
    THURSDAY: "Donnerstag",
    FRIDAY: "Freitag",
    SATURDAY: "Samstag",
    SUNDAY: "Sonntag"
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
        console.log(rating);
        var dataPost = new FormData();
        dataPost.append( "formDataInsert",  JSON.stringify(rating));
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/rating.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint, {
            method: 'post',
            body: dataPost  
        });
        const response2 = await response.json();
        //console.log(response2);
        if(response2["@status"]=="OK"){
            
            Alert.alert(
                'OK',
                'Vielen Dank für die Teilnahme',
                [
                  {text: 'OK', onPress: () => this.navigateHomePage()},
                ],
                { cancelable: false }
              )


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
                //console.log("alarm_check",ALARM_TIMES,ALARM_DAYS);
                const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                this.setState({time:alarmTime,day:dayName,totalDuration});             
                //Alert.alert("total duration",totalDuration+"-");
        }        
    }
    render(){
        return (
            <ScrollView style={{flex:1, backgroundColor:"white"}}>
                        <View style={appStyles.contentElement}>
            <Text style={appStyles.headline}>Super gemacht!</Text>
            <Image source={require ('../../../assets/images/thumbup.png') } style={{width: appVars.screenX, height: appVars.screenX}} />
        
            {this.state.day && this.state.time && this.state.ratingVisible!=true?<Text style={appStyles.h3}>Dein nächstes Training ist am {GERMAN_DAYS_MAPPING[this.state.day]} um {this.state.time} Uhr.</Text>: null }


            </View>

            {this.state.ratingVisible===true?<View style={appStyles.contentSeperator} />: null }

                {this.state.ratingVisible===true?<Rating onRating={this.onRating}/>: null }

                  {this.state.ratingVisible===true?<TouchableHighlight onPress={this.navigateHomePage} style={{backgroundColor:appVars.colorLightGray, padding:10, marginRight: 10,marginLeft: 10, height:35, borderRadius:5,marginBottom:10,}} >
   <View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
       <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>BEWERTUNG ÜBERSPRINGEN</Text>
   </View>
</TouchableHighlight>: null }
            
            
            </ScrollView>
        );
    }
}