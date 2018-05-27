import {StyleSheet, Platform, Dimensions} from 'react-native';
import appVars from './appVars';

import { em,lineHeight } from './core/helpers'

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

if(Platform.OS === 'android') {
  
  var formInput = {};
  var ePaperWrapperPlusHeight = 0;

} else {
  // ios
  var formInput = { 
    borderBottomColor: appVars.colorMain, 
    borderBottomWidth: 1,
    padding: 5,
    fontSize: em(0.875),
  } 
  var ePaperWrapperPlusHeight = 15;
}


module.exports = StyleSheet.create({

  formInput: formInput,

  //epaper (home)
  ePaperMainContainer: {
    backgroundColor: appVars.colorWhite,
    height: (y * .75)-80,
    borderBottomColor: appVars.colorWhite,
    borderBottomWidth: 2,
  },
  ePaperMainWrapper: {
    paddingTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ePaperHorizontalContainer: {
    backgroundColor: appVars.colorWhite,
    height: (y * .25)+ePaperWrapperPlusHeight,
  },
  ePaperEditionWrapper: {
    height: (y * .25)+ePaperWrapperPlusHeight,
    width: (x * .25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ePaperEditionDate:{
    backgroundColor: appVars.colorMain,
    color: appVars.colorWhite,
    textAlign: 'center',
    fontSize: em(0.666),
    padding: 3,
    fontFamily: appVars.fontMain,
    justifyContent: 'center',
    alignItems: 'center'
  },

  //myIssues
  
  myIssuesEditionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 15,
  },

  myIssueSelect: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderColor:appVars.colorDrawerIsActiveBackgroundColor,
    backgroundColor: appVars.colorWhite,
    borderWidth: 1
  },

  //newslist
  newsListInner: {
    paddingLeft: 10,
    width: (x * .75)-30,
  },
  newsListHeadline: {
    fontSize: em(1.500),
    lineHeight: lineHeight(1.500,120),
    fontFamily: appVars.fontHeadline,
    color: appVars.colorBlack,
    marginBottom: em(0.25),
    marginRight: 20,
    backgroundColor: 'transparent',
  },
  newsListCity: {
    fontSize: em(0.875),
    fontFamily: appVars.fontMain,
    color: appVars.colorDarkGray,
  },
  newsListTeaser: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,140),
    fontFamily: appVars.fontText,
    color: appVars.colorBlack,
  },



  //newsdetail
  topheadlineContainer: {
    borderBottomWidth: 2,
    borderBottomColor: appVars.colorLightGray,
    alignSelf: 'center',
  },
  newsDate: {
    fontSize: em(0.75),
    width: (x*0.5),
    fontFamily: appVars.fontSub,
    color: appVars.colorDarkGray,
  },
  topheadline: {
    fontSize: em(0.75),
    fontFamily: appVars.fontMain,
    color: '#666',
  },
  headline: {
    fontSize: em(2.250),
    fontFamily: appVars.fontHeadline,
    color: appVars.colorBlack,
    textAlign: 'center',
  },
  subheadline: {
    fontSize: em(1),
    fontFamily: appVars.fontSub,
    color: appVars.colorBlack,
    textAlign: 'center',
    marginBottom: em(0.500),
  },
  imageContainer: {
    marginBottom: em(0.875),
  },
  imagecopyright: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: em(0.750),
    color: appVars.colorWhite,
    textShadowColor: appVars.colorBlack,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    fontFamily: appVars.fontSub,
    backgroundColor: 'transparent',
  },
  imagecaption: {
    marginTop: em(0.150),
    fontSize: em(0.875),
    fontFamily: appVars.fontSub,
    color: appVars.colorMain,
  },
  newsEditor: {
    fontSize: em(0.750),
    justifyContent: 'flex-end',
    fontFamily: appVars.fontMain,
    color: appVars.colorDarkGray,
  },

  galleryContainer: {
    flex: 1,
  },
  galleryItem: {
    flex: 1,
    height: (x * .25)-5,
    width: (x * .25)-5,
    margin: 1
  },

//drawer

drawerContainer: {
  flex: 1,
  backgroundColor: appVars.colorMain,
},

drawerLogo: {
  width: null,
  height: 37,
  resizeMode: 'contain',
  marginTop: 10,
  marginBottom: 10,
  marginLeft: 15,
  marginRight: 15,
  },

drawerSeperator: {
  backgroundColor: appVars.colorDrawerSeperatorBackgroundColor,
  height: 6,
},

