import StarRating from 'react-native-star-rating';
import React,{PureComponent} from 'react';
import {View, StyleSheet, Dimensions, Platform,Text,Image} from "react-native";
import VideoPlayer from 'react-native-video-player';
import Carousel from 'react-native-snap-carousel';

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
      entries: []
    };
  }
  componentDidMount = ()=>{
      setTimeout(()=>{
        this.setState({
            entries:[
                {
                    title: 'Beautiful and dramatic Antelope Canyon',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/UYiroysl.jpg'
                },
                {
                    title: 'Earlier this morning, NYC',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
                },
                {
                    title: 'White Pocket Sunset',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
                    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
                },
                {
                    title: 'Acrocorinth, Greece',
                    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
                    illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
                },
                {
                    title: 'The lone tree, majestic landscape of New Zealand',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
                },
                {
                    title: 'Middle Earth, Germany',
                    subtitle: 'Lorem ipsum dolor sit amet',
                    illustration: 'https://i.imgur.com/lceHsT6l.jpg'
                }
            ]    
        })
      },3000)
  }

  _renderItem ({item, index}) {
    return (
        <View style={{flex:1}}>
            <View style={styles.imageContainer}>
            <Image source={{uri:item}} style={styles.image}/></View>
        </View>
    );
}
  render() {
      console.log("got exercie",this.props.exercise);
    return (
        this.props.exercise?
        <View style={{flex:1, backgroundColor: "white",     borderTopColor: "blue", borderTopWidth: 1 }} >
        <Text>{this.props.exercise.text}</Text>
        {!this.props.exercise.containsImage?<VideoPlayer
                         video={{uri: "http://62.113.221.2/einbeckermorgenpost-live/_definst_/mp4:livestream/playlist.m3u8"}}
                     />:
                     <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.props.exercise.images}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
            />}
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
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
});

