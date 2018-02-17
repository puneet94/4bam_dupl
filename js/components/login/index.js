import React,{PureComponent} from "react";
import {
    View,Text,Button
} from "react-native";

import store from "react-native-simple-store"

export default class LoginScreen extends PureComponent{
    static navigationOptions = {
        header: null  
    };
    constructor(props){
        super(props);
        this.state = {
            loggedIn: false
        }
    }
    componentWillMount = async()=>{
        let loggedIn = await store.get("LOGGED_IN");
        if(loggedIn){
            this.setState({loggedIn: true});
            const { navigation } = this.props;
            navigation.navigate('Menu');
        }
    }
    logIn = ()=>{
        store.save("LOGGED_IN",true);
        this.setState({loggedIn: true});
        const { navigation } = this.props;
        navigation.navigate('Menu');
    }
    render = ()=>{
        return (<View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            {this.state.loggedIn?
            <View><Text>{"Loading..."}</Text></View>
            :
            <View>
            <Button
            onPress={()=>this.logIn()}
            title="Log IN"
            color="#841584"
                />
                </View>}
        </View>);
        
    }
}