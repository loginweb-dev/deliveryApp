import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Configurations
import { Config } from '../config/config.js';

const ButtonSecondary = props => {
  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={style.button}
        disabled={props.disabled ? true : false}
    >
        <Text style={[style.buttonText, { fontSize: props.size ? props.size : 20 }]}>{props.children} {props.icon && <Icon name={props.icon} size={props.sizeIcon ? props.sizeIcon : 20} />} </Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 5,
        margin: 10,
        borderWidth: 2,
        borderColor: Config.color.secondary
    },
    buttonText: {
        color: Config.color.primary,
        // fontSize: 20,
        textAlign: 'center'
    }
});

export default  ButtonSecondary;