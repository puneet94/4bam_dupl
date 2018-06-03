import React,{PureComponent} from "react";
import {
    View,Text,Button,Modal,StyleSheet,TextInput,FlatList,TouchableOpacity
} from "react-native";
import appVars from "../../appVars";
import appStyles from '../../appStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from "moment";
import {getNearestDay} from "../../services/dateService.js";
const NOTIFICATION_DATE_FORMAT = 'YYYY-MM-DD';
import {scheduleLocalNotification,cancelNotification} from "../../services/localNotification";
import store from "react-native-simple-store";
import AlarmDate from "./alarmDate";

const GERMAN_DAYS_MAPPING = {
    MONDAY: "MONTAG",
    TUESDAY: "DIENSTAG",
    WEDNESDAY: "MITTWOCH",
    THURSDAY: "DONNERSTAG",
    FRIDAY: "FREITAG",
    SATURDAY: "SAMSTAG",
    SUNDAY: "SONNTAG"
}
export default class AlarmSceen extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            temporaryText:"",
            temporaryID: null,
            temporaryDay: "",
            alarmDays: ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"],
            modalVisible: false,
            validalarms: {},
            ALARM_DAYS: {
                "MONDAY": [],
                "TUESDAY": [],
                "WEDNESDAY":[],
                "THURSDAY": [],
                "FRIDAY": [],
                "SATURDAY": [],
                "SUNDAY": [],
            },
            ALARM_TIMES:{}
        }
    }

    componentWillMount= async ()=>{
        
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/validalarms.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        let validalarms = json.response;
        this.setState({validalarms});
        console.log("valid alarms",validalarms);
        

        let ALARM_DAYS = await store.get('ALARM_DAYS');
        if(ALARM_DAYS){
            this.setState({
                ALARM_DAYS
            });
        }
        let ALARM_TIMES = await store.get('ALARM_TIMES');
        
        if(ALARM_TIMES){
            this.setState({
                ALARM_TIMES
            })


        
            
        }
    }
    changeAlarm=(alarmID,{time,text})=>{    
        const alarmValue = this.state.ALARM_TIMES[alarmID];
        let newAlarmValue = {...alarmValue};
        let scheduleNotification = false;
        console.log(time,"time changed");
        if(time){
            if(time !== alarmValue.alarmTime){
                const alarmDate = moment(getNearestDay(alarmValue.dayName))
                                    .format(NOTIFICATION_DATE_FORMAT)+" "+time;
                cancelNotification(alarmID);
                
                newAlarmValue = {...newAlarmValue,alarmDate,alarmTime:time}
                scheduleNotification = true;
            }
        }
        if(text){
            if(text != alarmValue.alarmText){
                
                cancelNotification(alarmID);
                newAlarmValue = {...newAlarmValue, alarmText:text}
                scheduleNotification = true;
            }
        }        
        if(scheduleNotification){
            const ALARM_TIMES = {...this.state.ALARM_TIMES,[alarmID]:newAlarmValue};
            this.setState({
                ALARM_TIMES
            });
            store.delete("ALARM_TIMES");
            store.save("ALARM_TIMES",ALARM_TIMES);
            scheduleLocalNotification(
                newAlarmValue.alarmText,
                newAlarmValue.alarmDate,
                newAlarmValue.alarmID,"week",
                {...newAlarmValue,alarmID:newAlarmValue.alarmID}
            );
        }
        
    }
    openTimeTableTextModal=(alarmValue)=>{
        
        this.setState({
            temporaryText: alarmValue.alarmText,
            temporaryID: alarmValue.alarmID,
            modalVisible: true
        });
    }
    closeModal=()=>{
        this.changeAlarm(
            this.state.temporaryID,{text:this.state.temporaryText}
        );
        this.setState({modalVisible:false});
    }
    deleteAlarm = (alarmID) => {
        const alarmValue = this.state.ALARM_TIMES[alarmID];
        const alarmDay = this.state.ALARM_DAYS[alarmValue.dayName];
        const index = alarmDay.indexOf(alarmID);
        const newAlarmDay = [
            ...alarmDay.slice(0, index),
            ...alarmDay.slice(index + 1)
        ]
        const ALARM_DAYS = {...this.state.ALARM_DAYS,[alarmValue.dayName]:newAlarmDay}
        let ALARM_TIMES = {...this.state.ALARM_TIMES};
        cancelNotification(alarmID);
        delete ALARM_TIMES[alarmID];
        
        this.setState({
            ALARM_TIMES,
            ALARM_DAYS
        });
        store.delete("ALARM_DAYS");
        store.delete("ALARM_TIMES");
        store.save("ALARM_TIMES",ALARM_TIMES);
        store.save("ALARM_DAYS",ALARM_DAYS);
        
    }
    addAlarm = async (item)=>{
        
        let alarmID  = await store.get("ALARM_ID");
        
        alarmID  = alarmID?(Number(alarmID)+1) : 1;
        await store.save("ALARM_ID",alarmID);
        
        let newAlarm = {
            dayName: item,
            alarmID,
            alarmText: item+" alarm",
            alarmDate: null,
            alarmTime: null
        };
        const newAlarmDays = {...this.state.ALARM_DAYS,[item]:[...this.state.ALARM_DAYS[item],alarmID]}
        const newAlarmTimes = {...this.state.ALARM_TIMES,[alarmID]:newAlarm};
        
        this.setState({
            ALARM_DAYS: newAlarmDays,
            ALARM_TIMES: newAlarmTimes
        });
        
        store.delete('ALARM_DAYS');
        store.save('ALARM_DAYS',newAlarmDays);
        store.delete('ALARM_TIMES');
        store.save('ALARM_TIMES',newAlarmTimes);
    }
    _keyExtractor = (item,index)=>index;
    _renderItem = ({item,index})=>{
        if(this.state.validalarms && this.state.validalarms[index+1]){
        return (
            <View style={{flex:1}}>
        
            <TouchableOpacity style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:appVars.colorWhite,  margin: 10}} onPress={()=>this.addAlarm(item)} >

            <View style={appStyles.alarmDayWrapper}><Text style={appStyles.alarmDay}>{GERMAN_DAYS_MAPPING[item]}</Text></View>

            <MaterialCommunityIcons name="alarm-plus" style={{color: appVars.colorMain,fontSize:24}} />

            </TouchableOpacity>


       

            
            <View>
                {
                    this.state.ALARM_DAYS[item] && 
                    this.state.ALARM_DAYS[item].map((alarmID,index)=>{
                            const alarmValue = this.state.ALARM_TIMES[alarmID];
                            if(alarmValue){
                                return (
                                    <AlarmDate 
                                        key={index} 
                                        alarmValue={alarmValue} 
                                        changeAlarm={this.changeAlarm}
                                        deleteAlarm={this.deleteAlarm}
                                        openTimeTableTextModal={this.openTimeTableTextModal}
                                    />
                                )
                            }
                        }
                    )
                }
            
            </View>

            <View style={appStyles.contentSeperator} />

        </View>
        );}
        else{
            return null
        }
    }
    render(){
        
        return(
            <View style={appStyles.container}>
                <FlatList
                    style={{flex:1}}
                    data={this.state.alarmDays}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />

                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <TextInput
                                onChangeText={(temporaryText) => this.setState({temporaryText})}
                                value={this.state.temporaryText}
                            />
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close"
                                color="#09437f"
                            />    
                        </View>
                    </View>
                </Modal>
            </View>
        );
        
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    innerContainer: {
      alignItems: 'center',
    },
  });