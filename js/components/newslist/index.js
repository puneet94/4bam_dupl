"use strict"
import React, { Component } from 'react';
import {
    View,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
    TouchableOpacity,
    PermissionsAndroid,
    Dimensions,
    RefreshControl,
    Alert,
    ActivityIndicator,
    ToastAndroid,
    Linking,
    Button,
    Image,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import AwseomeIcon from 'react-native-vector-icons/FontAwesome';
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import store from 'react-native-simple-store';
import { em_s, lineHeight_s, handleExternalUrl } from '../../core/helpers';
import {getNewsList} from "../../services/storeService";

class NewsListScreen extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      error: null,
      refreshing: false,
      downloading: false,
      currentItem: null,
      selectedArchive: this.props.screenId,
      fontSize: appVars.baseUnit,      
    }

  }
  
  componentWillMount = async ()=>{
    let fontSize = Number.parseInt(await store.get('fontSize'),10);
    
      if(fontSize){
        this.setState({
          fontSize
        });
      }
    
  }

    
  componentDidMount  = async () => {
    this.fetchdata(); 
  }

  fetchdata = async () => {
    const { page } = this.state;
    
    
    let userid = await store.get(appVars.STORAGE_KEY);
    this.setState({ loading: true});
    if(page===1){
      this.setState({ refreshing: true});
      
      getNewsList(appVars.apiKey,userid,page)
        .then(res => res.json())
        .then(res => {
            console.log("news response",res);
            this.setState({
                data: res.response || [],
                error: res.error || null,
                loading : false,
                refreshing: false,
            },()=>{
                setTimeout(()=>{
                    if(this.newsList && this.newsList.scrollToOffset){
                        this.newsList.scrollToOffset({ x:0,y:0,animated: true });
                    }
                },10);
          });
        })
        .catch(error => {
          this.setState({ error, loading: false });
        })
      } else {
        
        
      getNewsList(appVars.apiKey,userid,page)
          .then(res => res.json())
          .then(res => {
            
            this.setState({
              data: [...this.state.data, ...res.response],
              error: res.error || null,
              loading : false,
              refreshing: false,
            })
          })
          .catch(error => {
            this.setState({ error, loading: false });
          });
      }
  };

  handleRefresh = () =>{
    this.setState({
      page: 1,
      refreshing:true
    }, ()=>{
      this.fetchdata();
    })
  }

  handlePageEnd = ()=>{
    this.setState({
      page: this.state.page+1,
    }, ()=>{
      this.fetchdata();
    });
  }

  ratioImageHeigh = (width,height,multiplicate) =>{
    return height*(appVars.screenX*multiplicate/width);
  }


  renderSeparator = () =>{
    
    return(
      <View style={appStyles.contentSeperator}/>
    );
  }

  handleClick = async (item)=>{
    this.setState({
      currentItem: item.id
    });

    const { navigation } = this.props;
    navigation.navigate('NewsDetail', {newsid: item.id});
  }
  renderItemNext = (item,index) => {
    return (
      <View style={{flex:1}}>
      <TouchableOpacity activeOpacity = { .5 } onPress={ ()=>this.handleClick(item)}>
      <View style={{flexDirection:"row"}}>
        <View style={{flex:2,flexDirection:"column",alignItems:"center"}}>
        {item.picture&&<Image style={{height: 40,width: 40,borderRadius:20,borderColor:"black",borderWidth:1}} source={{uri: appVars.apiUrl +"/"+item.picture.sources[0].src} }/>}
          <View style={{flex:9,backgroundColor:"red",width:3.5}}>
        
          </View>
        </View>
        <View style={{flex:9,marginHorizontal:8,marginBottom:10,position:"relative"}}>
          <View style={{
            transform: [{rotate: '-90deg'}],
            width: 0,
            position:"absolute",
            left: -12,
            top:12,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderLeftWidth: 8,
            borderRightWidth: 8,
            borderBottomWidth: 8,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'gray'
             }}>

          </View>
          <View style={{borderWidth:0.8,borderColor:"gray",borderRadius:1,padding:10}}>
          <Text style={appStyles.newsDate}>{item["date"]}</Text>
            <View style={[appStyles.contentSeperator,{backgroundColor:"red",height:1}]}/>
            <Text style={[appStyles.newsListHeadline,{fontSize:em_s(1,this.state.fontSize), lineHeight: lineHeight_s(1.5,this.state.fontSize,120), marginBottom: em_s(0.550,this.state.fontSize)}]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[appStyles.newsListTeaser,{fontSize:em_s(0.875,this.state.fontSize), lineHeight: lineHeight_s(0.875,this.state.fontSize,150)}]} numberOfLines={20}>
              {item.text.replace(/<{1}[^<>]{1,}>{1}/g," ")}
            </Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
      </View>
    );
  }
  

	render=()=>{
    return (
      
      <View style={appStyles.container}>
      <View style={appStyles.newsListContainer}>
      <FlatList
        data={this.state.data}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            colors={[appVars.colorMain]}
          />
        }
        onEndReached={this.handlePageEnd}
        onEndReachedThreshold={1}
        ref={(ref) => { this.newsList = ref; }}
        keyExtractor={(item,index)=> {
          return item.id;
          }}
        renderItem={({item,index}) => this.renderItemNext(item,index)}
       />
       </View>
      </View>
    );
	}
}

export default NewsListScreen;