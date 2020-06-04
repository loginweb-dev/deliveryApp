import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';


// UI
import Divider from "../../ui/Divider";
import ButtonSecondary from "../../ui/ButtonSecondary";

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: this.props.cart,
            amountCart : 0
        }
    }

    handleItem(id, value){
        let cart = this.state.cart;
        cart.forEach(function(part, index) {
            if(this[index].index == id){
                let subtotal = this[index].subtotal / this[index].count;
                this[index].count = value;
                this[index].subtotal = subtotal * this[index].count;
            }
        }, cart);
        this.setState({cart});
        this.props.updateCart(cart);
    }

    deleteItem(index){
        this.props.removeItemToCart(index);
        showMessage({
            message: 'Producto eliminado',
            description: 'Se eliminó el producto del carrito',
            type: 'info',
            icon: 'info',
        });
        setTimeout(()=>this.setState({cart: this.props.cart}), 0);
    }

    onPressAccept(){
        this.props.navigation.navigate('LocationsList', { cartSuccess: true });
    }

    render(){
        return (
            <View style={ style.container }>
                <ScrollView style={{ marginTop: 10, marginBottom: 30}}>
                    <View>
                    {
                        this.state.cart.map(item => 
                            <View style={{ flexDirection: 'row', width: screenWidth-10, height: 90, backgroundColor: 'white', marginBottom: 3}}>
                                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ width: '100%', height: 80 }}
                                        source={{ uri: item.image }}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ flexDirection: 'column', width: '60%', marginHorizontal: 10 }}>
                                    <Text style={{ fontSize:16, fontWeight: 'bold', height: '20%' }} numberOfLines={1}>{item.name}</Text>
                                    <Text style={{ fontSize:13, height: '20%' }}>{parseFloat(item.subtotal).toFixed(2)} Bs.</Text>
                                    <View style={{ height: '20%' }}>
                                        <Text style={{ fontSize:13 }} numberOfLines={1}>
                                        {
                                            item.extras.map(extra => `${extra.name}, `)
                                        }
                                        </Text>
                                    </View>
                                    <View style={{ height: '40%' }}>
                                        <NumericInput
                                            onChange={value => {this.handleItem(item.index, value)}}
                                            value={item.count}
                                            iconStyle={{ color: 'white', fontSize: 20, fontWeight: 'bold' }} 
                                            rightButtonBackgroundColor={Config.color.primary}
                                            leftButtonBackgroundColor={Config.color.primary}
                                            minValue={1}
                                            rounded={true}
                                            totalHeight={25}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.deleteItem(item.index)}
                                    >
                                        <Icon name="trash" size={30} color={Config.color.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    </View>
                    {/* Si el carrito está vacío se muestra el logo de cart-empty */}
                    { this.state.cart.length == 0 &&
                        <View style={{ alignItems: 'center', marginTop: 100 }}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={ require('../../assets/images/cart-empty.png') }
                            />
                            <Text style={{ marginTop: 20, fontSize: 30, color: '#aeaeae' }}>Carrito vacío</Text>
                        </View>
                    }
                </ScrollView>
                <View style={style.footer}>
                    <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25 }}>Bs. { this.state.cart.reduce((amount, item)=> {
                            return parseFloat(amount) + parseFloat(item.subtotal);
                        }, 0).toFixed(2) }
                        </Text>
                    </View>
                    <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                        <ButtonSecondary
                            onPress={()=>this.onPressAccept()}
                            disabled={this.state.cart.length == 0 ? true : false}
                        >
                            Realizar pedido
                        </ButtonSecondary>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        // margin: 5,
        padding: 10,
        backgroundColor: 'white'
    },
});

// export default ProductDetails;

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart : (newCart) => dispatch({
            type: 'RELOAD_CART',
            payload: newCart
        }),
        removeItemToCart : (index) => dispatch({
            type: 'REMOVE_FROM_CART',
            payload: index
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
