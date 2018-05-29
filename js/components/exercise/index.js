import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, Alert,StyleSheet, Dimensions, Platform,Text,Image,ScrollView,TouchableOpacity,ActivityIndicator} from "react-native";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import VideoPlayer from 'react-native-video-player';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image'

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default  class Exercise extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        galleryPageSelected: 0,
        currentPosition: 0,
        Page: this.props.exercise.count,
        pageNum: 0
    }
    this.scrolling = this.scrolling.bind(this);
  }
  startScrolling = ()=>{
      if((this.state.pageNum<this.props.exercise.picture.length) && this._mounted){
        this.scrolling();
        setTimeout(this.startScrolling,5000);
      }
      
  }
  componentWillMount = ()=>{
      this._mounted = true;
  }
    componentDidMount = ()=>{
        
        setTimeout(this.startScrolling,8000);
    }

    componentWillUnmount(){
        this._mounted = false;
    }

timerstart() {
    this.activeInterval = setInterval(this.scrolling, 4000);
}
timeclear() {
    clearInterval(this.activeInterval);
}
// Scrolling Animation
scrolling() {
    const { navigation } = this.props;
    let screenX = Math.round(appVars.screenX);

    // Start scrolling if there's more than one item to display
    if (this.props.exercise.picture.length > 1 && this._mounted) {
        // Increment position with each new interval
        position = this.state.currentPosition + screenX;
        this.ticker.scrollTo({ x: position, animated: true });
        
        // After position passes this value, snaps back to beginning
        this.setState({currentPosition: position});
        maxOffset = screenX*(this.props.exercise.picture.length-1);

        this.setState({galleryPageSelected: this.state.galleryPageSelected + 1});

        // Set animation back to first image
        if (position > maxOffset) {
             this.ticker.scrollTo({ x: 0, animated: true })
             this.setState({ currentPosition: 0,pageNum: 0});
        }
        else {
            this.setState({ currentPosition: position,pageNum:position/screenX });
        }

    }
}

  renderGalleryImages = ()=>{
    const { navigation } = this.props;
    return this.props.exercise.picture.map((temp,index)=>{
        return (
            <TouchableOpacity style={{flex:1}} key={index} onPress={()=>{navigation.navigate('ExerciseGallery',{images:this.props.exercise.picture,initialPage:index})}}>        
            <FastImage
                key={this.props.exercise.picture.id} 
                style={styles.child}
                source={{
                uri: ''+appVars.serverUrl+'/'+temp.sources[0].src+'',
                priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
        </TouchableOpacity>)
    })
  }

  renderGalleryDots = ()=>{
          let dotsArray = [];
          for(let i = 0; i<this.props.exercise.picture.length;i++){
              dotsArray.push(<View key={i} style={i==this.state.pageNum?styles.selectedCircle:styles.circle}>
     
              </View>)
          }
          return dotsArray;
      }
      
  renderScroll =()=> {
    return(
        <View>
        <View style={styles.contentElement}>
          <ScrollView
            ref={(ref) => this.ticker = ref}
            style={styles.scrollview}
            horizontal={true}
            pagingEnabled={true}
            decelerationRate={0}
            //snapToInterval={appVars.screenX-80}
            snapToAlignment={"center"}
            showsHorizontalScrollIndicator={false}
            
            
            >
                    {this.renderGalleryImages()}

          </ScrollView>
        </View>
       
        </View>
        )
  }


  render() {
    
    return (
        
                <View>
                    <View style={{flex:0, height: appVars.screenX}}>   
                {
                this.props.exercise.video?<VideoPlayer video={{uri: this.props.exercise.video}} style={{width:sliderWidth,height:slideHeight*1.7}}/>:
                
                    this.renderScroll()
                }
                 
                    </View>
                    <View style={{alignItems:"center",justifyContent:"center"}}>
                        <View style={{flexDirection:"row"}}>{this.renderGalleryDots()}</View>
                        
                    </View>

                    <View style={appStyles.contentElement}>
                    <Text style={appStyles.a}>{this.props.exercise.block}</Text>
                    <ScrollView style={{flex:0, height: appVars.screenY-appVars.screenX-240}}>
                        <HTMLView
                        addLineBreaks={false}
                        value={this.props.exercise.text}
                        stylesheet={appStyles}
                        onLinkPress={(url) => console.log('clicked link: ', url)}
                        />
                    </ScrollView>
                    <View style={{flexDirection:"row"}} >
                        <Text style={appStyles.a}>Intensität:</Text>
                        <Text style={appStyles.p}>{this.props.exercise.intent}</Text>
                    </View>

                    </View>
                    
                </View>
        
    
    )
  }
}
const styles=  StyleSheet.create({
 
        child: {
          height: appVars.screenX,
          width: appVars.screenX,
          justifyContent: 'center'
        },

        circle: {
                    width: 10,
                    height: 10,
                    borderRadius: 10/2,
                    backgroundColor: appVars.colorLightGray,
                    margin: 5
                },
        selectedCircle:{
            width: 10,
            height: 10,
            borderRadius: 10/2,
            backgroundColor: appVars.colorMain,
            margin: 5
        },

});

