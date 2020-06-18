import React from 'react';
import { View, Text, CheckBox } from 'react-native';

const ItemExtra = props => {
    return (
        <View style={{flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '10%' }}>
                <CheckBox
                    value={props.ckecked}
                    onChange={props.onChange}
                />
            </View>
            <View style={{ width: '70%', padding: 5 }}>
                <Text style={{ color: '#8C8C8C' }}>{props.name}</Text>
            </View>
            <View style={{ width: '20%', padding: 5 }}>
                <Text style={{ color: '#8C8C8C' }}>{props.price} Bs.</Text>
            </View>
        </View>
    );
}

export default  ItemExtra;