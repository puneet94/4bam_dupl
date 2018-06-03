"use strict"
import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator,Button
} from 'react-native'

import appStyles from '../../appStyles';
import appVars from '../../appVars';

import Gallery from "../imageviewer/Gallery";

class ImageViewerScreen extends Component {
  
  constructor (props) {
    super(props);
    const navParams = this.props.navigation.state.params;
    
    if(navParams.images) {
      let images = navParams.images.map((temp)=>{
        return {source:{uri:appVars.serverUrl+'/'+temp.sources[0].src}}
        });

        
        this.state = {
            index: 0,
            page: 0,
            initialPage: navParams.initialPage,
            images
        };

    } 
      

  }
 
      render=()=> {
        if(this.state.images){
            return (
                <View style={appStyles.contenContainer}>
                <Button onPress={()=>{this.ref.scrollToIndex({index:2});}} title="hello"></Button>
                  <Gallery
                  style={{flex: 1, backgroundColor: 'white'}}
                  images={this.state.images}
                  initialPage = {this.state.initialPage}
                />
                </View>
            )
        }else{
            return null
        }
          
    }
  }

export default ImageViewerScreen;
