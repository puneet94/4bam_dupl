import {TouchableOpacity,Alert,View,Text,Button,Image,StyleSheet} from 'react-native';
import React, {Component} from 'react';
import CarouselPager from 'react-native-carousel-pager';

export default class  ImagesGallery extends Component{
    constructor(props){
      super(props);
      this.state = {
        page:0
      };   
      this.startGalleryScrolling = this.startGalleryScrolling.bind(this);
   
    }  
    
    componentWillMount = ()=>{
      this._mounted = true;
    }
    componentWilUnlMount = ()=>{
      this._mounted = false;
    }
    componentDidMount = ()=>{
          
            setTimeout(this.startGalleryScrolling,5000);
          
          
      }
      
      startGalleryScrolling = ()=>{
        if(this._mounted && this.carousel ){
          if((this.state.page+1)<this.props.images.length){
            this.carousel.goToPage(this.state.page+1)
            
          }else{
            this.carousel.goToPage(0)
            
          }
          setTimeout(this.startGalleryScrolling,5000);  
        }
        
    }
  
    onPageChange = (page)=>{
      this.setState({
        page
      })
      this.props.onPageChange(page);
    }    
    render = ()=>{
      return (
       
         <CarouselPager 
         key={this.props.exercise.id}
         ref={ref => this.carousel = ref} 

            style={{flex:1}} 
            pageSpacing={0}
            initialPage={0} 
            onPageChange={this.onPageChange}>
            {this.props.children?this.props.children:null}
          </CarouselPager>
        );
      
    }
  }


