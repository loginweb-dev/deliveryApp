import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const InvisibleBox = props => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
        <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 10 }}></View>
    </TouchableWithoutFeedback>
  );
}

export default  InvisibleBox;