import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

// UI
import Badge from "../../ui/Badge";

// Configuration
import { Config } from '../../config/config';

const screenWidth = Math.round(Dimensions.get('window').width);

const OrderItem = props => {
    return (
        <View style={ style.item }>
            <View style={ style.colum_left }>
                <Text style={{ fontSize: 20 }}>COD: { props.cod }</Text>
                <Text style={{ color: '#aeaeae' }}>{ props.details }</Text>
                <Text style={{ color: '#000' }}>{ props.date }</Text>
            </View>
            <View style={style.colum_right}>
                <Badge color={ Config.color.primary } >Entregado</Badge>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 3
    },
    colum_left: {
        width: '70%'
    },
    colum_right: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%'
    },
});

export default  OrderItem;