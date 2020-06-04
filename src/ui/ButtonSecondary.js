import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Configurations
import { Config } from '../config/config.js';

const ButtonSecondary = props => {
  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={style.button}
        disabled={props.disabled ? true : false}
    >
        <Text style={style.buttonText}>{props.children}</Text>
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
        borderColor: Config.color.primary
    },
    buttonText: {
        color: Config.color.primary,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default  ButtonSecondary;