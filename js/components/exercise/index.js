import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, Alert,StyleSheet, Dimensions, Platform,Text,Image,ScrollView,TouchableOpacity} from "react-native";
import appVars from '../../appVars';
import VideoPlayer from 'react-native-video-player';
import ImageViewer from "../imageviewer";
import Gallery from "../imageviewer/Gallery";
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
  }

  render() {
    return (
        
        this.props.exercise?
        <View style={{flex:1, backgroundColor: "red" }} >
            
            <View style={{flex:4,justifyContent:"flex-start",alignItems:"center",backgroundColor:"pink",height:200}}>
            {
                this.props.exercise.video?
                    <VideoPlayer video={{uri: this.props.exercise.video}} style={{width:sliderWidth,height:slideHeight*1.7}}/>:
                    
                    this.props.exercise.pictures ?<View style={{flex:1}}>
                {<Gallery
                style={{flex: 1, backgroundColor: 'white'}}
                key={this.props.exercise.text}
                images={this.props.exercise.pictures.map((temp)=>{return {source:{uri:appVars.serverUrl+'/'+temp.sources[0].src}}})}
                initialPage = {0}
                
                />}
              </View>:null
                    /*<Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.props.exercise.images}
                        renderItem={this._renderItem}
                        sliderWidth={sliderWidth}
                        itemWidth={itemWidth}
                    />*/
            }
            </View>
            <View style={{flex:1,backgroundColor:"white"}}>
            <ScrollView>
                <Text>{this.props.exercise.text}</Text>
            </ScrollView></View>
        </View>:null
    );
  }
}
const styles=  StyleSheet.create({
    
    // image's border radius is buggy on iOS; let's hack it!   
    title: {
        color: "black",
        fontSize: 13,
        fontWeight: 'bold',
        letterSpacing: 0.5
    },
    titleEven: {
        color: 'white'
    },image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },imageContainer: {
        flex: 1,
        
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        //backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius

    },
});

