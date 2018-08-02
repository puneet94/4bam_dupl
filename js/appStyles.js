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

  //timeline - weekplan

  timeline_container: {
    flex: 1,
    flexDirection: 'row',
  },

  timeline_datecontainer: {
    width: 40,
    height: 24,
    backgroundColor: appVars.colorSeperatorColor,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10
  },

 timeline_date: {
    fontSize: 14,
    textAlign:'center',
    fontFamily: appVars.fontMain,
    color: appVars.colorBlack,
  },

  timeline_line_container: {
    width: 30,
    height: '100%',
    backgroundColor: appVars.colorWhite,
    alignItems:'center',
    marginTop: 6,
  },

  timeline_container_today: {
 width: 30,
    height: '100%',
    backgroundColor: appVars.colorWhite,
    alignItems:'center',
    marginTop: 6,
  },

  timeline_dot_outer: {
    width: 15,
    height: 15,
    backgroundColor: appVars.colorMain,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },


  timeline_dot_outer_today: {
    width: 15,
    height: 15,
    backgroundColor: appVars.colorActive,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },

  timeline_dot_inner: {
    width: 7,
    height: 7,
    backgroundColor: appVars.colorWhite,
    borderRadius: 10,
  },

  
  timeline_line: {
    width: 2,
    backgroundColor: appVars.colorMain,
    height: '100%',
  },

  timeline_content: {
    flex: 1,
  },
  timeline_text: {
    fontFamily: appVars.fontText,
    color: appVars.colorBlack,
    marginTop: 4,
    fontFamily: appVars.fontText,
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,140)
  },
  timeline_text_care: {
    fontFamily: appVars.fontText,
    color: appVars.colorMain,
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,140)
  },

timeline_content_seperator: {
  backgroundColor: appVars.colorSeperatorColor,
  height:1,
  marginTop:10,
  marginBottom:10
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

//author

authorName: {
  fontSize: em(1.0000),
  lineHeight: lineHeight(1.000,120),
  fontFamily: appVars.fontHeadline,
  color: appVars.colorBlack
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

  headerRightText: {
    fontFamily: appVars.fontText,
    fontSize: 16,
    color: appVars.colorMain,
  },
  headerRight: {
    marginRight: 15,
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
      fontSize: 28,
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

  //slider rating 

  ratingSlider: {
    width: (x * .90),
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

  iOSToast: {
    backgroundColor:appVars.colorDrawerSeperatorBackgroundColor,
    borderRadius: 5,
    padding: 10,
  },
  iOSToastText: {
    color: appVars.colorBlack,
  },

// TRAINING

blockText: {
  fontSize: em(0.750),
  fontFamily: appVars.fontMain,
  color: appVars.colorDarkGray,
  marginLeft: 10,
},
timer: {
  fontFamily: appVars.fontText,
  fontSize: 16,
  marginRight: 15,
  color: appVars.colorMain,
},

// Alarmmaaaaa

alarmDayWrapper:{
    backgroundColor: appVars.colorSeperatorColor,
    justifyContent:'center',
    borderRadius:10,
    width: x-55,
},

alarmDay: {
  fontFamily: appVars.fontMain,
  color: appVars.colorBlack,
  fontSize: 18,
  paddingLeft: 15,
},

alarmTime: {
  borderRadius:10,
  borderColor: appVars.colorMain,
  marginLeft: 15,
},

startButton: {
  width: 200,
      height: 200,
      backgroundColor:appVars.colorMain,
      borderRadius: 100,
      justifyContent:"center",
      alignItems:"center",
},

startButtonText: {
  fontFamily: appVars.fontMain,
  fontSize: 18,
  color: appVars.colorWhite,
},
text: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,150),
    fontFamily: appVars.fontText,
    color: appVars.colorBlack,
},
  p: {
    fontSize: em(0.875),
    lineHeight: lineHeight(0.875,150),
    fontFamily: appVars.fontText,
    color: appVars.colorBlack,
    marginBottom: em(0.875),
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
    fontSize: em(1.250),
    lineHeight: lineHeight(1.250,120),
    fontFamily: appVars.fontHeadline,
    color: appVars.colorMain,
    marginBottom: em(0.500),
  },
  li: {
    fontSize: em(0.750),
    fontFamily: appVars.fontText,
    color: appVars.colorMain,
  },

});