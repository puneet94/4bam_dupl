import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, Alert,StyleSheet, Dimensions, Platform,Text,Image,ScrollView,TouchableOpacity} from "react-native";
import appVars from '../../appVars';
import VideoPlayer from 'react-native-video-player';
import ImageViewer from "../imageviewer";
import Gallery from "../imageviewer/Gallery";
import HTMLView from 'react-native-htmlview';

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
        <View style={{flex:1, backgroundColor: "white" }} >
            
            <View style={{flex:4,justifyContent:"flex-start",alignItems:"center",backgroundColor:"white",height:200}}>
            {
                this.props.exercise.video?
                    <VideoPlayer video={{uri: this.props.exercise.video}} style={{width:sliderWidth,height:slideHeight*1.7}}/>:
                    
                    this.props.exercise.picture ?<View style={{flex:1}}>
                {<Gallery
                style={{flex: 1, backgroundColor: 'white'}}
                key={this.props.exercise.text}
                images={this.props.exercise.picture.map((temp)=>{return {source:{uri:appVars.serverUrl+'/'+temp.sources[0].src}}})}
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
            <View style={{flex:1,backgroundColor:"white", paddingLeft: 15, paddingRight: 15}}>
            <ScrollView>
                <HTMLView
                    addLineBreaks={false}
                    value={this.props.exercise.text}
                    stylesheet={styles}
                    onLinkPress={(url) => console.log('clicked link: ', url)}
                />
            </ScrollView>
            </View>
            <View style={{flexDirection:"row", backgroundColor:"white", paddingLeft: 15, paddingRight: 15}} >
                <Text style={{fontFamily: appVars.fontMain, color: appVars.colorBlack, fontSize: 11, paddingRight:10 }}>Intensität:</Text>
                <Text style={{fontFamily: appVars.fontText, color: appVars.colorBlack, fontSize: 11}}>{this.props.exercise.intent}</Text>
            </View>
        </View>:null
    );
  }
}
const styles=  StyleSheet.create({
    
    //HTML things
    p: {
        fontFamily: appVars.fontText,
        color: appVars.colorBlack,
        fontSize: 12,
        marginBottom: 5,
    },
    strong: {
        fontFamily: appVars.fontMain,
        color: appVars.colorBlack,
        fontSize: 12,
    },
    h3: {
        fontSize: 14,
        fontFamily: appVars.fontMain,
        color: appVars.colorMain,
        marginBottom: 3,
    },
    li: {
        fontSize: 12,
        fontFamily: appVars.fontText,
        color: appVars.colorMain,
        marginBottom: 3,
    },

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

