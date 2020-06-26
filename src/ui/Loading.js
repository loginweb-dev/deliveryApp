import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

// Configurations
import { Config } from '../config/config.js';

const Loading = (props) => (
    <View style={ style.container }>
        <ActivityIndicator style={{ margin: 10 }} size={props.size ? props.size : 'small'} color={props.color ? props.color : Config.color.primary} />
    </View>
);

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.color.backgroundSplash,
    },
});

export default Loading;