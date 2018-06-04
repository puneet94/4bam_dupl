import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, Alert,StyleSheet, Dimensions, Platform,Text,Image,ScrollView,TouchableOpacity,ActivityIndicator} from "react-native";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import VideoPlayer from 'react-native-video-player';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import FastImage from 'react-native-fast-image'
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
        userInactive: false
    }
    
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

// Scrolling Animation
  renderGalleryImages = ()=>{
      
    const { navigation } = this.props;
    return this.props.exercise.picture.map((temp,index)=>{
        
        return (

            <View style={{flex:1}} key={"page"+index}>
            <TouchableOpacity style={{flex:1}} key={temp.sources[0].src} onPress={()=>{navigation.navigate('ExerciseGallery',{images:this.props.exercise.picture,initialPage:index})}}>        
            
            <FastImage
            
                key={this.props.exercise.picture.id} 
                style={styles.child}
                source={{
                uri: ''+appVars.serverUrl+'/'+temp.sources[0].src+'',
                priority: FastImage.priority.normal,
                }}
                resizeMode={"contain"}
            />
        </TouchableOpacity></View>)
    })
  }

  renderGalleryDots = ()=>{
          let dotsArray = [];
          for(let i = 0; i<this.props.exercise.picture.length;i++){
              dotsArray.push(<View key={i} style={i==this.state.page?styles.selectedCircle:styles.circle}>
     
              </View>)
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
    
    return (
        <View style={{flex:1,margin:10,marginBottom:0,}}>

                    <View style={{height: appVars.screenX-40}}>
                {
                
                    this.renderScroll()
                }

                                         <View style={{alignItems:"center",justifyContent:"center",flexDirection:"row"}}>

{this.renderGalleryDots()}

</View>                
                    </View>               

                    <ScrollView>
                    
                    <Text style={appStyles.a}>{this.props.exercise.block}</Text>
         
                        <HTMLView
                        addLineBreaks={true}
                        value={this.props.exercise.text}
                        stylesheet={appStyles}
                        onLinkPress={(url) => console.log('clicked link: ', url)}
                        />

                    
                    <View style={{flexDirection:"row"}} >
                        
                        <Text style={appStyles.a}>Intensität:</Text>
                        <View style={{width:appVars.screenX-100}}>
                        <Text style={appStyles.p}>{this.props.exercise.intent}</Text>
                        </View>
                    </View>

                    </ScrollView>







        </View> 
                   
        
    
    )
  }
}
const styles=  StyleSheet.create({
 
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
            backgroundColor: appVars.colorMain,
            margin: 5
        },

});
