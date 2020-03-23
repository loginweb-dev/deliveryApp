import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';


// UI
import Divider from "../../ui/Divider";

// Configurations
import { Config } from '../../config/config.js';


const screenWidth = Math.round(Dimensions.get('window').width);

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: this.props.cart
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

    render(){
        return (
            <View style={ style.container }>
                <View style={{ margin: 10, }}>
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
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

// export default ProductDetails;

const mapStateToProps = (state) => {
    return {
        cart  : state.cart,
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
