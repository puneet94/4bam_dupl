import React,{PureComponent} from "react";
import {
	Text,
	View,
	ScrollView,
    TextInput,
    Button, Alert, Image,          
		ActivityIndicator,
		Linking,
		Dimensions,
		ImageBackground,
		StyleSheet,
		Modal,
		TouchableHighlight
} from "react-native";
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import store from "react-native-simple-store";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationActions} from "react-navigation";



export default class LoginScreen extends PureComponent{
	static navigationOptions = {
		header: null  
	};
	constructor(props){
		super(props);
		this.state={
            email: '',
            pass: '',
            loading: false,
						loggedIn: false,
        }
	}
	componentWillMount = async()=>{
		try {
			const token = await store.get(appVars.STORAGE_KEY)
			if (token !== null) {
			  this.setState({
				  loggedIn: true,
			  });
				const { navigation } = this.props;
				navigation.navigate('Home');
			}
		  } catch (e) {
			console.log(e);
		  }


	}
	
	logOut = ()=>{
		this.setState({
			loggedIn: false,
			loading: false,
		})
        store.delete(appVars.STORAGE_KEY)
        
    }
	storeToken = async (name) => {
        try {
          await store.save(appVars.STORAGE_KEY, name)
          this.setState({
              loggedIn: true,
              loading: false,
          })
        } catch (e) {
          console.log(e)
        }
			}
	

    onSubmit=async  ()=>{
        	//Alert.alert("email: "+ this.state.email + "pass: " + this.state.pass);
        this.setState({
            loading: true,
				});
				
				const payload = {
					username: this.state.email,
					password: this.state.pass,
				}

				var data = new FormData();
				data.append( "formData",  JSON.stringify(payload));
			
        try{
					const response = await fetch(appVars.apiUrl+"/user.html?authtoken="+appVars.apiKey, {
						method: 'POST',
						body: data
					});

						const json = await response.json();

            if(json["@status"] === "OK"){
							await this.storeToken(json["response"].id);
							store.save("FIRSTNAME",json["response"].firstname);
							store.save("GROUPS",json["response"].group);
							store.save("GROUPTITLE",json["response"].groupname);
							store.save("GROUPLOGO",json["response"].picture.img.src);
							this.logIn();
						}
			
            else{
                this.setState({
										loading: false,
								})
								
								Alert.alert(appVars.textErrorLogin);
            }

        }
        catch(e){
            console.log(e);
            this.setState({
								loading: false,
            })
						Alert.alert(appVars.textErrorLogin);
        }

	};
	
	logIn = ()=>{
		const resetAction = NavigationActions.reset({
			index: 0,
			actions: [
			  NavigationActions.navigate({
				routeName: "Menu",
			  })
			]
		  });
		  this.props.navigation.dispatch(resetAction);
		/*const { navigation } = this.props;
		navigation.navigate('Menu');*/
	}
	onSubmitEditing = ()=>{
		this.refs.SecondInput.focus();
	}

	onForgot=  ()=>{
		Linking.canOpenURL(appVars.forgotpasswordurl).then(supported => {
			  if (supported) {
				Linking.openURL(appVars.forgotpasswordurl);
			  } else {
				console.log("Don't know how to open URI: " + appVars.forgotpasswordurl);
			  }
		  });
	};
	emailChange = (value)=> this.setState({email: value});
	passChange = (value)=> this.setState({pass: value});
	render= ()=> {	
		if(this.state.loading)
		{
			return(
			<View style={appStyles.ActivityIndicatorFullscreenContainer}>
						<Image source={require ('../../../assets/images/app_bg_login.png')} style={styles.fakebackground} />
				<ActivityIndicator animating={true} size={'large'}/>
			</View>)
		}
		if(this.state.loggedIn){
			return(
				<View style={appStyles.contenContainer}>
				  <View style={appStyles.contentElement}>
					  
					  <Text style={appStyles.contentText}>{"You are already logged in"}</Text>
				  </View>
				  <View style={appStyles.contentSeperator} />
				  
				  <View style={appStyles.contentElement}>
					  <Button color={appVars.colorMain} style={appStyles.submit} title={appVars.labelLogoutButton} onPress={this.logOut} />
				  </View>
				  <View style={appStyles.contentElement}>
					  <Button color={appVars.colorMain} style={appStyles.submit} title={"Home"} onPress={this.logIn} />
				  </View>
  
				</View>
			);
		}
	  return (
			<View style={styles.mainContainer}>
			<Image source={require ('../../../assets/images/app_bg_login.png')} style={styles.fakebackground} />


          
                <View style={styles.content}>
 
                    <View style={styles.loginbox}>

										<Image style={{'width': Dimensions.get('window').width-80, 'height': 100, }} resizeMode='contain' source={require('../../../assets/images/app_logo.png')} />
										


												<View>
												

												<TextInput placeholder={'Benutzername'} returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'email-address'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.emailChange}/>
                        </View>

                        <View>
												<TextInput placeholder={'Passwort'} returnKeyType={"next"} ref='SecondInput' style={appStyles.formInput} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.passChange}/>
                        </View>

												
					

												<View style={{paddingTop: 10}}>


<TouchableHighlight onPress={this.onSubmit} style={{backgroundColor:appVars.colorMain,padding:10,height:35, borderRadius:5}}>
		<View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
				<MaterialCommunityIcons name="login-variant" style={{fontSize:18,color: "white",marginRight: 5}}/>
				<Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>{appVars.labelLoginButton.toUpperCase()}</Text>
		</View>
</TouchableHighlight>
</View> 

											

                    </View>
								</View>
						</View>
	  )
	}
}


const styles = StyleSheet.create({

mainContainer:{
	flex:1,
	backgroundColor: appVars.colorWhite,
},

fakebackground: {
	position: 'absolute',
	left: 0,
	top: 0,
	width: appVars.screenX,
	height: appVars.screenX,
},

content:{
		flex:1,
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'center',
},
  loginbox:{
		backgroundColor:appVars.colorWhite,
		width:appVars.screenX-40,
		paddingTop:10,
		paddingBottom:20,
		paddingLeft:20,
		paddingRight:20, 
		borderRadius:20
}
});