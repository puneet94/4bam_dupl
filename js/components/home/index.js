import React, { Component } from 'react';
import {Text,View,Button} from "react-native";
import store from "react-native-simple-store";
export default class Home extends Component{
    logOut = ()=>{
        store.save("LOGGED_IN",false);
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
            </View>
        )
    }
}