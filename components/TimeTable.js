import React,{PureComponent} from "react";
import {
    View,Text,Button,Modal,StyleSheet,TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import {getNearestDay} from "../services/dateService";
const NOTIFICATION_DATE_TIME_FORMAT = 'YYYY-MM-DD';
import {scheduleLocalNotification,cancelNotification} from "../services/localNotification";
import store from "react-native-simple-store"

export default class TimeTable extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            temporaryText:"",
            temporaryDay: "",
            modalVisible: false,
            timeTables: [{
                dayName: "MONDAY",
                dayID: "111111",
                dayID2: "1111111",
                text: "Monday alarm",
                alarmDate1: null,                 
                alarmDate2: null
            },{
                dayName: "TUESDAY",
                dayID: "222222",
                dayID2: "2222222",
                text: "Tuesday alarm",
                alarmDate1: null,                 
                alarmDate2: null
            },{
                dayName: "WEDNESDAY",
                dayID: "333333",
                dayID2: "3333333",
                text: "Wednesday alarm",
                alarmDate1: null,                 
                alarmDate2: null
            },{
                dayName: "THURSDAY",
                dayID: "444444",
                dayID2: "4444444",
                text: "Thursday alarm",
                alarmDate1: null,                 
                alarmDate2: null
            },{
                dayName: "FRIDAY",
                dayID: "555555",
                dayID2: "5555555",
                text: "Friday alarm",
                alarmDate1: null,                 
                alarmDate2: null
            },{
                dayName: "SATURDAY",
                dayID: "666666",
                dayID2: "6666666",
                text: "Saturday alarm",
                alarmDate1: null,                 
                alarmDate2: null
            },{
                dayName: "SUNDAY",
                dayID: "777777",
                dayID2: "7777777",
                text: "Sunday alarm",
                alarmDate1: null,
                alarmDate2: null
            }]
        }
    }
    async componentWillMount(){
        console.log("called mount");
        let timeTables = await store.get('TIME_TABLES');
        console.log(timeTables);
        if(timeTables && timeTables.length){
            this.setState({
                timeTables
            });
        }
    }
    changeTime(dayName,keyName,valueName){
        const index = this.state.timeTables.findIndex(timeTable => timeTable.dayName === dayName);
        const oldTimeTable = this.state.timeTables[index];
        
        const newTimeTable = {...oldTimeTable,[keyName]:valueName};
        const alarmDate1 = moment(getNearestDay(oldTimeTable.dayName)).format( NOTIFICATION_DATE_TIME_FORMAT)+" "+newTimeTable.firstTime;
        const alarmDate2 = moment(getNearestDay(oldTimeTable.dayName)).format( NOTIFICATION_DATE_TIME_FORMAT)+" "+newTimeTable.secondTime;
        const newTimeTable2 = {...newTimeTable,alarmDate1,alarmDate2}

        if(oldTimeTable.alarmDate1 !== newTimeTable2.alarmDate1){
            console.log("first date cancelled");
            cancelNotification(oldTimeTable.dayID);
        }
        if(oldTimeTable.alarmDate2 !== newTimeTable2.alarmDate2){
            console.log("second date cancelled");
            cancelNotification(oldTimeTable.dayID2);
        }

        if(oldTimeTable.text!==newTimeTable2.text || oldTimeTable.alarmDate1 !== newTimeTable2.alarmDate1 || oldTimeTable.alarmDate2 !== newTimeTable2.alarmDate2){
            this.setState((prevState)=>{
                return {
                    timeTables : [...prevState.timeTables.slice(0,index),newTimeTable2,...prevState.timeTables.slice(index+1)]
                }
            },()=>{
                store.delete('TIME_TABLES');
                store.save('TIME_TABLES',this.state.timeTables);
                if(oldTimeTable.alarmDate1 !== newTimeTable2.alarmDate1){
                    console.log("first date scheduled");
                    scheduleLocalNotification(newTimeTable2.text,newTimeTable2.alarmDate1,newTimeTable2.dayID,"week");
                }
                if(oldTimeTable.alarmDate2 !== newTimeTable2.alarmDate2){
                    console.log("second date scheduled");
                    scheduleLocalNotification(newTimeTable2.text,newTimeTable2.alarmDate2,newTimeTable2.dayID2,"week");
                }
                
                
            });
        }
        
        
    }
    openTimeTableTextModal(timeTable){
        this.setState({
            temporaryText: timeTable.text,
            temporaryDay: timeTable.dayName,
            modalVisible: true
        });
    }
    closeModal(){
        this.changeTime(
            this.state.temporaryDay,"text",this.state.temporaryText
        );
        this.setState({modalVisible:false})
    }
    render(){
        return (
            <View style={{flex:1}}>{
        this.state.timeTables.map((timeTable)=>{
            return (
            <View style={{flex:1,flexDirection:"row"}} key={timeTable.dayName}>
                <View style={{flex:1}}>
                    <Text>{timeTable.dayName}</Text>
                </View>
                <View style={{flex:2}}>
                    <DatePicker
                        style={{width: 100}}
                        date={timeTable.firstTime}
                        mode="time"
                        placeholder="Time1"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconComponent = {<View/>}

                        customStyles={{
                        dateInput: {
                            marginLeft: 20
                        }
                        // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.changeTime(timeTable.dayName,"firstTime",date);}}
                    />
                </View>

                <View style={{flex:2}}>
                    <DatePicker
                            style={{width: 100}}
                            date={timeTable.secondTime}
                            mode="time"
                            placeholder="Time2"
                            confirmBtnText="Confirm"
                            iconComponent = {<View/>}
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 20
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.changeTime(timeTable.dayName,"secondTime",date);}}
                        />  

                </View>

                <View style={{flex:1}}>
                    <Button
                        onPress={()=>this.openTimeTableTextModal(timeTable)}
                        title="Edit"
                        color="#841584"
                    />
                </View>
            </View>
            );
        })
        
        }
        
        
        <Modal
              visible={this.state.modalVisible}
              animationType={'slide'}
              onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.innerContainer}>
              <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(temporaryText) => this.setState({temporaryText})}
                value={this.state.temporaryText}
                />
                <Button
                    onPress={() => this.closeModal()}
                    title="Close modal"
                >
                </Button>
              </View>
            </View>
          </Modal>
        </View>);
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
      backgroundColor: 'grey',
    },
    innerContainer: {
      alignItems: 'center',
    },
  });