import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

// UI
import ButtonPrimary from "../../ui/ButtonPrimary";
import ButtonSecondary from "../../ui/ButtonSecondary";

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class DeliverySuccess extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.updateCart([]);
    }

    render(){
        return (
            <View style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ style.header }>
                        <Icon name="ios-checkmark-circle-outline" size={100} color={Config.color.primary} />
                        <Text style={{ fontSize: 30 }}>Gracias!</Text>
                        <Text style={{ fontSize: 20 }}>Tu pedido ha sido recibido</Text>
                    </View>
                    <View style={ style.item }>
                        <View style={ style.colum_left }>
                            <Text style={{ fontSize: 20 }}>Código de orden</Text>
                        </View>
                        <View style={ style.colum_right }>
                            <Text style={{ fontSize: 20 }}>00001</Text>
                        </View>
                    </View>
                    <View style={ style.item }>
                        <View style={ style.colum_left }>
                            <Text style={{ fontSize: 20 }}>Monto</Text>
                        </View>
                        <View style={ style.colum_right }>
                            <Text style={{ fontSize: 20 }}>Bs. 100</Text>
                        </View>
                    </View>
                    <View style={ style.item_details }>
                        <View style={ style.colum_left }>
                            <Text style={{ fontSize: 20 }}>Detalles</Text>
                        </View>
                        <View>
                            <Text>Producto 1, producto 2,producto 3</Text>
                        </View>
                    </View>
                    <View style={ style.footer }>
                        <ButtonPrimary onPress={() => this.props.navigation.navigate('OrderDetails')} icon='md-list-box'>
                            Ver mi orden
                        </ButtonPrimary>
                        <ButtonSecondary onPress={() => this.props.navigation.navigate(Config.appName)} icon='md-home'>
                            Volver al inicio
                        </ButtonSecondary>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        padding: 30
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 3
    },
    item_details: {
        flex: 1,
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
    footer: {
        padding: 20
    }
});


const mapDispatchToProps = (dispatch) => {
    return {
        updateCart : (newCart) => dispatch({
            type: 'RELOAD_CART',
            payload: newCart
        }),
    }
}


export default connect(null, mapDispatchToProps)(DeliverySuccess);
