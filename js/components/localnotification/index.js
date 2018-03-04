import React,{PureComponent} from "react";
import {
    View,Text,Button,Picker
} from "react-native";

import store from "react-native-simple-store"
import {scheduleLocalNotification} from "../../services/localNotification";
import moment from "moment";
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
        const {localNotification,dayName,actualID} = this.props.navigation.state.params;
        if(localNotification){
            let timeTables = await store.get("TIME_TABLES");
            if(timeTables){
                const timeTable = timeTables.find(timeTable => timeTable.dayName === dayName);
                
                this.setState({timeTable,actualID});
                const { navigation } = this.props;
                //navigation.navigate('Menu');
            }
        }
    }
    redirectTraining(){
        const { navigation } = this.props;
        navigation.navigate('Training',{localNotification:true,dayName:this.state.timeTable.dayName,actualID:this.state.actualID});
    }
    snoozeAlarm(){
        let alarmDate = moment().add(this.state.snoozeTime,"minutes");
        let alarmID = alarmDate.valueOf();
        scheduleLocalNotification(this.state.timeTable.text,alarmDate,alarmID,null,{...this.state.timeTable,actualID:this.state.actualID});
        
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