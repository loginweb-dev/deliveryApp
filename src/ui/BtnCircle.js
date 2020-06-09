import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const BtnCircle = props => {

    const style = StyleSheet.create({
        container: {
            backgroundColor: props.backgroundColor ? props.backgroundColor : 'white',
            borderRadius: 20,
            borderColor: props.color ? props.color : 'white',
            borderStyle: 'solid',
            borderWidth: 2,
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });

    return (
        <TouchableOpacity
            style={ style.container }
            onPress={props.onPress}
        >
            <Icon name={props.icon} color={props.color ? props.color : 'white'} size={20} />
        </TouchableOpacity>
    );
}

export default  BtnCircle;