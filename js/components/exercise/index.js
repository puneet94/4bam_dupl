import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, Alert,StyleSheet, Dimensions, Platform,Text,Image,ScrollView,TouchableOpacity,TouchableHighlight} from "react-native";
import appVars from '../../appVars';
import appStyles from '../../appStyles';
import VideoPlayer from 'react-native-video-player';
import ImageViewer from "../imageviewer";
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import SwiperFlatList from 'react-native-swiper-flatlist';
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;


const entryBorderRadius = 8;

export default  class Exercise extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
        galleryPageSelected: 0
    }
  }

  onPageSelected = (pageSelectedData)=>{
    //console.log("pagesleetceddata",pageSelectedData);
    this.setState({
        galleryPageSelected: pageSelectedData
    });
  }

  renderGalleryImages = ()=>{
    const { navigation } = this.props;

    return this.props.exercise.picture.map((temp,index)=>{
        return (
        <TouchableHighlight style={{flex:1}} key={index} onPress={()=>{navigation.navigate('ExerciseGallery',{images:this.props.exercise.picture,initialPage:index})}}>
        <Image key={this.props.exercise.picture.id} style={styles.child}
        key={temp.sources[0].src}
                source={{uri:appVars.serverUrl+'/'+temp.sources[0].src
            }}  
        />
        </TouchableHighlight>)
    })
  }


  render() {
    
    return (
        
                <View>
                    <View style={{flex:0, height: appVars.screenX}}>   
                {
                this.props.exercise.video?<VideoPlayer video={{uri: this.props.exercise.video}} style={{width:sliderWidth,height:slideHeight*1.7}}/>:
                this.props.exercise.picture.length >1 ?
                        
                        <SwiperFlatList
                        autoplay
                        autoplayLoop
                        showPagination
                        paginationColor={appVars.colorLightGray}
                        paginationActiveColor={appVars.colorMain}
                        >
                        {this.renderGalleryImages()}
                        </SwiperFlatList>
                        :<SwiperFlatList>
                        {this.renderGalleryImages()}
                        </SwiperFlatList>

                }

                    </View>
                    <View style={appStyles.contentElement}>
                    <Text style={appStyles.a}>{this.props.exercise.block}</Text>
                    <ScrollView style={{flex:0, height: appVars.screenY-appVars.screenX-210}}>
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

});

