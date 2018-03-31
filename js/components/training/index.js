import React, { PureComponent } from 'react';
import {Text,View,Button,StyleSheet} from "react-native";
import store from "react-native-simple-store";
import StopWatch from '../stopwatch';
export default class Training extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            alarmValue: {},
            localNotification: false,
        }
    }

    componentWillMount = async ()=>{
        if(this.props.navigation.state.params){
            const localNotification = this.props.navigation.state.params.localNotification;
            const alarmID = this.props.navigation.state.params.alarmID;
            
            if(localNotification){
                let ALARM_TIMES = await store.get("ALARM_TIMES");
                if(ALARM_TIMES){
                    const alarmValue = ALARM_TIMES[alarmID];
                    
                    this.setState({alarmValue,localNotification});
                }
            }
        }        
    }

    onTimerFinish=()=>{        
        const { navigation } = this.props;
        navigation.navigate('TrainingFinish',{alarmID:navigation.state.params.alarmID});
    }
    
    render=()=>{
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                {
                    this.state.localNotification?
                    <View>
                        <Text style={styles.trainingMessage}>{this.state.alarmValue.alarmText}</Text>    
                        <StopWatch onTimerFinish={this.onTimerFinish}/>
                    </View>:
                    <View>
                        <Text style={styles.trainingMessage}>{"Training Screen"}</Text>
                        <StopWatch />
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    trainingMessage: {
        textAlign: "center",
        color: "black",
        fontSize: 22
    }
  });