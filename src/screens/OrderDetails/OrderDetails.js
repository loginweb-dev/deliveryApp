import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';

// Components

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

const details = [
        {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
        {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
        {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
        {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
        {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
    ];

class OrderDetails extends Component {
    render(){
        return (
            <View style={style.container}>
                <View style={ style.header }>
                    <Icon name="md-list-box" size={80} color={Config.color.primary} />
                    <Text style={{ fontSize: 25 }}>COD: 00001</Text>
                    <Text>Product 1, Product 2, Product 3</Text>
                </View>
                <Timeline
                    circleColor={Config.color.primary}
                    lineColor={Config.color.primary}
                    data={details}
                    options={{ style: style.timeline }}
                />
                {/* <View style={{ height: 50 }}></View> */}
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: Config.color.background
    },
    header: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    timeline: {
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        // paddingBottom: 50
    }
});

export default OrderDetails;
