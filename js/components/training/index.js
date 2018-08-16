import React, { PureComponent,Component } from 'react';
import {Text,Alert,View,Button,StyleSheet,TouchableHighlight,ActivityIndicator,Image} from "react-native";
import store from "react-native-simple-store";
import StopWatch from '../stopwatch/timer';
import Exercise from "../exercise";
import appVars from "../../appVars";
import appStyles from '../../appStyles';
import Entypo from "react-native-vector-icons/Entypo";
import Octicons from "react-native-vector-icons/Octicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
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
            exerciseLoading: true,
            exercises: this.fetchExercises(),
            totalDuration: 0,
            randomImage: 0,
            isAllowToWatchVideo: props.navigation.state.params.isAllowToWatchVideo
        }
        
    }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight: <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
              <Entypo name="stopwatch" style={{color:"black",fontSize:18,marginRight:5}}/>
          <StopWatch start={params.stopwatchStart}
          reset={params.stopwatchReset}
          
          getTime={params.getFormattedTime} 
         
          options={options}/>
        </View>
        };
        };



      selectNextExercise = ()=>{
        
        let exerciseTime = parseInt(this.currentTime.split(":")[0],10)*60 +  parseInt(this.currentTime.split(":")[1],10);
        
        //Store only when user opens pending exercise. 
        store.save("PENDING_EXERCISE",{
            previousExerciseTime : moment().format('DD-MM-YYYY'),
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
            this.resetStopwatch("nextExercise");
          }
          
      }
    componentWillMount = async ()=>{
        console.log("moment time check",moment().format('DD-MM-YYYY'));
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

                store.save("PENDING_EXERCISE",{
                    currentExercise:0,
                    totalDuration:0,
                    previousExerciseTime : moment().format('DD-MM-YYYY'),
                });
            }
            else if(exerciseRestart){
                
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
 
  resetStopwatch=(nextExercise) =>{
      if(nextExercise){
        this.setState({
            stopwatchStart: false, 
            stopwatchReset: true})
      }else{
        Alert.alert("Traing Abbrechen","Wenn Sie das Training abbrechen, müssen Sie wieder neu anfangen.",[
        
            {text: 'Weitermachen', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {
                text: 'Training abbrechen', 
                onPress: () => {
                    store.delete("PENDING_EXERCISE");
                    this.setState({
                        stopwatchStart: false, 
                        stopwatchReset: true,
                        currentExercise: 0,
                        totalDuration: 0,
                    })
                }
            }
          ],
          { cancelable: false });
      }
      
  }
  withoutVideo = (exercise)=>{
    const { video, ...withoutVideoObject } = exercise;
    return withoutVideoObject;
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
      logout = ()=>{
		
        store.delete(appVars.STORAGE_KEY);
        const { navigation } = this.props;
        navigation.navigate('Login');
	}
      async fetchExercises() {
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/exercise.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        console.log("exercise response",json.response);
        if(json["@status"]=="OK"){
            if(this.state.isAllowToWatchVideo){
                let userNotWantsVideo = await store.get(appVars.NO_VIDEOS);
                if(!userNotWantsVideo){
                    console.log("user can and wants to watch");
                    this.setState({exercises: json.response,exerciseLoading:false});
                }else{
                    console.log("user can and doesnt want to watch");
                    this.setState({exercises: json.response.map(this.withoutVideo),exerciseLoading:false});
                }
            }else{
                console.log("user cant");
                this.setState({exercises: json.response.map(this.withoutVideo),exerciseLoading:false});
            }
            
        }else{
            
            this.logout();
        }
        
      }

    render=()=>{
        if(this.state.exerciseLoading){
            return(

                <View style={{flex:1,justifyContent:"center",backgroundColor:appVars.colorWhite}}>
                    <ActivityIndicator size="large" color={appVars.colorMain} />
                </View>
            )
        }else{

            if(this.state.exercises.length > 1) {

                return (
                    <View style={{flex:1, backgroundColor:'white'}}>
                   
                        <Exercise {...this.props} exercise = {this.state.exercises[this.state.currentExercise]}/>
                        <View style={appStyles.contentSeperator} />
                        <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:5, paddingTop: 5}}>
                            <TouchableHighlight onPress={this.toggleStopwatch} style={{backgroundColor:appVars.colorMain,marginLeft: 15,padding:10,width:92, borderRadius:5}}>
                                <View style={{flex:1,flexDirection:"row", alignItems: "center"}}>
                                    <Entypo name="stopwatch" style={{color:"white",fontSize:18,marginRight:5}}/>
                                    <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>{!this.state.stopwatchStart ? "START" : "PAUSE"}</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight disabled={!this.state.stopwatchStart } onPress={this.selectNextExercise} style={{backgroundColor:appVars.colorLightGray,padding:10,width:140,borderRadius:5}}>
                                <View style={{flex:1,flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                                    <View style={{flex:7,flexDirection:"row",alignItems:"center"}}>
                                        <Octicons name="arrow-right" style={{fontSize:18,color:appVars.colorMain}}/>
                                        <Text style={{fontSize: 16,fontFamily: appVars.fontMain, textAlign:"center",color:(!this.state.stopwatchStart?"white":appVars.colorMain)}}>WEITER</Text>
                                    </View>
                                    <View style={{flex:3,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                                        <Text>{"("+this.state.exercises[this.state.currentExercise].index}</Text>
                                        <Text>{"/"}</Text>
                                        <Text>{this.state.exercises.length+")"}</Text>
                                    </View>
                                </View>

                            </TouchableHighlight>
                            <TouchableHighlight onPress={()=>this.resetStopwatch()} style={{backgroundColor:appVars.colorLightGray,padding:10,width:90,marginRight: 15, height:35, borderRadius:5}}>
                                <View style={{flex:1,flexDirection:"row",alignItems: "center"}}>
                                    <MaterialIcons name="replay" style={{fontSize:18}}/>
                                    <Text style={{fontSize: 16,color:"black", fontFamily: appVars.fontMain}}>RESET</Text>
                                </View>
                            </TouchableHighlight>
            </View>     

                        
                
            </View>
        )
        } else {
            var randomImages = [
                require('../../../assets/images/familie.png'),
                require('../../../assets/images/lesen.png'),
                require('../../../assets/images/sport.png'),
            ];
            return <View style={{flex:1, backgroundColor:"white",alignItems:"center",justifyContent:"center",}}>
           
                <Text style={appStyles.contentHeadline}>Heute kein Training!</Text>
                <Text style={appStyles.h3}>Genieße den Tag – genieße dein Leben.</Text>
                <Image source={randomImages[Math.floor(Math.random()*randomImages.length)]} style={{width: appVars.screenX, height: appVars.screenX}}/>
                </View>   
        }

    }
    
    

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