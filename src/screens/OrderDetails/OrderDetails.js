import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import Icon from 'react-native-vector-icons/Ionicons';

// Components

// Configurations
import { Config } from '../../config/config.js';

class OrderDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            order: this.props.route.params.order
        }
    }

    render(){
        return (
            <View style={style.container}>
                <View style={ style.header }>
                    <Icon name="md-list-box" size={80} color={Config.color.primary} />
                    <Text style={{ fontSize: 25 }}>COD - { this.state.order.code }</Text>
                    <Text>{ this.state.order.details }</Text>
                </View>
                <Timeline
                    circleColor={Config.color.primary}
                    lineColor={Config.color.primary}
                    data={this.state.order.tracking}
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
