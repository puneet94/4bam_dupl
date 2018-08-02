import React,{PureComponent} from 'react';
import {Text,View,Button,Alert,Slider,TouchableOpacity,TouchableHighlight} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appVars from "../../appVars";
import appStyles from "../../appStyles";
import StarRating from 'react-native-star-rating';

export default  class Rating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onSubmitRating = ()=>{
    this.props.onRating(
      {
      stars: this.state.starCount,
      training:this.state.userDidWorkout,
      wantedtraing:this.state.userTriedWorkout}
      );
  }

  onSubmitRating = async()=>{
    
    var dataPost = new FormData();
    dataPost.append( "formDataInsert",  JSON.stringify(this.state.data));

    let userid = await store.get(appVars.STORAGE_KEY);
    
    const api = `${appVars.apiUrl}/rating.html?authtoken=${appVars.apiKey}&userid=${userid}`;
    const response = await fetch(api, {
        method: 'post',
        body: dataPost
    });
    const response2 = await response.json();
    console.log("rating",response2);
    if(response2["@status"]=="OK"){
        //this.navigateHomePage();
        Alert.alert("OK","Deine Daten wurden gespeichert.");
    }
}


  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
    
  }

  render() {
    return (
      <View>
      <View style={appStyles.contentElement}>
                                    
      <Text style={appStyles.h3}>Wie viele Sterne gibst du dem Wochenplan?</Text>

        <StarRating
          disabled={false}
          maxStars={6}
          rating={this.state.starCount}
          fullStarColor={appVars.colorMain}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
  </View>

<View style={appStyles.contentElement}>


      <Text style={appStyles.h3}>Wie häufig wolltest du in dieser Woche trainieren?</Text>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <Slider style={appStyles.ratingSlider} value={this.state.userDidWorkout} minimumValue={0} maximumValue={14} onValueChange={(itemValue, itemIndex) => {this.setState({userDidWorkout: Math.round(itemValue)});}}/>
      <Text style={{color: appVars.colorMain,fontFamily: appVars.fontMain, fontSize: 14,  textAlign: 'center',}}>{this.state.userDidWorkout||0}</Text>
      </View>

</View>

<View style={appStyles.contentElement}>

      <Text style={appStyles.h3}>Wie häufig hast du es wirklich geschafft?</Text>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <Slider style={appStyles.ratingSlider} value={this.state.userTriedWorkout} minimumValue={0} maximumValue={14} onValueChange={(itemValue, itemIndex) => {this.setState({userTriedWorkout: Math.round(itemValue)});}}/>
      

      <Text style={{color: appVars.colorMain,fontFamily: appVars.fontMain, fontSize: 14, textAlign: 'center',}}>{this.state.userTriedWorkout||0}</Text>
      </View>
</View> 

<View style={appStyles.contentElement}>




</View>
<View style={{marginBottom:5, paddingTop: 5}}>
    {(this.state.starCount>=0 && this.state.userDidWorkout>=0 && this.state.userTriedWorkout>=0)?


<TouchableHighlight disabled={!(this.state.starCount>=0 && this.state.userDidWorkout>=0 && this.state.userTriedWorkout>=0)}
 onPress={this.onSubmitRating} style={{backgroundColor:appVars.colorMain, padding:10, marginRight: 10,marginLeft: 10, height:35, borderRadius:5}} >
    <View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
        <MaterialCommunityIcons name="view-carousel" style={{fontSize:18,color: "white",marginRight: 5}}/>
        <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>ABSENDEN</Text>
    </View>
</TouchableHighlight>

:<TouchableHighlight style={{backgroundColor:appVars.colorLightGray, padding:10, marginRight: 10,marginLeft: 10, height:35, borderRadius:5}} >
   <View style={{flex:1,flexDirection:"row",alignItems: "center", justifyContent: "center"}}>
       <MaterialCommunityIcons name="view-carousel" style={{fontSize:18,color: "white",marginRight: 5}}/>
       <Text style={{fontSize: 16,color:"white", fontFamily: appVars.fontMain}}>ABSENDEN</Text>
   </View>
</TouchableHighlight>}
</View>


</View>

    );
  }
}

