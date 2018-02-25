import React, { PureComponent } from 'react';
import {Text,View,Button} from "react-native";
import store from "react-native-simple-store";
import TimerCountdown from 'react-native-timer-countdown';

export default class Training extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            timeTable: {},
            localNotification: false,
            timerCountdown: false
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
                    this.setState({timeTable,localNotification});
                }
            }
        }        
    }
    renderCountDown(){
        return (
            <TimerCountdown
                initialSecondsRemaining={120000}
                onTimeElapsed={() => this.toggleCountDown(false)}
                allowFontScaling={true}
                style={{ fontSize: 20 }}
                interval={100}
            />
        );
    }
    toggleCountDown(timerCountdown){
        this.setState({
            timerCountdown
        });
    }

    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                {
                    this.state.localNotification?
                    <View>
                        <Text>{this.state.timeTable.text}</Text>    
                        {!this.state.timerCountdown && <Button style={{width:100}}
                            onPress={()=>this.toggleCountDown(true)}
                            title="Start Count Down"
                            color="#09437f"
                        />}
                        {this.state.timerCountdown && this.renderCountDown()}
                    </View>:
                    <View>
                        <Text>{"Training Screen"}</Text>
                        {!this.state.timerCountdown && <Button style={{width:100}}
                            onPress={()=>this.toggleCountDown(true)}
                            title="Start Count Down"
                            color="#09437f"
                        />}
                        {this.state.timerCountdown && this.renderCountDown()}
                    </View>
                }
            </View>
        )
    }
}