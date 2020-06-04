import React from 'react';
import { Image } from 'react-native';

const Avatar = props => {
  return (
    <Image
        style={{
            width: props.width,
            height: props.width,
            borderColor: props.borderColor ? props.borderColor : 'white',
            borderStyle: 'solid',
            borderWidth: 3,
            borderRadius: props.width/2,
        }}
        source={props.image}
    />
  );
}

export default  Avatar;