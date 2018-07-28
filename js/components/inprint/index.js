import React, { Component } from 'react'
import { StyleSheet,
    TouchableHighlight,
    Dimensions,
    View,
    ScrollView,
    Text
} from 'react-native'
import appStyles from '../../appStyles';
import appVars from '../../appVars';
import HTMLView from 'react-native-htmlview';
import { em, lineHeight, handleExternalUrl } from '../../core/helpers';


class InprintScreen extends Component {  

      render() {
          

          return (  
              <ScrollView style={appStyles.container}>
              <View style={appStyles.contentElement}>
                <HTMLView addLineBreaks={true} value={appVars.htmlImpress} 
                
                      stylesheet={StyleSheet.create({
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
                          fontWeight: '700',
                        },
                        a: {
                          color: appVars.colorMain,
                          fontWeight: '700',
                        },
                        h3: {
                          fontSize: em(1.250),
                          lineHeight: lineHeight(1.250,120),
                          fontFamily: appVars.fontHeadline,
                          color: appVars.colorBlack,
                          marginBottom: em(0.500),
                        }
                      })  
                      }
                      
                      onLinkPress={(url) => handleExternalUrl(url)} />
                      </View>
              </ScrollView>
          )
    }
  }

export default InprintScreen;
