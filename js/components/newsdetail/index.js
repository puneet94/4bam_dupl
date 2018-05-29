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
    Alert,
    ActivityIndicator
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import AwseomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import { NavigationActions } from 'react-navigation';
import FastImage from 'react-native-fast-image'


import store from 'react-native-simple-store';
import { em_s, lineHeight_s, handleExternalUrl } from '../../core/helpers';


class NewsDetailScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      data: [],
      gallerydata: [],
      gallerypage: 1,
      error: null,
      refreshing: false,
      audioPaused: true,
      YoutubePlayerHeight: ((appVars.screenX/16)*9)-1,
      fontSize: appVars.baseUnit,
      newsid: "",
      newsdate: "",
  }
}

componentWillMount = async ()=>{
  store.delete('deepLinkNewsId');
  const {newsid} = this.props.navigation.state.params;
  this.setState({
    newsid: newsid+""
  });
}
 
  static navigationOptions = ({ navigation }) => {
     const { params = {} } = navigation.state;
     return {
         headerRight: <View style={appStyles.headerRight}><Text style={appStyles.headerRightText}>{params.newsdate}</Text></View>
    }
 };



  componentDidMount = async ()=>{
     this.fetchdata();
  }


fetchdata = async () => {
  const navParams = this.props.navigation.state.params;
  let userid = await store.get(appVars.STORAGE_KEY);
  const api = `${appVars.apiUrl}/news/reader.html?authtoken=${appVars.apiKey}&userid=${userid}&id=${navParams.newsid}`;
  
  this.setState({ loading: true});

    fetch(api)
      .then(res => res.json())
      .then(res => {
        console.log("news detail data",res.response);
        this.setState({
          data: res.response || [],
          error: res.error || null,
          loading : false,
          refreshing: false,
        },()=>{
          this.props.navigation.setParams({
            newsdate: res.response[0].date
        });
        });
      })
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



 renderItem = (item) =>{
    return(
      <View>
      <FastImage style={{width: appVars.screenX, height: appVars.screenX}}
                  source={{uri: appVars.serverUrl +"/"+item.picture.img.src} }
                  />

      <View style={appStyles.contentElement}>

      
        <Text style={appStyles.headline}>{item.title}</Text>

          <HTMLView addLineBreaks={false} value={item.text} 
          
          stylesheet={appStyles}
          
          onLinkPress={(url) => handleExternalUrl(url)} />
   
      </View>
      <View style={appStyles.contentSeperator} />
        
        <View style={appStyles.contentElement}>
        
        
        <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
              <View style={[appStyles.imageBorder,{borderRadius: appVars.screenX*(0.125)+4}]}>
              <FastImage style={{borderRadius: appVars.screenX*0.125, width: appVars.screenX*0.25, height: appVars.screenX*0.25}} source={{uri: appVars.serverUrl +"/"+item.author_picture.img.src} } />
              </View>
            </View>

            <View style={appStyles.newsListInner}>
              <Text style={appStyles.authorName}>
              {item.author}
              </Text>
              <HTMLView addLineBreaks={false} value={item.author_text} 
          
          stylesheet={appStyles}
          
          onLinkPress={(url) => handleExternalUrl(url)} />
            </View>
          </View>



        </View>

      </View>

    );
  }

	render = ()=>{

    if(this.state.loading){
      return(
          <View style={{flex:1,justifyContent:"center",backgroundColor:appVars.colorWhite}}>
              <ActivityIndicator size="large" color={appVars.colorMain} />
          </View>
      )
    }  else{
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
}

export default NewsDetailScreen;