"use strict"
import React, { Component } from 'react';
import {Text,View,Button,Alert,TextInput,Picker,TouchableHighlight,ActivityIndicator} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from "react-native-datepicker";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import store from "react-native-simple-store";

export default class AccountScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            data: [],
            error: null,
            genderChange:null,
        }
        
    }


    componentDidMount = async ()=>{
        this.fetchdata();
     }
   
   
   fetchdata = async () => {
     const navParams = this.props.navigation.state.params;
     let userid = await store.get(appVars.STORAGE_KEY);
     const api = `${appVars.apiUrl}/user.html?authtoken=${appVars.apiKey}&userid=${userid}`;
     
     this.setState({ loading: true});
   
       fetch(api)
         .then(res => res.json())
         .then(res => {
           this.setState({
             data: res.response || [],
             error: res.error || null,
             loading : false,
             refreshing: false,
           })
         })
         .catch(error => {
           this.setState({ error, loading: false });
         })
   };

    render(){
        if(this.state.loading){
            return(
                <View style={{flex:1,justifyContent:"center",backgroundColor:appVars.colorWhite}}>
                    <ActivityIndicator size="large" color={appVars.colorMain} />
                </View>
            )
          }  else{
        return (
            	<View style={appStyles.container}>
                
                <View style={appStyles.contentElement}>
                    <TextInput defaultValue={this.state.data.titel} placeholder={'Titel'} returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'default'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.titelChange}/>
                </View>

                <View style={appStyles.contentElement}>
                    <TextInput defaultValue={this.state.data.firstname} placeholder={'Vorname'} returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'default'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.firstnameChange}/>
                </View>

                <View style={appStyles.contentElement}>
                    <TextInput defaultValue={this.state.data.lastname} placeholder={'Nachname'} returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'default'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.lastnameChange}/>
                </View>

                <View style={appStyles.contentElement}>
                    <TextInput defaultValue={this.state.data.email} placeholder={'E-Mail-Adressse'} returnKeyType={"next"} editable={false} />
                </View>
                <View style={appStyles.contentElement}>
                <DatePicker
                        style={{width: 300}}
                        
                        mode="date"
                        placeholder="Geburtsdatum"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        iconComponent = {<View/>}

                        customStyles={{
                        dateInput: {
                          
                        }
                        // ... You can check the source to find the other keys.
                        }}
            
                    />
                </View>
                <View style={appStyles.contentElement}>
                <Picker
                selectedValue={this.state.data.gender}
                style={{ height: 50, width: 200 }}
                >
                    <Picker.Item label="Unsicher" value="unsicher" />
                    <Picker.Item label="Männlich" value="male" />
                    <Picker.Item label="Weiblich" value="female" />
                    </Picker>
                </View>
                        
<View style={appStyles.contentSeperator} />

                <View style={appStyles.contentElement}>
                <TouchableHighlight style={{backgroundColor:appVars.colorMain,padding:10,height:35, borderRadius:5}}>
                        <View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
                                <MaterialCommunityIcons name="transfer" style={{fontSize:18,color: "white",marginRight: 5}}/>
                                <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>{appVars.labelAccountUpdateButton.toUpperCase()}</Text>
                        </View>
                </TouchableHighlight>

                </View>

            </View>
        );
        }
    }
}