drawerItem: {
  alignItems: 'center',
  flexDirection: 'row',
  padding: 15,
},

drawerIcon: {
    color: appVars.colorWhite,
    fontSize: 22,
    width: 25,
    height: 25,
    marginRight: 10,
    textAlign: 'center',
},

drawerLabel: {
  fontSize: 18,
  fontFamily: appVars.fontMain,
  color: appVars.colorWhite,
  paddingLeft: 8,
},

//header
  headerWrapper: {
    backgroundColor: appVars.colorMain,
  },
  
  headerTitle: {
    fontFamily: appVars.fontMain,
    color: appVars.colorBlack,
    fontSize: 18,
  },

  iconWrapper: {
    flex:1,
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerIcon: {
      color: appVars.colorMain,
      fontSize: 20,
      textAlign: 'center',
  },
  
  //imageModel
  imageModelHeader: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  imageModelHeaderClose: {
    margin: 15,
    color: appVars.colorWhite,
  },

  //submenu
  subMenuContainer: {
    backgroundColor: appVars.colorSeperatorColor,
    borderBottomWidth: 2,
    borderBottomColor: appVars.colorMain,
  },
  subMenuItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMenuItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: appVars.colorMain,
    paddingTop: 10,
    paddingBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subMenuTextLabel: {
    color: appVars.colorBlack,
    fontSize: 16,
    fontFamily: appVars.fontMain,
  },
  subMenuSeperator: {
    flex: 0,
    width: 1,
    margin: 8,
    backgroundColor: appVars.colorDrawerSeperatorBackgroundColor,
  },

  //settings 
  settingsWrapper: {
    flexDirection:'row',
    justifyContent: 'space-between'
  },

  settingsColStart: {
    justifyContent: 'flex-start',
    width: (x * .50),
    fontFamily: appVars.fontMain,
    color: appVars.colorBlack,
    fontSize: em(0.875),
  },

  settingsColEnd: {
    justifyContent: 'flex-end', 
  },

  settingsSlider: {
    width: (x * .40),
  },

  // generall stuff
  container: {
    flex: 1,
    backgroundColor: appVars.colorWhite,
  },
  contenContainer: {
    flex: 1,
    backgroundColor: appVars.colorWhite,
  },
  contentSeperator: {
    backgroundColor: appVars.colorSeperatorColor,
    height: 5,
    borderBottomColor: appVars.colorLightGray,
    borderBottomWidth: 1,
    borderTopColor: appVars.colorLightGray,
    borderTopWidth: 1,
  },
  contentElement: {
    margin: 10,
  }, 
  contentHeadline: {
    fontSize: em(1.500),
    lineHeight: lineHeight(1.500,120),
    fontFamily: appVars.fontHeadline,
    color: appVars.colorBlack,
    marginBottom: em(0.25), 
  },
  contentText: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,140),
    fontFamily: appVars.fontText,
    color: appVars.colorBlack,
    marginBottom: em(0.875),
  },

  submit: {
    fontSize: em(1),
    fontFamily: appVars.fontMain,
    color: appVars.colorWhite,
  },

  imageBorder: {
    padding: 3,
    backgroundColor: appVars.colorWhite,
    borderColor: appVars.colorMain,
    borderWidth: 2,
  },

  listAd: {
    paddingTop: 3,
    paddingBottom: 3,
    backgroundColor: appVars.colorSeperatorColor,
    justifyContent: 'center',
    alignItems: 'center',   
  },

  paywallIconTriangle:{
    position: 'absolute',
    right: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderRightWidth: 32,
    borderTopWidth: 32,
    borderRightColor: 'transparent',
    borderTopColor: appVars.colorMain,
    transform: [
      {rotate: '90deg'}
    ]
  },

  paywallIcon: {
    position: 'absolute',
    backgroundColor: 'transparent',
    right: 2,
    top: 2,
    fontSize: 16,
    color: appVars.colorWhite,
  },

  ActivityIndicatorFullscreenContainer: {
    flex: 1,
    backgroundColor: appVars.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ePaperActivityIndicator: {
    flex: 1,
    backgroundColor:'rgba(255, 255, 255, 0.8)',
  },

  iOSToast: {
    backgroundColor:appVars.colorDrawerSeperatorBackgroundColor,
    borderRadius: 5,
    padding: 10,
  },
  iOSToastText: {
    color: appVars.colorBlack,
  },

});