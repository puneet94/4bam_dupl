import React,{PureComponent} from "react";
import {
    View,Text
} from "react-native";
import DatePicker from "react-native-datepicker";




export default class TimeTable extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            timeTables: [{
                dayName: "MONDAY",
                dayID: "111111"
            },{
                dayName: "TUESDAY",
                dayID: "222222"
            },{
                dayName: "WEDNESDAY",
                dayID: "333333"
            },{
                dayName: "THURSDAY",
                dayID: "444444"
            },{
                dayName: "FRIDAY",
                dayID: "555555"
            },{
                dayName: "SATURDAY",
                dayID: "666666"
            },{
                dayName: "SUNDAY",
                dayID: "777777"
            }]
        }
    }
    changeTime(dayName,position,date){
        const index = this.state.timeTables.findIndex(timeTable => timeTable.dayName === dayName);
        const oldTimeTable = this.state.timeTables[index];
        const newTimeTable = {...oldTimeTable,[position]:date};
        this.setState((prevState)=>{
            return {
                timeTables : [...prevState.timeTables.slice(0,index),newTimeTable,...prevState.timeTables.slice(index+1)]
            }
        })

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
                        customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
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
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => {this.changeTime(timeTable.dayName,"secondTime",date);}}
                        />  

                </View>
            </View>
            );
        })
        }</View>);
    }
}