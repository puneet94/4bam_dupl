import React,{PureComponent} from "react";
import {
    View,Button,StyleSheet
} from "react-native";
import DatePicker from "react-native-datepicker";
import moment from "moment";
export default class AlarmDate extends PureComponent{
    constructor(props){
        super(props);
    }
    
    render=()=>{
        
        const alarmValue  = this.props.alarmValue;
        
        return (
            <View  style={styles.container}>
                <View>
                    <DatePicker
                        style={{width: 100}}
                        date={alarmValue.alarmTime}
                        mode="time"
                        placeholder="Time"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconComponent = {<View/>}
                        customStyles={{
                        dateInput: {
                            marginLeft: 10
                        }
                        // ... You can check the source to find the other keys.
                        }}

                        onDateChange={(time) => {console.log("time check",time);this.props.changeAlarm(alarmValue.alarmID,{time});}}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button 
                        title="Delete" 
                        onPress = {()=>this.props.deleteAlarm(alarmValue.alarmID)}/>
                    <Button
                        onPress={()=>this.props.openTimeTableTextModal(alarmValue)}
                        title="Edit"
                        color="#09437f"
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex:1,flexDirection:"row",justifyContent:"space-between",marginVertical:10},
    buttonContainer: {backgroundColor:"yellow",flexDirection:"row",justifyContent:"space-between"}
  });
