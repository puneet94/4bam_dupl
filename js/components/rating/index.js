import React,{PureComponent} from 'react';
import {Text,View,Button,Alert,Slider,TouchableOpacity,TouchableHighlight,Picker} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appVars from "../../appVars";
import appStyles from "../../appStyles";
import StarRating from 'react-native-star-rating';

export default  class Rating extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      starCountTwo: 0,
      starCountThree: 0,
      regel: 0,
      empfohlen: 0,
    };
  }

  onSubmitRating = ()=>{
    this.props.onRating(
      {
        stars: this.state.starCount,
        gesundheit: this.state.starCountTwo,
        energie: this.state.starCountThree,
        regel: this.state.regel,
        empfohlen: this.state.empfohlen,
        }
      );
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
    
  }

  onStarRatingPressTwo(rating) {
    this.setState({
      starCountTwo: rating
    });
    
  }

  onStarRatingPressThree(rating) {
    this.setState({
      starCountThree: rating
    });
    
  }

  render() {
    return (
      <View>
      <View style={appStyles.contentElement}>
      <Text style={appStyles.ratingHeadline}>Wie viele Sterne gibst Du ...</Text>                             
      <Text style={appStyles.ratingSubheadline}>dem Wochenplan?</Text>

        <StarRating
          disabled={false}
          maxStars={6}
          starSize={28}
          rating={this.state.starCount}
          fullStarColor={appVars.colorMain}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
  </View>

<View style={appStyles.contentElement}>


      <Text style={appStyles.ratingSubheadline}>deinem allgemeinen Gesundheitszustand?</Text>
      
      <StarRating
          disabled={false}
          maxStars={6}
          starSize={28}
          rating={this.state.starCountTwo}
          fullStarColor={appVars.colorMain}
          selectedStar={(rating) => this.onStarRatingPressTwo(rating)}
      />

</View>

<View style={appStyles.contentElement}>

      <Text style={appStyles.ratingSubheadline}>deinem Energieniveau?</Text>
      
      <StarRating
          disabled={false}
          maxStars={6}
          starSize={28}
          rating={this.state.starCountThree}
          fullStarColor={appVars.colorMain}
          selectedStar={(rating) => this.onStarRatingPressThree(rating)}
      />

</View> 
<View style={appStyles.contentSeperator} />

<View style={appStyles.contentElement}>
<Text style={appStyles.ratingHeadline}>Machst du die Übungen regelmäßig?</Text>                             


<Picker
  selectedValue={this.state.regel}
  style={{width: appVars.screenX-20,}}
  onValueChange={(itemValue, itemIndex) => this.setState({regel: itemValue})}>
  <Picker.Item label="immer" value="1" />
  <Picker.Item label="meistens" value="2" />
  <Picker.Item label="ab und zu" value="3" />
  <Picker.Item label="nie" value="4" />
</Picker>

</View>

<View style={appStyles.contentElement}>
<Text style={appStyles.ratingHeadline}>Hast Du die 4BAM-App weiterempfohlen?</Text>                             


<Picker
  selectedValue={this.state.empfohlen}
  style={{width: appVars.screenX-20,}}
  onValueChange={(itemValue, itemIndex) => this.setState({empfohlen: itemValue})}>
  <Picker.Item label="ja" value="1" />
  <Picker.Item label="nein" value="2" />
  <Picker.Item label="erst in dieser Woche" value="3" />

</Picker>


</View>





<View style={appStyles.contentSeperator} />

<View style={{marginBottom:5, paddingTop: 5}}>
    {(this.state.starCount>=1 && this.state.starCountTwo>=1 && this.state.starCountThree>=1 && this.state.regel>=1 && this.state.empfohlen>=1)?


<TouchableHighlight onPress={this.onSubmitRating} style={{backgroundColor:appVars.colorMain, padding:10, marginRight: 10,marginLeft: 10, height:35, borderRadius:5}} >
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

