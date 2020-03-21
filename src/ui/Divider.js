import React from 'react';
import { View, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const Divider = props => {
  return (
    <View style={{
      borderBottomColor: props.color ? props.color : 'black',
      borderBottomWidth: props.size ? props.size : 1,
      width: props.width ? props.width : screenWidth,
      marginTop: props.margin ? props.margin : 0,
      marginBottom: props.margin ? props.margin : 0
    }}/>
  );
}

export default  Divider