import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

const ItemProductAlt = (props) => {
    return(
        <View>
            <TouchableOpacity
                onPress={props.onPress}
                style={{ padding: 5, width: screenWidth/2 }}
            >
                <ImageBackground source={ { uri: props.image } } style={ style.itemListImage } />
                <View style={ style.itemList }>
                    <Text style={style.itemListDetailTitle} numberOfLines={1}>{props.name}</Text>
                    <Text style={style.itemListDetailSubtitle} numberOfLines={2}>{props.details}</Text>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Text style={style.itemListActionsPriceText} numberOfLines={1}>{props.price} <Text style={{ fontSize:12 }}>Bs.</Text></Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    itemList: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10
    },
    itemListImage: {
        width: '100%',
        height: 120
    },
    itemListDetail: {
        flex: 1,
        flexDirection: 'column',
        width: '50%',
        paddingLeft: 10,
        paddingRight: 5
    },
    itemListDetailTitle: {
        // height: '40%',
        fontSize: 16,
        // color: Config.color.textMuted,
        fontWeight: 'bold'
    },
    itemListDetailSubtitle: {
        // height: '60%',
        fontSize: 14,
        color: Config.color.textMuted,
    },
    itemListActions: {
        width: '25%',
    },
    itemListActionsButton: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemListActionsPrice: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAdd: {
        borderColor: Config.color.primary,
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 5,
        padding: 2
    },
    btnAddText: {
        color: Config.color.primary,
        fontSize: 13
    },
    itemListActionsPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default ItemProductAlt;