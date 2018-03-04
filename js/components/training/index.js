import React, { PureComponent } from 'react';
import {Text,View,Button,StyleSheet} from "react-native";
import store from "react-native-simple-store";
import StopWatch from '../stopwatch';
export default class Training extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            timeTable: {},
            localNotification: false,
        }
    }

    componentWillMount = async ()=>{
        if(this.props.navigation.state.params){
            const localNotification = this.props.navigation.state.params.localNotification;
            const dayName = this.props.navigation.state.params.dayName;
            if(localNotification){
                let timeTables = await store.get("TIME_TABLES");
                if(timeTables){
                    const timeTable = timeTables.find(timeTable => timeTable.dayName === dayName);
                    this.setState({timeTable,localNotification,timeTables});
                }
            }
        }        
    }

    onTimerFinish=()=>{        
        const { navigation } = this.props;
        navigation.navigate('TrainingFinish',{actualID:navigation.state.params.actualID});
    }
    
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                {
                    this.state.localNotification?
                    <View>
                        <Text style={styles.trainingMessage}>{this.state.timeTable.text}</Text>    
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