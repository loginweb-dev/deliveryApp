import React from 'react';
import { View } from 'react-native';

const Separator = props => {
  return (
    <View style={{
        height: props.height ? props.height : 20
    }}/>
  );
}

export default  Separator