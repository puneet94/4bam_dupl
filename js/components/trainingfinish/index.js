import React, { PureComponent } from 'react';
import {Text,View,Button,Alert} from "react-native";
import store from "react-native-simple-store";
import Rating from "../rating";
import {getNextAlarm} from "../../services/dateService";
export default class TrainingFinish extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            timeTable: {},
        }
    }
    onRating=(rating)=>{
        Alert.alert(`Thanks for the ${rating} rating`);
    }
    componentWillMount = async ()=>{
        if(this.props.navigation.state.params){
            const localNotification = this.props.navigation.state.params.localNotification;
            const actualID = this.props.navigation.state.params.actualID;
                let timeTables = await store.get("TIME_TABLES");
                const {date,day}=getNextAlarm(actualID,timeTables);
                this.setState({date:date.split(" ")[1],day});             
        }        
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
                <Text>{"Next alarm at"}</Text>
                <Text>{this.state.date}</Text>
                <Text>{this.state.day}</Text>
                <Rating onRating={this.onRating}/>
            </View>
        );
    }
}