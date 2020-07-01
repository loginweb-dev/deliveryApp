import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';

// Configurations
import { Config, reziseImage } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const apiStorage = Config.debug ? '' : `${Config.API}/storage/`;

const ItemProduct = (props) => {
    return(
        <View style={{ flex: 1 }}>
            <TouchableOpacity
                onPress={props.onPress}
            >
                <View style={style.ItemList}>
                    <View style={{flex: 1, flexDirection: 'row' }}>
                        <View style={style.ItemListImage} >
                            <Image
                                style={{width: '100%', height: '100%'}}
                                source={{ uri: `${apiStorage}${reziseImage(props.image, 'small')}` }}
                                resizeMode="cover"
                            />
                        </View>
                        <View style={style.ItemListDetail}>
                            <Text style={style.ItemListDetailTitle} numberOfLines={1}>{props.name}</Text>
                            <Text style={style.ItemListDetailSubtitle} numberOfLines={2}>{props.details}</Text>
                        </View>
                        <View style={style.ItemListActions}>
                            { props.onPressAdd &&
                                <View style={style.ItemListActionsPrice}>
                                    <TouchableOpacity
                                        style={style.btnAdd}
                                        onPress={props.onPressAdd}
                                    >
                                        <Text style={style.btnAddText}>Añadir <Icon name="shopping-cart" size={18} /></Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={style.ItemListActionsPrice}>
                                <Text style={style.ItemListActionsPriceText} numberOfLines={1}>{props.price} Bs.</Text>
                                {   props.oldPrice != props.price &&
                                    <Text style={style.ItemListActionsOldPriceText} numberOfLines={1}>{props.oldPrice} Bs.</Text>
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const style = StyleSheet.create({
    ItemList: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 5,
        width: screenWidth,
        marginTop: 5,
        height: 80
    },
    ItemListImage: {
        width: '20%',
    },
    ItemListDetail: {
        flex: 1,
        flexDirection: 'column',
        width: '50%',
        paddingLeft: 10,
        paddingRight: 5
    },
    ItemListDetailTitle: {
        height: '40%',
        fontSize: 16,
        // color: Config.color.textMuted,
        fontWeight: 'bold'
    },
    ItemListDetailSubtitle: {
        height: '60%',
        fontSize: 14,
        color: Config.color.textMuted,
    },
    ItemListActions: {
        width: '25%',
    },
    ItemListActionsButton: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ItemListActionsPrice: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnAdd: {
        borderColor: Config.color.primary,
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        padding: 2
    },
    btnAddText: {
        color: Config.color.primary,
    },
    ItemListActionsPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ItemListActionsOldPriceText: {
        fontSize: 12,
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
        color: 'red'
    }
});

export default ItemProduct;