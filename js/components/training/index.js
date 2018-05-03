import React, { PureComponent,Component } from 'react';
import {Text,Alert,View,Button,StyleSheet,TouchableHighlight} from "react-native";
import store from "react-native-simple-store";
import StopWatch from '../stopwatch/timer';
import Exercise from "../exercise";
import appVars from "../../appVars";
import appStyles from '../../appStyles';
import {getExercises} from "../../services/storeService";
export default class Training extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            alarmValue: {},
            localNotification: false,
            exerciseRestart:false,
            stopwatchStart: false,
            stopwatchReset: false,
            currentExercise: 0,
            exercises: getExercises(),
            totalDuration: 0
        }
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight: <View>
          <StopWatch start={params.stopwatchStart}
          reset={params.stopwatchReset}
          
          getTime={params.getFormattedTime} 
         
          options={options}/>
        </View>
        };
      };
      selectNextExercise = ()=>{
        let exerciseTime = parseInt(this.currentTime.split(":")[0],10)*60 +  parseInt(this.currentTime.split(":")[1],10);
        
        //Store only when user opens pending exercise. Using localNotification-true from DraweContainer
        (this.state.localNotification || this.state.exerciseRestart) && store.save("PENDING_EXERCISE",{
            totalDuration: this.state.totalDuration+exerciseTime,
            currentExercise: this.state.currentExercise+1
        });

        // If this exercise is the last. Then navigate to next page. There we use totalDuration to display.
        // Else start next exercise, adding duration and increment current exercise number
        
        if((this.state.currentExercise+1)==this.state.exercises.length){
            store.delete("PENDING_EXERCISE");
            this.onTimerFinish(this.state.totalDuration+exerciseTime);
        }else{
            this.setState({
                currentExercise: this.state.currentExercise+1,
                totalDuration: this.state.totalDuration + exerciseTime
            });
            this.resetStopwatch();
          }
      }
    componentWillMount = async ()=>{
        if(this.props.navigation.state.params){
            const localNotification = this.props.navigation.state.params.localNotification;
            const exerciseRestart = this.props.navigation.state.params.exerciseRestart;
            const alarmID = this.props.navigation.state.params.alarmID;
            if(localNotification){
                let ALARM_TIMES = await store.get("ALARM_TIMES");
                if(ALARM_TIMES){
                    const alarmValue = ALARM_TIMES[alarmID];
                    
                    this.setState({alarmValue,localNotification});
                }

                store.save("PENDING_EXERCISE",{currentExercise:0,totalDuration:0});
            }
            if(exerciseRestart){
                const pendingExercise = await store.get("PENDING_EXERCISE");
                if(pendingExercise){
                    this.setState({
                        currentExercise: pendingExercise.currentExercise,
                        totalDuration: pendingExercise.totalDuration,
                        exerciseRestart: true
                    });
                }
            }
        }        
    }

    onTimerFinish=(totalDuration)=>{        
        const { navigation } = this.props;
        navigation.navigate('TrainingFinish',{totalDuration});
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
            <View style={{flex:1,backgroundColor:appVars.colorWhite}}>
                {
                    <View style={{flex:1}}>
                        {/*this.state.localNotification?<Text style={styles.trainingMessage}>{this.state.alarmValue.alarmText}</Text>:<Text style={styles.trainingMessage}>{"Training Screen"}</Text>*/}
                        <Exercise exercise = {this.state.exercises[this.state.currentExercise]}/>
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10,marginBottom:10, paddingTop: 10,
    borderColor: '#ddd',
    borderTopWidth: 1, }}> 
                            <TouchableHighlight onPress={this.toggleStopwatch} style={{backgroundColor:appVars.colorMain,marginLeft: 15,padding:10,width:90, borderRadius:5}}>
                                <Text style={{fontSize: 18,color:"white",textAlign:"center"}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.selectNextExercise} style={{backgroundColor:appVars.colorLightGray,padding:10,width:90,borderRadius:5}}>
                                <Text style={{fontSize: 18,color:"black",textAlign:"center"}}>Next</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={this.resetStopwatch} style={{backgroundColor:appVars.colorLightGray,padding:10,width:90,marginRight: 15, borderRadius:5}}>
                                <Text style={{fontSize: 18,color:"black",textAlign:"center"}}>Reset</Text>
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
    },
    text: {
      fontSize: 18,
      color: appVars.colorMain,
      textAlign: 'right',
      marginRight: 10,
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