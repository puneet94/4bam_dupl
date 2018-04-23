import {Platform, Dimensions, Linking} from 'react-native';

// Precalculate Device Dimensions for better performance
const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

// Calculating ratio from iPhone breakpoints
const ratioX = x < 375 ? (x < 320 ? 0.75 : 0.875) : 1;
const ratioY = y < 568 ? (y < 480 ? 0.75 : 0.875) : 1;

// We set our base font size value
const base_unit = 16;

// Simulating EM by changing font size according to Ratio
const unit = base_unit * ratioX;

// We add an em() shortcut function
export function em(value) {
  return unit * value;
}

export function em_s(value, stored_base_unit) {
  var new_unit = stored_base_unit * ratioX;
  return new_unit * value;
}

// calcuate the lineHeight by the faked em and how many percent - lineHeight(0.825,140)
export function lineHeight(value,lh) {
  if(Platform.OS === 'android') {        
  return (unit * value)*(lh/100);
  } else {
  var lh = lh-20;
  return (unit * value)*(lh/100);
  }
}

export function lineHeight_s(value,stored_base_unit,lh) {
  var new_unit = stored_base_unit * ratioX;
  if(Platform.OS === 'android') {    
  return (new_unit * value)*(lh/100);
  } else {
  var lh = lh-20;
  return (new_unit * value)*(lh/100);    
  }

}

export function handleExternalUrl(externalurl) {
  Linking.canOpenURL(externalurl).then(supported => {
        if (supported) {
          Linking.openURL(externalurl);
        } else {
          console.log("Don't know how to open URI: " + externalurl);
        }
    });
}

