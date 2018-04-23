"use strict"
import React, { Component } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  Alert
} from 'react-native'
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import Gallery from './Gallery';

class ImageViewerScreen extends Component {
  constructor (props) {
    super(props);
      this.state = {
        images: []
      };
    }
    componentDidMount = ()=>{
      this.setState ( {
        images: this.props.images.map((image)=>{return {source:{uri:image}}})
      });
    }
      render=()=> {
        
          return (
              this.state.images ?<View style={appStyles.contenContainer}>
              
                <Gallery
                style={{flex: 1, backgroundColor: 'black'}}
                images={this.state.images}
                initialPage = {0}
              />
              </View>:null
          )
    }
  }

export default ImageViewerScreen;