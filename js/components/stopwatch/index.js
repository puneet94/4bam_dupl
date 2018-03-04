import React, { PureComponent } from 'react';
import { StyleSheet,Text,View, TouchableHighlight, Alert } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
 import appVars from "../../appVars";

export default class StopWatch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
    };
  }
 
  toggleTimer=()=> {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }
 
  resetTimer = () =>{
    this.setState({timerStart: false, timerReset: true});
  }
 
  toggleStopwatch=() =>{
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false},
    ()=>{
      if(!this.state.stopwatchStart){
        
        this.props.onTimerFinish && this.props.onTimerFinish(this.currentTime);
      }
      
    });
  }
 
  resetStopwatch=() =>{
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime=(time) =>{
      this.currentTime = time;
  }

  handleFinish=()=>{
    Alert.alert("finished");
  }
 

  
  render() {
    return (
      <View>
        <Stopwatch  msecs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} 
          handleFinish = {this.handleFinish}/>
        <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:10}}> 
          <TouchableHighlight onPress={this.toggleStopwatch} style={{backgroundColor:"green",padding:10,width:90,borderRadius:5}}>
            <Text style={{fontSize: 24,color:"white",textAlign:"center"}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={this.resetStopwatch} style={{backgroundColor:"yellow",padding:10,width:90,borderRadius:5}}>
            <Text style={{fontSize: 24,color:"black",textAlign:"center"}}>Reset</Text>
          </TouchableHighlight>
        </View>
        
      </View>
    );
  }
}
 
const handleTimerComplete = () => alert("custom completion function");
 
const options = {
  container: {
    backgroundColor: appVars.colorMain,
    padding: 5,
    borderRadius: 5,
    width: 200,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};