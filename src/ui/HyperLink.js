import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HyperLink = props => {
  return (
    <TouchableOpacity
        onPress={() => Linking.openURL(props.url)}
        style={{ marginHorizontal: 5 }}
    >
        <Text style={{ color: props.color ? props.color : '#307FD3', fontSize: props.size ? props.size : 15 }}>
            {   props.icon &&
                <Icon name={props.icon} size={props.size ? props.size : 15} style={{ color: props.color ? props.color : '#307FD3' }} />
            }
            { props.children }
        </Text>
    </TouchableOpacity>
  );
}

export default  HyperLink;