import React, { PureComponent } from 'react';
import {Text,Alert,View,Button,StyleSheet,TouchableHighlight} from "react-native";
import store from "react-native-simple-store";
import StopWatch from '../stopwatch/timer';
import Exercise from "../exercise";
import appVars from "../../appVars";
import {getExercises} from "../../services/storeService";
export default class Training extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            alarmValue: {},
            localNotification: false,stopwatchStart: false,
            stopwatchReset: false,
            currentExercise: 0,
            exercises: getExercises()
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        
        return {
          headerRight: <View>
          
          <StopWatch  start={params.stopwatchStart}
          reset={params.stopwatchReset}
          
          getTime={params.getFormattedTime} 
         
          options={options}/>
        </View>
        };
      };
      selectNextExercise = ()=>{
          if((this.state.currentExercise+1)==this.state.exercises.length){
            this.onTimerFinish();
          }else{
              Alert.alert("TIME",this.currentTime);
              this.setState({
                  currentExercise: this.state.currentExercise+1
              });
              this.resetStopwatch();
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

  toggleStopwatch=() =>{
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  }
 
  resetStopwatch=() =>{
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime=(time) =>{
      this.currentTime = time;
  }
    componentDidMount =  ()=>{
        this.props.navigation.setParams({ 
            stopwatchStart:this.state.stopwatchStart,
            stopwatchReset:this.state.stopwatchReset,
            getFormattedTime:this.getFormattedTime
        });
      }
      componentDidUpdate = (prevProps,prevState)=>{
        if(prevState.stopwatchStart!==this.state.stopwatchStart || prevState.stopwatchReset !==this.state.stopwatchReset){        
            this.props.navigation.setParams({ 
                stopwatchStart:this.state.stopwatchStart,
                stopwatchReset:this.state.stopwatchReset,
                getFormattedTime:this.getFormattedTime
            });
        }
      }
    render=()=>{
        
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                {
                    <View>
                        {this.state.localNotification?<Text style={styles.trainingMessage}>{this.state.alarmValue.alarmText}</Text>:<Text style={styles.trainingMessage}>{"Training Screen"}</Text>}
                        <Exercise exercise = {this.state.exercises[this.state.currentExercise]}/>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}> 
                        <TouchableHighlight onPress={this.toggleStopwatch} style={{backgroundColor:"green",padding:10,width:90,borderRadius:5}}>
                            <Text style={{fontSize: 24,color:"white",textAlign:"center"}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.selectNextExercise} style={{backgroundColor:"yellow",padding:10,width:90,borderRadius:5}}>
                            <Text style={{fontSize: 24,color:"black",textAlign:"center"}}>Next</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this.resetStopwatch} style={{backgroundColor:"yellow",padding:10,width:90,borderRadius:5}}>
                            <Text style={{fontSize: 24,color:"black",textAlign:"center"}}>Reset</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                    
                }
            </View>
        )
    }
}

const options = {
    container: {
      backgroundColor: appVars.colorMain,
      padding: 5,
      borderRadius: 5,
      width: 70,
    },
    text: {
      fontSize: 18,
      color: '#FFF'
    }
  };

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