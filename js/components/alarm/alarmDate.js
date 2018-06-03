import React,{PureComponent} from "react";
import {
    View,Button,StyleSheet,TouchableOpacity
} from "react-native";
import appVars from "../../appVars";
import appStyles from '../../appStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

                        date={alarmValue.alarmTime}
                        mode="time"
                        placeholder=""
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconComponent = {<View/>}
                        customStyles={{
                        dateInput: appStyles.alarmTime
                            
                        // ... You can check the source to find the other keys.
                        }}

                        onDateChange={(time) => {console.log("time check",time);this.props.changeAlarm(alarmValue.alarmID,{time});}}
                    />
                </View>
                <View style={styles.buttonContainer}>


                <TouchableOpacity onPress={()=>this.props.openTimeTableTextModal(alarmValue)} >
                <MaterialCommunityIcons name="pencil" style={{color: appVars.colorMain,fontSize:24,marginRight:10}} />
                </TouchableOpacity>

                <TouchableOpacity onPress = {()=>this.props.deleteAlarm(alarmValue.alarmID)}  >
                <MaterialCommunityIcons name="delete" style={{color: appVars.colorMain,fontSize:24,marginRight:8}} />
                </TouchableOpacity>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {flex:1,flexDirection:"row",justifyContent:"space-between",marginBottom:10, alignItems: 'center',},
    buttonContainer: {backgroundColor:"white",flexDirection:"row",justifyContent:"space-between"}
  });
