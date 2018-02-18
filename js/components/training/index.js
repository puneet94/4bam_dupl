import React, { Component } from 'react';
import {Text,View} from "react-native"
import store from "react-native-simple-store"
export default class Training extends Component{
    constructor(props){
        super(props);
        this.state = {
            timeTable: {},
            localNotification: false
        }
    }
    componentWillMount = async ()=>{
        const {localNotification,dayName} = this.props.navigation.state.params;
        if(localNotification){
            let timeTables = await store.get("TIME_TABLES");
            if(timeTables){
                const timeTable = timeTables.find(timeTable => timeTable.dayName === dayName);
                this.setState({timeTable,localNotification});
            }
        }
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                {
                    this.state.localNotification?
                    <View>
                        <Text>{this.state.timeTable.text}</Text>    
                    </View>:
                    <View>
                        <Text>{"Training Screen"}</Text>
                    </View>
                }
                
            </View>
        )
    }
}