import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, PixelRatio,Alert,StyleSheet, Dimensions, Platform,Text,Image,ScrollView,TouchableOpacity,ActivityIndicator} from "react-native";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import VideoPlayer from 'react-native-video-player';
import Video from 'react-native-video';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import TestGallery from "../testGallery";

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');


export default  class Exercise extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        galleryPageSelected: 0,
        currentPosition: 0,
        Page: this.props.exercise.count,
        pageNum: 0,
        page: 0,
        userInactive: false,
        opacity: 0
    }
    
  }

    onLoadStart = () => {
    this.setState({opacity: 1});
    }

    onLoad = () => {
    this.setState({opacity: 0});
    }

    onBuffer = ({isBuffering}) => {
        this.setState({opacity: isBuffering ? 1 : 0});
    }

  startScrolling = ()=>{
      if((this.state.pageNum<this.props.exercise.picture.length) && this._mounted){
        this.scrolling();
        setTimeout(this.startScrolling,5000);
      }
      
  }
  onPageChange = (page)=>{
    this.setState({
      page
    })
}
  componentWillMount = ()=>{
      console.log("mounted exercise");
      this._mounted = true;
  }
    componentDidMount = ()=>{
        
        //setTimeout(this.startScrolling,8000);
    }

    componentWillUnmount(){
        this._mounted = false;
        
    }

    densi = ()=> {
        if (appVars.screenX > 768) {
            return 3
          } else if (appVars.screenX > 414) {
            return 2
          } else if (appVars.screenX > 375) {
            return 1
          } else if (appVars.screenX > 320) {
            return 0
          }
        else {
            return 3
        }
    }
// Scrolling Animation
  renderGalleryImages = ()=>{

    const { navigation } = this.props;
    return this.props.exercise.picture.map((temp,index)=>{
        
        return (

            <View style={{flex:1}} key={"page"+index}>
            <TouchableOpacity style={{flex:1}} key={temp.sources[0].src} onPress={()=>{navigation.navigate('ExerciseGallery',{images:this.props.exercise.picture,initialPage:index})}}>        
            <Image
            
                key={this.props.exercise.picture.id} 
                style={styles.child}
                source={{
                uri: ''+appVars.serverUrl+'/'+temp.sources[this.densi()].src+'',
                }}
                resizeMode={"contain"}
            />
        </TouchableOpacity></View>)
    })
  }

  renderGalleryDots = ()=>{
          let dotsArray = [];
          for(let i = 0; i<this.props.exercise.picture.length;i++){
              if(this.props.exercise.picture.length >1) {
              dotsArray.push(<View key={i} style={i==this.state.page?styles.selectedCircle:styles.circle} />)
            }
          }
          return dotsArray;
      }
      
  renderScroll =()=> {
    return(
        <View style={{flex:1}}>
        
          {this.props.exercise.picture?<TestGallery style={{flex:1}} 
          exercise = {this.props.exercise}
            images={this.props.exercise.picture?this.props.exercise.picture:[]}
            onPageChange = {this.onPageChange}
            >
            {this.renderGalleryImages()}
          </TestGallery>:null}
          
       
        </View>
        )
  }


  render() {
    
    if(this.props.exercise.video) {

    return (
        <View style={{flex:1}}>
                    <View style={{height: appVars.screenX,marginBottom:10,}}>

<Video 
    source={{ isNetwork: true, uri: this.props.exercise.video }}   // Can be a URL or a local file.
       ref={(ref) => {
         this.player = ref
       }}             
                                // Store reference
       onBuffer={this.onBuffer}                // Callback when remote video is buffering
       onEnd={this.onEnd}                      // Callback when playback finishes
       onError={this.videoError}               // Callback when video cannot be loaded
       onLoadStart={this.onLoadStart}
       onLoad={this.onLoad}
       style={styles.backgroundVideo}
       resizeMode="cover"
       repeat={true}
       />
       
                    
                   

                    <View style={{position: 'absolute', padding: 5,width: appVars.screenX,alignItems:"center",justifyContent:"center"}}>
                        <Text style={appStyles.blockText}>{this.props.exercise.block.toUpperCase()}</Text>
                    </View>

                        <ActivityIndicator
                        animating
                        size="large"
                        color={appVars.colorMain}
                        style={[styles.activityIndicator, {opacity: this.state.opacity}]}
                        />

                    </View>               

                    <ScrollView style={{paddingLeft: 15,paddingRight: 15}}>           
                        <HTMLView
                        addLineBreaks={true}
                        value={this.props.exercise.text}
                        stylesheet={appStyles}
                        onLinkPress={(url) => console.log('clicked link: ', url)}
                        />

                        {this.props.exercise.intent != 0 &&
                            <View style={{flexDirection:"row"}} >
                            <Text style={appStyles.a}>Intensität:</Text>
                            <View style={{width:appVars.screenX}}>
                                <Text style={appStyles.p}>{this.props.exercise.intent}</Text>
                            </View>
                        </View>
                          }             

                    </ScrollView>
        </View> 
                   
        
    
    )
  }
  else {
    return (
        <View style={{flex:1}}>
                    <View style={{padding: 5,width: appVars.screenX,alignItems:"center",justifyContent:"center"}}>
                    <Text style={appStyles.blockText}>{this.props.exercise.block.toUpperCase()}</Text>
                    </View>

                    
                    <View style={{height: appVars.screenX}}>
                        {
                        
                            this.renderScroll()
                        }


                        <View style={{position: "absolute", bottom:5, width: appVars.screenX}}>
                        
                            <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                                    {this.renderGalleryDots()}
                                </View>
                        </View>

                    </View>               

                    <ScrollView style={{paddingLeft: 15,paddingRight: 15}}>           
                        <HTMLView
                        addLineBreaks={true}
                        value={this.props.exercise.text}
                        stylesheet={appStyles}
                        onLinkPress={(url) => console.log('clicked link: ', url)}
                        />

                        {this.props.exercise.intent != 0 &&
                            <View style={{flexDirection:"row"}} >
                            <Text style={appStyles.a}>Intensität:</Text>
                            <View style={{width:appVars.screenX}}>
                                <Text style={appStyles.p}>{this.props.exercise.intent}</Text>
                            </View>
                        </View>
                          }             

                    </ScrollView>
        </View> 
                   
        
    
    )

    }

}  
}



const styles=  StyleSheet.create({
    backgroundVideo: {
        width: appVars.screenX,
        height: appVars.screenX,
      },
        child: {
          height: appVars.screenX-50,
          width: appVars.screenX-50,
          alignItems:"center",
          justifyContent:"center"
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
            backgroundColor: appVars.colorActive,
            margin: 5
        },
        activityIndicator: {
            position: 'absolute',
            height: appVars.screenX,
            width: appVars.screenX,
            justifyContent: 'center',
            alignItems: 'center',
        },
        seekBar:{
            color: 'blue',

        },

});

