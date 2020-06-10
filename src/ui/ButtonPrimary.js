import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Configurations
import { Config } from '../config/config.js';

const ButtonPrimary = props => {
  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={[style.button, {backgroundColor: props.color ? props.color : Config.color.primary}]}
    >
        <Text style={style.buttonText}>{props.children} {props.icon && <Icon name={props.icon} size={20} />} </Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    button: {
        height: 40,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        margin: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default  ButtonPrimary;