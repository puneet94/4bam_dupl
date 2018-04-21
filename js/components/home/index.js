import React, { Component } from 'react';
import {Text,View,Button,BackHandler} from "react-native";
import store from "react-native-simple-store";
import appVars from "../../appVars";
import Toast, {DURATION} from 'react-native-easy-toast'
import {getNextAlarm} from "../../services/dateService";
export default class Home extends Component{
    constructor(props){
        super(props);

        this.backButtonListener = null;
        this.exitApp = 0;
        this.state = {
            position: 'bottom',
        }
    }
    onClick(text, position, duration,withStyle) {
        this.setState({
            position: position,
        });
        if(withStyle){
            this.refs.toastWithStyle.show(text, duration);
        }else {
            this.refs.toast.show(text, duration);
        }
    }
    backHandlerListener = ()=>{
        // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
        // Typically you would use the navigator here to go to the last state.
        this.exitApp++;
        if(this.exitApp==1){
            this.onClick('Press again to exit', 'bottom', 1000);
        }
        else if(this.exitApp==2){
            BackHandler.exitApp();
        }
        setTimeout(() => {this.exitApp = 0}, 1000);
        return true;
    }
    attachBackHandler = ()=>{
        this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', this.backHandlerListener);
    }
    componentWillMount = async()=>{
        let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                
                const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                console.log("result",alarmTime,dayName);
        this.attachBackHandler();
    }
    componentWillUnmount = ()=>{
        this.backButtonListener.remove();
    }
    logOut = ()=>{
        store.save("LOGGED_IN",false);
        store.delete(appVars.STORAGE_KEY)
        const { navigation } = this.props;
        navigation.navigate('Login');
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>{"Home Screen"}</Text>
                <Button
            onPress={()=>this.logOut()}
            title="Log OUT"
            color="#09437f"
                />
                <Toast ref="toast" position={this.state.position}/>
            </View>
        )
    }
}