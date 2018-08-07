"use strict"
import React, { Component } from 'react';
import {Text,View,Switch,Button,Alert,TextInput,Picker,TouchableHighlight,ActivityIndicator} from "react-native";
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
     let noVideos = await store.get(appVars.NO_VIDEOS);
     const api = `${appVars.apiUrl}/user.html?authtoken=${appVars.apiKey}&userid=${userid}`;
   
     
     this.setState({ loading: true});
   
       fetch(api)
         .then(res => res.json())
         .then(res => {
             console.log("user_data",res.response);
           this.setState({
             data: res.response || [],
             error: res.error || null,
             loading : false,
             refreshing: false,
             noVideos
           })
         })
         .catch(error => {
           this.setState({ error, loading: false });
         })
         
   };
   titelChange = (titel)=>{
        //console.log("titel value");
        
        this.setState({
            data: {...this.state.data,titel:titel}
        })
   }
    firstnameChange = (firstname)=>{
        
        this.setState({
            data: {...this.state.data,firstname:firstname}
        })
    }
    lastnameChange = (lastname)=>{
        this.setState({
            data: {...this.state.data,lastname:lastname}
        })
    }
    emailChange = (email)=>{
        this.setState({
            data: {...this.state.data,email:email}
        })
    }
    genderChange = (gender)=>{
        this.setState({
            data: {...this.state.data,gender:gender}
        })
    }
    dateOfBirthChange = (dateOfBirth)=>{
        this.setState({
            data: {...this.state.data,dateOfBirth:dateOfBirth}
        })
    }
   userAccountUpdate = async()=>{
    
        var dataUpdate = new FormData();
        dataUpdate.append( "formDataUpdate",  JSON.stringify(this.state.data));

        let userid = await store.get(appVars.STORAGE_KEY);
        
        const api = `${appVars.apiUrl}/user.html?authtoken=${appVars.apiKey}&userid=${userid}`;
        const response = await fetch(api, {
            method: 'post',
            body: dataUpdate
        });
        const response2 = await response.json();
        console.log("user_update",response2);
        if(response2["@status"]=="OK"){
            //this.navigateHomePage();
            Alert.alert("OK","Deine Daten wurden gespeichert.");
        }
    }
   
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
                <Text style={appStyles.settingsColStart}>Vorname:</Text>

                    <TextInput defaultValue={this.state.data.firstname} placeholder={'Vorname'} returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'default'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.firstnameChange}/>
                </View>

                <View style={appStyles.contentElement}>
                <Text style={appStyles.settingsColStart}>Nachname:</Text>

                    <TextInput defaultValue={this.state.data.lastname} placeholder={'Nachname'} returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'default'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.lastnameChange}/>
                </View>
                <View style={appStyles.contentElement}>
                <Text style={appStyles.settingsColStart}>E-Mail-Adresse:</Text>
                <TextInput defaultValue={this.state.data.email} placeholder={'E-Mail-Adressse'} returnKeyType={"next"} editable={false} />
                </View>
                
                <View style={appStyles.contentElement}>
                <Text style={appStyles.settingsColStart}>Geburtsdatum:</Text>

                <DatePicker
                        style={{width: appVars.screenX-20,}}

                        mode="date"
                        placeholder="Geburtsdatum"
                        confirmBtnText="OK"
                        cancelBtnText="Abbrechen"
                        iconComponent = {<View/>}
                        format="DD.MM.YYYY"
                        date={this.state.data.dateOfBirth}
                        onDateChange={this.dateOfBirthChange}
                        customStyles={{
                        dateInput: {
                          
                        }
                        // ... You can check the source to find the other keys.
                        }}
            
                    />
                </View>
                <View style={appStyles.contentElement}>
                <Text style={appStyles.settingsColStart}>Geschlecht:</Text>
                <Picker
                selectedValue={this.state.data.gender}
                onValueChange={(itemValue, itemIndex) => {this.genderChange(itemValue)}} 
                style={{ width: appVars.screenX-20 }}
                >
                    <Picker.Item label="Nicht definiert" value="" />
                    <Picker.Item label="Männlich" value="male" />
                    <Picker.Item label="Weiblich" value="female" />
                    </Picker>
                </View>
                        
<View style={appStyles.contentSeperator} />

                <View style={appStyles.contentElement}>
                <TouchableHighlight style={{backgroundColor:appVars.colorMain,padding:10,height:35, borderRadius:5}} onPress={()=>this.userAccountUpdate()}>
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