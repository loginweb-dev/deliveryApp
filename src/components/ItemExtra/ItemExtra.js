import React from 'react';
import { View, Text, CheckBox } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { showMessage } from "react-native-flash-message";

// UI
import InvisibleBox from '../../ui/InvisibleBox';

// Configurations
import { Config } from '../../config/config.js';

const ItemExtra = props => {
    const showTips = () => {
        showMessage({
            message: 'Sugerencia',
            description: 'Incrementa la cantidad del extra para seleccionarlo.',
            type: 'info', icon: 'info',
        });
    }
    return (
        <View style={{flex: 1, flexDirection: 'row' }}>
            <View style={{ width: '10%' }}>
                {/* Para evitar que active el check al presionarlo agregamos una capa invisible encima */}
                <InvisibleBox onPress={showTips} />
                <CheckBox
                    value={props.ckecked}
                    onChange={props.onChange}
                />
            </View>
            <View style={{ width: '50%', padding: 5 }}>
                <Text style={{ color: '#8C8C8C' }}>{props.name}</Text>
            </View>
            <View style={{ width: '20%', padding: 5 }}>
                <NumericInput
                    onChange={props.onChangeQuantity}
                    value={0}
                    iconStyle={{ color: 'white', fontSize: 12 }} 
                    rightButtonBackgroundColor={Config.color.primary}
                    leftButtonBackgroundColor={Config.color.primary}
                    minValue={0}
                    rounded={true}
                    totalHeight={25}
                    totalWidth={55}
                    editable={false}
                />
            </View>
            <View style={{ width: '20%', padding: 5 }}>
                <Text style={{ color: '#8C8C8C' }}>{props.price} Bs.</Text>
            </View>
        </View>
    );
}

export default  ItemExtra;