import React from 'react';
import { View, Text } from 'react-native';

const Badge = props => {
  return (
    <View style={{ backgroundColor: props.color ? props.color : 'black', borderRadius: props.size ? props.size : 15, borderColor: props.borderColor ? props.borderColor : 'white', borderStyle: 'solid', borderWidth: 2,}}>
        <Text style={{ color: props.textColor ? props.textColor : 'white', fontSize: props.size ? props.size : 12, paddingHorizontal: 10 }} numberOfLines={1}>{props.children}</Text>
    </View>
  );
}

export default  Badge;