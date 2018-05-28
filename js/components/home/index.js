import React, { Component } from 'react';
import {StyleSheet,Text,View,ScrollView,Button,Dimensions,BackHandler,Platform,Alert,TouchableOpacity, PixelRatio} from "react-native";
import store from "react-native-simple-store";
import appVars from "../../appVars";
import appStyles from "../../appStyles";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';import Toast, {DURATION} from 'react-native-easy-toast'
import {getNextAlarm} from "../../services/dateService";
import HTMLView from 'react-native-htmlview';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.backButtonListener = null;
        this.days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'So', 'So'];
        this.exitApp = 0;
        this.state = {
            position: 'bottom',
            dayMessages: [],
            weekPlan: {}
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          headerRight: <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
          <TouchableOpacity onPress={() => params.handleLogout()}>
              <MaterialCommunityIcons name="power-settings" style={{color: appVars.colorMain,fontSize:24,marginRight:10}} />
              </TouchableOpacity>
        </View>
        };
      };       

    onClick=(text, position, duration,withStyle)=>{
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
        if(Platform.OS === 'android') {
            this.backButtonListener = BackHandler.addEventListener('hardwareBackPress', this.backHandlerListener);
        }
    }

    componentWillMount = async()=>{
        this._mounted = true;
        this.fetchWeekView();
        this.fetchDayMessage();
        /*let ALARM_TIMES = await store.get("ALARM_TIMES");
                let ALARM_DAYS = await store.get("ALARM_DAYS");
                if(ALARM_DAYS && ALARM_TIMES){
                    const {alarmTime,dayName}=getNextAlarm(ALARM_DAYS,ALARM_TIMES);
                }*/
        let firstName = await store.get("FIRSTNAME");
        this._mounted && this.setState({
            firstName
        });
               
        this.attachBackHandler();

        this.props.navigation.setParams({ 
            handleLogout: this.logOut
        });    

    }

    componentWillUnmount = ()=>{
        this._mounted = false;
        if(Platform.OS === 'android' && this.backButtonListener) {
            this.backButtonListener.remove();
        }
    }

    logOut = ()=>{

        Alert.alert(
            'Abmelden?',
            'Möchtest Du dich wirklich abmelden?',
            [
              {text: 'Abbrechen', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Abmelden', onPress: () => this.performLogout()},
            ],
            { cancelable: false }
          )
    }

    start(){
        const { navigation } = this.props;
        navigation.navigate('Training');
    }

    performLogout = ()=> {
        store.save("LOGGED_IN",false);
            store.delete(appVars.STORAGE_KEY)
            const { navigation } = this.props;
            navigation.navigate('Login');
    }

    async fetchDayMessage(){
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/motd.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        if(json.response && json.response.length) {
            this._mounted && this.setState({dayMessages:json.response});
        }
        
    }

    
    async fetchWeekView() {
        let userStoredID  = await store.get(appVars.STORAGE_KEY);
        let apiHitPoint = appVars.apiUrl+"/weekview.html?authtoken="+appVars.apiKey+"&userid="+userStoredID;
        const response = await fetch(apiHitPoint);
        const json = await response.json();
        this._mounted && this.setState({weekPlan: json.response});
        
    }

    day(name) {
        
        return  this.days[name];
        
    }

    renderWeekPlan = ()=>{
        
        if(Object.keys(this.state.weekPlan).length){
            const weekDays = Object.keys(this.state.weekPlan).sort();
            return weekDays.map((weekDay)=>{
                
                const dayPlans = this.state.weekPlan[weekDay].blocks;

                return <View style={{flex: 1, flexDirection: 'row'}} key={weekDay}>
                        
                            <View style={{width: 40, height: 30, backgroundColor: appVars.colorSeperatorColor, alignItems:'center', justifyContent:'center', borderRadius:10,}}>
                            <Text style={{
                            fontSize: 14,
                            textAlign:'center',
                            fontFamily: appVars.fontMain,
                            color: appVars.colorBlack,
                            }}>{this.day(weekDay-1)}
                            </Text>

                            </View>

                       
                            <View style={{width: 30, height: '100%', backgroundColor: appVars.colorWhite, alignItems:'center', marginTop: 6}}>
                                <View style={{width: 15, height: 15, backgroundColor: appVars.colorMain, borderRadius:10, alignItems:'center', justifyContent:'center'}}>
                                <View style={{width: 7, height: 7, backgroundColor: appVars.colorWhite, borderRadius:10}} />
                            </View>

                            <View style={{width: 2, backgroundColor: appVars.colorMain,height: '100%'}} />
                        
                        </View>
                    
                        <View style={{width: 300}}>
                        

        
                   { dayPlans.map((dayPlan,index)=>{
                return <View key={dayPlan.id}>
                        
                        <Text style={{fontFamily: appVars.fontText,
                        color: appVars.colorBlack,
                        marginTop: 4,
                        fontFamily: appVars.fontText,
                        fontSize: 14,
                        color: appVars.colorBlack,
                        }}>{dayPlan.title}</Text>
                        
                    </View>
                        })
                    }
                    <View style={{backgroundColor: appVars.colorSeperatorColor, height:1, width: 300, marginTop:10,marginBottom:10}} />
               </View>
               </View>

            });
        }
    }
    render(){
        return (
            <View style={{flex:1, backgroundColor: appVars.colorWhite}}>
                
                
                <View style={{height:150, marginBottom: 5}}>
                
                

                
                    {
                        this.state.dayMessages.map((dayMessage)=>{    
                         

                        return <ScrollView key={dayMessage.id}>
                                
                                <Text style={{fontFamily: appVars.fontMain,  color: appVars.colorBlack, fontSize: 16, marginLeft: 15, marginRight: 15, }}>{dayMessage.title}</Text>
                                <HTMLView
                                    addLineBreaks={false}
                                    stylesheet={htmlStyles}
                                    style={{marginLeft: 15, marginRight: 15, }}
                                    value={dayMessage.text}
                                />
                            </ScrollView>
                        }
                        
                        )
                    }
                    
                </View>
                
                <View style={appStyles.contentSeperator} />

                <ScrollView style={{padding:10}}>
                        {
                            this.renderWeekPlan()
                        }
                </ScrollView>
                
                <View style={appStyles.contentSeperator} />

                <View style={{marginLeft: 15, marginTop:10, marginBottom: 10, marginRight: 15}}>
                        <Button
                        onPress={this.start.bind(this)}
                        title="JETZT TRAINIEREN"
                        color={appVars.colorMain}
                        />
                </View>

                <Toast ref="toast" position={this.state.position}/>
            </View>
        )
    }
}

const htmlStyles=  StyleSheet.create({
    
    //HTML things
    p: {
        fontFamily: appVars.fontText,
        color: appVars.colorBlack,
        fontSize: 12,
        marginBottom: 5,
    },
    strong: {
        fontFamily: appVars.fontMain,
        color: appVars.colorBlack,
        fontSize: 12,
    },
    h3: {
        fontSize: 14,
        fontFamily: appVars.fontMain,
        color: appVars.colorMain,
        marginBottom: 3,
    },
    li: {
        fontSize: 12,
        fontFamily: appVars.fontText,
        color: appVars.colorMain,
        marginBottom: 3,
    }

    

});