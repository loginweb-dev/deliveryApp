import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, ImageBackground } from "react-native";

// Configurations
import { Config, reziseImage } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const apiStorage = Config.debug ? '' : `${Config.API}/storage/`;

const ItemProductAlt = (props) => {
    return(
        <View>
            <TouchableOpacity
                onPress={props.onPress}
                style={{ padding: 5, width: screenWidth/2 }}
            >
                <ImageBackground source={ { uri: `${apiStorage}${reziseImage(props.image, 'small')}` } } style={ style.itemListImage } />
                <View style={ style.itemList }>
                    <Text style={style.itemListDetailTitle} numberOfLines={1}>{props.name}</Text>
                    <Text style={style.itemListDetailSubtitle} numberOfLines={2}>{props.details}</Text>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Text style={style.itemListActionsPriceText} numberOfLines={1}>{props.price} Bs.</Text>
                        {   props.oldPrice != props.price &&
                            <Text style={style.ItemListActionsOldPriceText} numberOfLines={1}>{props.oldPrice} Bs.</Text>
                        }
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
    },
    ItemListActionsOldPriceText: {
        marginVertical: 5,
        fontSize:12,
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
        color: 'red'
    }
});

export default ItemProductAlt;