import React, { PureComponent } from 'react';
import { StyleSheet,Text,View, TouchableHighlight, Alert } from 'react-native';
import Stopwatch from './timer';
 import appVars from "../../appVars";
 const OPTIONS = {
  'container':
        {
          'backgroundColor':"yellow",
          "width":120
        },
        text:{
          color: "black",
          fontSize: 24
        }
};
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
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
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
        <Stopwatch  start={this.props.stopwatchStart}
          reset={this.props.stopwatchReset}
          options={this.propsoptions}
          getTime={this.props.getFormattedTime} 
          
          />
        
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
    width: 70,
  },
  text: {
    fontSize: 18,
    color: '#FFF'
  }
};