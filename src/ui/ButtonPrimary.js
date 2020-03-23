import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Configurations
import { Config } from '../config/config.js';

const ButtonPrimary = props => {
  return (
    <TouchableOpacity
        onPress={props.onPress}
        style={style.button}
    >
        <Text style={style.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
    button: {
        height: 40,
        backgroundColor: Config.color.primary,
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