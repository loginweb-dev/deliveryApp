import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const BtnCircle = props => {

    const style = StyleSheet.create({
        container: {
            backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
            borderRadius: props.size ? (props.size*10)/2 : 20,
            borderColor: props.color ? props.color : 'white',
            borderStyle: 'solid',
            borderWidth: 2,
            width: props.size ? (props.size*10) : 40,
            height: props.size ? (props.size*10) : 40,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });

    return (
        <TouchableOpacity
            style={ style.container }
            onPress={props.onPress}
        >
            <Icon name={props.icon} color={props.color ? props.color : 'white'} size={props.size ? (props.size*5) : 25} />
        </TouchableOpacity>
    );
}

export default  BtnCircle;