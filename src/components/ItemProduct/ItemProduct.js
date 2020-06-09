import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

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
                                source={{ uri: props.image }}
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
                                        <Text style={style.btnAddText}>Añadir <Icon name="cart-plus" size={18} /></Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={style.ItemListActionsPrice}>
                                <Text style={style.ItemListActionsPriceText} numberOfLines={1}>{props.price} <Text style={{ fontSize:12 }}>Bs.</Text></Text>
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
        borderWidth: 3,
        borderRadius: 5,
        padding: 2
    },
    btnAddText: {
        color: Config.color.primary,
        fontSize: 13
    },
    ItemListActionsPriceText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default ItemProduct;