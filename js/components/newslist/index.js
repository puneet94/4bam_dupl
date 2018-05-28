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


  handleClick = async (item)=>{
    this.setState({
      currentItem: item.id
    });

    const { navigation } = this.props;
    navigation.navigate('NewsDetail', {newsid: item.id});
  }
  renderItemNext = (item,index) => {
    return (
     <View>
      <View style={appStyles.contentElement}>
      
          <TouchableOpacity activeOpacity = { .5 } onPress={ this.handleClick.bind(this,item)}>
                    
          <Text style={appStyles.newsListHeadline} numberOfLines={1}>{item.title}</Text>
            
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
              <View style={[appStyles.imageBorder,{borderRadius: appVars.screenX*(0.125)+4}]}>
              <Image style={{borderRadius: appVars.screenX*0.125, width: appVars.screenX*0.25, height: appVars.screenX*0.25}} source={{uri: appVars.serverUrl +"/"+item.picture.img.src} } />
              </View>
            </View>
            <View style={appStyles.newsListInner}>
              <Text style={appStyles.newsListTeaser} numberOfLines={6}>
  
              {item.text.replace(/<{1}[^<>]{1,}>{1}/g,"")}
              </Text>
            </View>
          </View>
          </TouchableOpacity>
        </View>
        <View style={appStyles.contentSeperator} />
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