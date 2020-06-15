import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';

// UI
import Badge from "../ui/Badge";

// Configurations
import { Config } from '../config/config.js';

const Avatar = props => {
  return (
    <View
      style={{ width: props.width+6,
        height: props.width+6,
        borderColor: props.borderColor ? props.borderColor : 'white',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: props.width/2, 
        alignItems: 'center',}}
    >
      <Image
        style={{
            width: props.width,
            height: props.width,
            borderRadius: props.width/2,
        }}
        source={props.image}
      />
      {
        props.onPress && 
        <TouchableOpacity style={{ position: 'absolute', bottom: 3 }} onPress={props.onPress}>
          <Badge color={ Config.color.primary } >Cambiar</Badge>
        </TouchableOpacity>
      }
    </View>
  );
}

export default  Avatar;