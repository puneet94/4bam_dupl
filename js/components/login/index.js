import React,{PureComponent} from "react";
import {
	Text,
	View,
	ScrollView,
    TextInput,
    Button, Alert, Image,          
	ActivityIndicator,
		Linking,
		Dimensions
} from "react-native";
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import store from "react-native-simple-store";
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
				navigation.navigate('Menu');
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
        })
        let apiHitPoint = appVars.apiUrl+"/user.html?authtoken="+appVars.apiKey+"&username="+this.state.email+"&password="+this.state.pass;
        
        try{
            const response = await fetch(apiHitPoint);
            const json = await response.json();
            if(json["@status"] === "OK"){
                
				await this.storeToken(json["response"].id);
				this.logIn();
			}
			
            else{
                this.setState({
                    loading: false,
                })
                Alert.alert(appVars.textErrorLogin);
               // console.log("incorrect login");
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
				<ActivityIndicator animating={true} size={'large'}/>
			  </View>
			)
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
		<View style={appStyles.contenContainer}>
		  <ScrollView ref='_scrollView'>
			<View  style={{alignItems:"center"}}>
				<Image style={{'width': Dimensions.get('window').width-20, 'height': 300, }}
                  resizeMode='contain' source={require('../../../assets/images/app_logo.png')} />
		  	</View>
			<View style={appStyles.contentElement}>
		  		<Text style={appStyles.settingsColStart}>{appVars.labelEmail.toUpperCase()}</Text>
					<TextInput returnKeyType={"next"} onSubmitEditing={this.onSubmitEditing} style={appStyles.formInput} keyboardType={'email-address'} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.emailChange}/>
				
		  	</View>
			<View style={appStyles.contentElement}>
				<Text style={appStyles.settingsColStart}>{appVars.labelPassword.toUpperCase()} </Text>
				<TextInput returnKeyType={"next"} ref='SecondInput' style={appStyles.formInput} secureTextEntry={true} autoCapitalize={'none'} autoCorrect={false} onChangeText={this.passChange}/>
			</View>
  
			<View style={appStyles.contentElement}>
				<Button color={appVars.colorMain} style={appStyles.submit} title={appVars.labelLoginButton} onPress={this.onSubmit} />
			</View>
		  </ScrollView>
		</View>
	  )
	}
}