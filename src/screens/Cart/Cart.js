import React, { Component } from 'react';
import {
    SafeAreaView,
    Dimensions,
    View,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    Switch,
    AsyncStorage
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';

// UI
import ButtonSecondary from "../../ui/ButtonSecondary";
import Separator from '../../ui/Separator';
import Card from '../../ui/Card';

// Configurations
import { Config } from '../../config/config.js';
import { MainStyle } from '../../config/styles.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const apiStorage = Config.debug ? '' : `${Config.API}/storage/`;

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            cart: this.props.cart,
            amountCart: 0,
            billValue: this.props.user.nit ? true : false,
            error: {
                value: false,
                message: ''
            }
        }
    }

    componentDidMount(){
        let apiURL = `${Config.API}/api/v2`;
        fetch(`${apiURL}/get_params/sucursal_active`)
        .then(res => res.json())
        .then(res => {
            if(!res.error){
                this.setState({
                    error: {
                        value: !res.open,
                        message: res.message
                    }
                });
            }
        })
    }

    handleItem(id, value){
        let cart = this.state.cart;
        cart.forEach(function(part, index) {
            if(this[index].index == id){
                let subtotal = parseFloat(this[index].subtotal) / this[index].count;
                this[index].count = value;
                this[index].subtotal = subtotal * this[index].count;
            }
        }, cart);
        this.setState({cart});
        AsyncStorage.setItem('UserShoppingcart', JSON.stringify(cart), () => {
            this.props.updateCart(cart);
        });
    }

    deleteItem(index){
        Alert.alert(
            'Quitar producto?',
            `Eliminar el producto de tu carrito de compra`,
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'OK',
                    onPress: () => {
                        this.props.removeItemToCart(index);
                        showMessage({
                            message: 'Producto eliminado',
                            description: 'Se eliminó el producto del carrito.',
                            type: 'info', icon: 'info',
                        });
                        setTimeout(() => {
                            this.setState({cart: this.props.cart});
                            AsyncStorage.setItem('UserShoppingcart', JSON.stringify(this.props.cart), () => {
                                this.props.updateCart(this.props.cart);
                            });
                        }, 0);
                    }
                },
            ],
            { cancelable: false }
        )
    }

    handlebillValue = () => {
        if(this.props.user.businessName && this.props.user.nit){
            this.setState({billValue: !this.state.billValue})
        }else{
            Alert.alert(
                'Completa tu información',
                `Debes proporcionar una razón social y un NIT para generar tu factura.`,
                [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.navigate('Profile', { kickUpdate: true });
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }

    onPressAccept = () => {
        if(this.props.user.numberPhone){
            this.props.setBillValue(this.state.billValue);
            this.props.navigation.navigate('LocationsList', { cartSuccess: true });
        }else{
            Alert.alert(
                'Completa tu información',
                `Debes proporcionar un número de contacto para nuestro repartidor.`,
                [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.navigate('Profile', { kickUpdate: true });
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }

    render(){
        return (
            <View style={ style.container }>
                <ScrollView style={{ marginTop: 10, marginBottom: 30}}>
                    {
                        this.state.cart.map(item => 
                            <View style={{ flexDirection: 'row', width: screenWidth-10, height: 90, backgroundColor: 'white', marginBottom: 3}}>
                                <View style={{ width: '25%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ width: '100%', height: 80 }}
                                        source={{ uri: `${apiStorage}${item.image}` }}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ flexDirection: 'column', width: '60%', marginHorizontal: 10 }}>
                                    <Text style={{ fontSize:16, fontWeight: 'bold', height: '20%' }} numberOfLines={1}>{item.name}</Text>
                                    <Text style={{ fontSize:13, height: '20%' }}>{parseFloat(item.subtotal).toFixed(2)} Bs.</Text>
                                    <View style={{ height: '20%' }}>
                                        <Text style={{ fontSize:13 }} numberOfLines={1}>
                                        {
                                            item.extras.map(extra => `${extra.count} ${extra.name}, `)
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
                                            totalHeight={30}
                                            totalWidth={90}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => this.deleteItem(item.index)}
                                    >
                                        <Icon name="md-trash" size={30} color={Config.color.primary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    }
                    {/* Si el carrito está vacío se muestra el logo de cart-empty */}
                    { this.state.cart.length == 0 &&
                        <View style={{ alignItems: 'center', marginTop: 100 }}>
                            <Image
                                style={{ width: 100, height: 100 }}
                                source={ require('../../assets/images/cart-empty.png') }
                            />
                            <Text style={[MainStyle.h2, MainStyle.textMuted]}>Carrito vacío</Text>
                        </View>
                    }
                    <Separator height={50} />
                </ScrollView>
                <View style={style.footer}>
                    {   this.state.error.value &&
                        <Card title='Aviso importante!' backgroundColor='#E24141'>
                            { this.state.error.message }
                        </Card>
                    }
                    <View style={style.footerItem}>
                        <View style={{ width: '50%', marginHorizontal: 20, marginVertical: 10 }}>
                            <Text style={{ fontSize: 18 }}> Factura </Text>
                        </View>
                        <View style={{ width: '50%', marginHorizontal: 20, marginVertical: 10, flex: 1, flexDirection: 'row-reverse' }}>
                            <Switch
                                onValueChange={this.handlebillValue}
                                value={this.state.billValue}
                            />
                        </View>
                    </View>
                    <View style={style.footerItem}>
                        <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 22 }}>Bs. { this.state.cart.reduce((amount, item)=> {
                                return parseFloat(amount) + parseFloat(item.subtotal);
                            }, 0).toFixed(2) }
                            </Text>
                        </View>
                        <View style={{ width: '65%', alignItems: 'center', justifyContent: 'center' }}>
                            <ButtonSecondary
                                onPress={this.onPressAccept}
                                disabled={this.state.cart.length == 0 || this.state.error.value ? true : false}
                                icon='ios-checkmark-circle-outline'
                            >
                                Realizar pedido
                            </ButtonSecondary>
                        </View>
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
        backgroundColor: Config.color.background
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
    },
    footerItem: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
    }
});

// export default ProductDetails;

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user,
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
        setBillValue : (value) => dispatch({
            type: 'SET_BILL_VALUE',
            payload: value
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
