import React,{PureComponent} from "react";
import {
    View,Text,Button,Picker,StyleSheet,TouchableOpacity
} from "react-native";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import store from "react-native-simple-store"
import {scheduleLocalNotification} from "../../services/localNotification";
import moment from "moment";
const NOTIFICATION_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
export default class LocalNotificationScreen extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
           timeTable: {},
           snoozeTime: 1,
           actualID: ""
        }
    }
    componentWillMount = async()=>{
        const {localNotification,alarmID} = this.props.navigation.state.params;
        if(localNotification){
            this.alarmTimes = await store.get("ALARM_TIMES");
            if(this.alarmTimes){
                this.alarmValue = this.alarmTimes[alarmID];
                
                /*const { navigation } = this.props;
                //navigation.navigate('Menu');*/
            }
        }
    }
    redirectTraining(){
        const { navigation } = this.props;
        navigation.navigate('Training',{localNotification:true,alarmID:this.alarmValue.alarmID});
    }
    async snoozeAlarm(){
        let alarmDate = moment().add(this.state.snoozeTime,"minutes").format(NOTIFICATION_DATE_TIME_FORMAT);
        
        let alarmID  = await store.get("ALARM_ID");
        alarmID  = alarmID?(Number(alarmID)+1) : 1;
        store.save("ALARM_ID",alarmID);
        console.log(alarmID);

        const newAlarmValue = {...this.alarmValue,alarmDate,alarmID,snooze:true}
        scheduleLocalNotification(newAlarmValue.alarmText,alarmDate,alarmID,null,{...newAlarmValue,alarmID});
        
        store.delete("ALARM_TIMES");
        store.save("ALARM_TIMES",{...this.alarmTimes,[alarmID]:newAlarmValue});

        const { navigation } = this.props;

        navigation.navigate('Home');
    }
    render = ()=>{
        return (
        <View style={appStyles.container}>
            <View style={{flex: 1,justifyContent:"center",alignItems:"center"}}>

            <TouchableOpacity  style={appStyles.startButton} activeOpacity = { .5 } onPress={()=>this.redirectTraining()}>
                <Text style={appStyles.startButtonText}>JETZT STARTEN</Text>
            </TouchableOpacity>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>

                    <Button style={{width:20}}
                        onPress={()=>this.snoozeAlarm()}
                        title="Snooze"
                        color="#09437f"
                    />

                    <Picker style={{width:100}}
                        selectedValue={this.state.snoozeTime}
                        onValueChange={(itemValue, itemIndex) => this.setState({snoozeTime: itemValue})}>
                            <Picker.Item label="5 Minuten" value="5" />
                            <Picker.Item label="10 Minuten" value="10" />
                            <Picker.Item label="15 Minuten" value="15" />
                            <Picker.Item label="20 Minuten" value="20" />
                            <Picker.Item label="25 Minuten" value="25" />
                            <Picker.Item label="30 Minuten" value="30" />
                            <Picker.Item label="45 Minuten" value="45" />
                            <Picker.Item label="60 Minuten" value="60" />
                    </Picker>
                </View>
            </View>
            </View>);
        
    }
}
const styles = StyleSheet.create({
 
   
    TextStyle:{
        color:'#fff',
        textAlign:'center',
    }
   
  });