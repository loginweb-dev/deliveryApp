import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';

// UI
import ButtonPrimary from "../../ui/ButtonPrimary";
import ButtonSecondary from "../../ui/ButtonSecondary";
import Loading from '../../ui/Loading';

// Configurations
import { Config } from '../../config/config.js';

// Registers
import { Orders } from '../../config/registers';

const screenWidth = Math.round(Dimensions.get('window').width);

class DeliverySuccess extends Component {

    constructor(props){
        super(props);
        this.state = {
            OrderDetails: Config.debug ? Orders[0] : [],
            orderError: {
                show: false,
                message: ''
            },
            loading: true
        }
    }

    componentDidMount(){
        if(this.props.user.id && !Config.debug){
            let request = {
                'id': this.props.user.id,
                'location': this.props.route.params.location,
                'cart': this.props.cart,
                'billValue': this.state.billValue
            }
            let apiURL = `${Config.API}/api/v2`;
            let header = {
                method: 'POST',
                body: JSON.stringify(request),
                headers:{
                    'Content-Type': 'application/json'
                }
            }
            fetch(`${apiURL}/order_register`, header)
            .then(res => res.json())
            .then(res => {
                // console.log(res)
                if(!res.error){
                    this.setState({OrderDetails: res.order});
                    this.props.updateCart([]);
                    AsyncStorage.setItem('UserShoppingcart', '[]');
                }else{
                    this.setState({
                        orderError: {show: true, message: res.error}
                    });
                }
                this.setState({ loading: false });
            })
            .catch(error => {
                showMessage({
                    message: 'Error!',
                    description: `Ocurrió un problema inesperado.`,
                    type: 'danger', icon: 'danger',
                });
                this.setState({
                    loading: false,
                    show: true,
                    message: 'Ocurrió un error inesperado, por favor intenta nuevamente.'
                });
            });
        }else{
            this.setState({ loading: false });
        }
    }

    render(){
        if(this.state.loading){
            return <Loading size="large" />
        }

        // Mostrar error si no se registró el pedido
        if(this.state.orderError.show){
            return (
                <View style={ style.container }>
                    <View style={ style.header }>
                        <Icon name="ios-close-circle-outline" size={100} color={Config.color.primary} />
                        <Text style={{ fontSize: 30 }}>Ocurrió un problema!</Text>
                        <Text style={{ fontSize: 20, marginTop: 20, textAlign: 'center' }}>{ this.state.orderError.message }</Text>
                    </View>
                    <View style={ style.footer }>
                        <ButtonSecondary onPress={() => this.props.navigation.navigate(Config.appName)} icon='md-home'>
                            Volver al inicio
                        </ButtonSecondary>
                    </View>
                </View>
            );
        }

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
                            <Text style={{ fontSize: 20 }}>{ this.state.OrderDetails.code }</Text>
                        </View>
                    </View>
                    <View style={ style.item }>
                        <View style={ style.colum_left }>
                            <Text style={{ fontSize: 20 }}>Monto</Text>
                        </View>
                        <View style={ style.colum_right }>
                            <Text style={{ fontSize: 20 }}>Bs. { this.state.OrderDetails.amount }</Text>
                        </View>
                    </View>
                    <View style={ style.item_details }>
                        <View style={ style.colum_left }>
                            <Text style={{ fontSize: 20 }}>Detalles</Text>
                        </View>
                        <View>
                            <Text>{ this.state.OrderDetails.details }</Text>
                        </View>
                    </View>
                    <View style={ style.footer }>
                        <ButtonPrimary onPress={() => this.props.navigation.navigate('OrderDetails', {order: this.state.OrderDetails})} icon='md-list-box'>
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
        backgroundColor: Config.color.background
    },
    header: {
        alignItems: 'center',
        margin: 30
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

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user,
        billValue: state.billValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart : (newCart) => dispatch({
            type: 'RELOAD_CART',
            payload: newCart
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DeliverySuccess);
