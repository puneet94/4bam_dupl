"use strict"
import React, { Component } from 'react';
import {Text,View,Button,Alert} from "react-native";
import store from "react-native-simple-store";

export default class AccountScreen extends Component {
    constructor(props){
        super(props);
        
    }
    render(){
        return (
            <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>

            <Text>Account-Page</Text>

            </View>
        );
    }
}