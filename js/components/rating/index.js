import React,{PureComponent} from 'react';
import {Text,View,Button,Alert,Slider,TouchableOpacity} from "react-native";
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
    this.props.onRating({stars: this.state.starCount,slider1:this.state.userDidWorkout,slider2:this.state.userTriedWorkout});
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
                                    
      <Text>Wie viele Sterne gibst du dem Wochenplan?</Text>

        <StarRating
          disabled={false}
          maxStars={6}
          rating={this.state.starCount}
          fullStarColor={appVars.colorMain}
          selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
</View>

<View style={appStyles.contentElement}>


      <Text>Wie häufig wolltest du in dieser Woche trainieren?</Text>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <Slider style={appStyles.ratingSlider} value={this.state.userDidWorkout} minimumValue={0} maximumValue={14} onValueChange={(itemValue, itemIndex) => {this.setState({userDidWorkout: Math.round(itemValue)});}}/>
      <Text>{this.state.userDidWorkout}</Text>
      </View>

</View>

<View style={appStyles.contentElement}>

      <Text>Wie häufig hast du es wirklich geschafft?</Text>
      <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <Slider style={appStyles.ratingSlider} value={this.state.userTriedWorkout} minimumValue={0} maximumValue={14} onValueChange={(itemValue, itemIndex) => {this.setState({userTriedWorkout: Math.round(itemValue)});}}/>
      

      <Text>{this.state.userTriedWorkout}</Text>
      </View>
</View>

<View style={appStyles.contentElement}>


  <Button
  onPress={this.onSubmitRating}
  disabled={!(this.state.starCount>=0 && this.state.userDidWorkout>=0 && this.state.userTriedWorkout>=0)}
  title="Submit"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
</View>
</View>
    );
  }
}

