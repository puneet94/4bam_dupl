"use strict"
import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    Button,
    Share,
    Modal,
    ListView,
    Image,
    Alert
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import AwseomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import { NavigationActions } from 'react-navigation';


import store from 'react-native-simple-store';
import { em_s, lineHeight_s, handleExternalUrl } from '../../core/helpers';


class NewsDetailScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      gallerydata: [],
      gallerypage: 1,
      error: null,
      refreshing: false,
      audioPaused: true,
      YoutubePlayerHeight: ((appVars.screenX/16)*9)-1,
      fontSize: appVars.baseUnit,
      newsid: "",
  }
}
static navigationOptions = {
    header: null
}
componentWillMount = async ()=>{
  store.delete('deepLinkNewsId');
  let fontSize = Number.parseInt(await store.get('fontSize'),10);
  const {newsid} = this.props.navigation.state.params;
  this.setState({
    newsid: newsid+""
  });
  if(fontSize){
    this.setState({
      fontSize
    });
  }
}
 
  static navigationOptions = ({ navigation }) => {
     const { params = {} } = navigation.state;  
    if(params.media) {
     return {
         headerRight: <View style={{flexDirection:"row"}}>
           <TouchableOpacity style={appStyles.iconWrapper} onPress={() => params.handleSocialShare()}><IoniconsIcon size={24} name={appVars.shareIcon} color={appVars.colorWhite}/></TouchableOpacity>
           </View>
     }
    } else {
      return {
      headerRight: <View style={{flexDirection:"row"}}>
            <TouchableOpacity style={appStyles.iconWrapper} onPress={() => params.handleSocialShare()}><IoniconsIcon size={24} name={appVars.shareIcon} color={appVars.colorWhite }/></TouchableOpacity>
            </View>
      }
    }
 };


  componentDidMount = async ()=>{
   
    this.props.navigation.setParams({ 
      handleSocialShare: this.SocialShare,
    });    
     this.fetchdata(); 
  }
  componentWillUpdate = async (nextProps,nextState)=>{
    let fontSize = Number.parseInt(await store.get('fontSize'),10);
    if(fontSize && fontSize!==nextState.fontSize){
      this.setState({
        fontSize
      });
    }
  }
componentDidUpdate = (prevProps,prevState)=>{
  if(prevState.audioPaused!==this.state.audioPaused || prevState.bookmarked!=this.state.bookmarked){
    this.props.navigation.setParams({ 
      handleSocialShare: this.SocialShare,
    });    
    }
}

componentWillUnmount=()=>{
  
}

fetchdata = async () => {
  const navParams = this.props.navigation.state.params;
  let userid = await store.get(appVars.STORAGE_KEY);
  const api = `${appVars.apiUrl}/news/reader.html?authtoken=${appVars.apiKey}&userid=${userid}&id=${navParams.newsid}`;
  
  this.setState({ loading: true});

    fetch(api)
      .then(res => res.json())
      .then(res => {
        console.log("news detail data",res);
        this.setState({
          data: res.response || [],
          error: res.error || null,
          loading : false,
          refreshing: false
        },()=>{
        });
      })
      .then(
        //this.fetchgallerydata()
      )
      .catch(error => {
        this.setState({ error, loading: false });
      })
};


  handleRefresh = () =>{
    this.setState({
      refreshing:true,
    }, ()=>{
      this.fetchdata();
    })
  }

  handlePageEnd = ()=>{
    this.setState({
      gallerypage: this.state.gallerypage+1,
    }, ()=>{
      
    });
  }

  ratioImageHeigh = (width,height,multiplicate) =>{
    return height*(appVars.screenX*multiplicate/width);
  }

  handleYoutubeReady = () => {
    setTimeout(() => this.setState({ YoutubePlayerHeight: (appVars.screenX/16)*9 }), 200);
}


 renderItem = (item) =>{

    return(

      <View style={appStyles.contentElement}>

      
        <Text style={[appStyles.headline,{fontSize:em_s(2.250,this.state.fontSize)}]}>{item.title}</Text>


          <HTMLView addLineBreaks={false} value={item.text} 
          
          stylesheet={StyleSheet.create({
            p: {
              fontSize: em_s(0.875,this.state.fontSize),
              lineHeight: lineHeight_s(0.875,this.state.fontSize,150),
              fontFamily: appVars.fontText,
              color: appVars.colorBlack,
              marginBottom: em_s(0.875,this.state.fontSize),
              paddingLeft: 20,
              paddingRight: 20,
            },
            strong: {
              fontWeight: '700'
            },
            a: {
              color: appVars.colorMain,
              fontWeight: '700',
            },
            h3: {
              fontSize: em_s(1.250,this.state.fontSize),
              lineHeight: lineHeight_s(1.250,this.state.fontSize,120),
              fontFamily: appVars.fontHeadline,
              color: appVars.colorBlack,
              marginBottom: em_s(0.500,this.state.fontSize),
            }
          })  
          }
          
          onLinkPress={(url) => handleExternalUrl(url)} />
          
            <FlatList
            data={this.state.gallerydata}
            numColumns={4}
            keyExtractor={(item,index)=> {
                return item.img.src;
              }}
            renderItem={({item,index}) => this.renderGalleryItem(item,index)}
            />
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style={appStyles.newsDate}>{item.date}</Text>
            <Text style={appStyles.newsEditor}>{item.editor}</Text>
          </View>
          
      </View>

    );
  }

	render = ()=>{


    return (
      <View style={appStyles.contenContainer}>
      <FlatList
        data={this.state.data}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            colors={[appVars.colorMain]}
          />
          }
        onEndReachedThreshold={.5}
        onEndReached={this.handlePageEnd}
        keyExtractor={(item,index)=> {
          return item.id;
          }}
        renderItem={({item}) => this.renderItem(item)}
       />
      </View>
    );
	}
}

export default NewsDetailScreen;