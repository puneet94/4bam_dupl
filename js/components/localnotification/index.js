import React,{PureComponent} from "react";
import {
    View,Text,Button,Picker
} from "react-native";
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
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <View style={{justifyContent:"center",alignItems:"center"}}>
                <Button
                    onPress={()=>this.redirectTraining()}
                    title="Start Training"
                    color="#09437f"
                    />
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                    <Button style={{width:100}}
                        onPress={()=>this.snoozeAlarm()}
                        title="Snooze"
                        color="#09437f"
                    />

                    <Picker style={{width:150}}
                        selectedValue={this.state.snoozeTime}
                        onValueChange={(itemValue, itemIndex) => this.setState({snoozeTime: itemValue})}>
                            <Picker.Item label="1 minutes" value="1" />
                            <Picker.Item label="5 minutes" value="5" />
                            <Picker.Item label="10 minutes" value="10" />
                            <Picker.Item label="15 minutes" value="15" />
                            <Picker.Item label="20 minutes" value="20" />
                            <Picker.Item label="25 minutes" value="25" />
                            <Picker.Item label="30 minutes" value="30" />
                            <Picker.Item label="45 minutes" value="45" />
                            <Picker.Item label="60 minutes" value="60" />
                    </Picker>
                </View>
            </View>
        </View>);
        
    }
}