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
    AsyncStorage,
    TextInput
} from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from "react-native-flash-message";
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { connect } from 'react-redux';

// UI
import ButtonPrimary from "../../ui/ButtonPrimary";
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
            },
            selectedIndexTab: 0,
            cartObservations: '',
            deliveryHome: false, 
            deliveryPrice: 0
        }
    }

    componentDidMount(){
        let apiURL = `${Config.API}/api/v2`;
        // Obtener sucursales activas
        fetch(`${apiURL}/get_params/sucursal_active`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                error: {
                    value: !res.open,
                    message: res.message
                }
            });
        });

        // Obtener costo de envío
        fetch(`${apiURL}/get_params/delivery.costo_envio`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                deliveryPrice: res.value ? res.value : 0,
                deliveryHome: true
            });
        });
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

    handlebillValue = (value) => {
        if(this.props.user.businessName && this.props.user.nit){
            this.setState({billValue: value})
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
            this.props.setCartObservations(this.state.cartObservations);
            if(this.state.deliveryHome){
                this.props.navigation.navigate('LocationsList', { cartSuccess: true });
            }else{
                this.props.navigation.navigate('BranchOfficeList');
            }
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

    handleSelectedIndexTab = (index) => {
        this.setState({
            selectedIndexTab: index,
            deliveryHome: index == 0 ? 1 : 0
        });
    }

    render(){
        return (
            <View style={ style.container }>
                <View style={{ width: '95%', marginTop: 10 }}>
                    <SegmentedControlTab
                        values={['Entrega a domicilio', 'Recoger en restaurante']}
                        selectedIndex={this.state.selectedIndexTab}
                        onTabPress={ this.handleSelectedIndexTab  }
                        tabStyle={{ borderColor: Config.color.primary }}
                        tabTextStyle={{ color: Config.color.primary }}
                        activeTabStyle={{ backgroundColor: Config.color.primary }}
                    />
                </View>
                <ScrollView style={{ marginTop: 10, marginBottom: 180}}>
                    {
                        this.state.cart.map(item => 
                            <View style={{ flexDirection: 'row', width: screenWidth, height: 100, backgroundColor: 'white', marginBottom: 3}}>
                                <View style={{ width: '35%', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={{ width: '100%', height: 100 }}
                                        source={{ uri: `${apiStorage}${item.image}` }}
                                        resizeMode="cover"
                                    />
                                </View>
                                <View style={{ flexDirection: 'column', width: '50%', marginHorizontal: 10 }}>
                                    <Text style={{ fontSize:16, fontWeight: 'bold', height: '25%' }} numberOfLines={1}>{item.name}</Text>
                                    <Text style={{ fontSize:13, height: '20%' }}>{parseFloat(item.subtotal).toFixed(2)} Bs.</Text>
                                    <View style={{ height: '20%' }}>
                                        <Text style={{ fontSize:13 }} numberOfLines={1}>
                                        {
                                            item.extras.map(extra => `${extra.count} ${extra.name}, `)
                                        }
                                        </Text>
                                    </View>
                                    <View style={{ height: '35%' }}>
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
                   {    this.state.cart.length > 0 &&
                       <View>
                            <View style={[style.footerItem, { backgroundColor: '#fff' }]}>
                                <View style={{ width: '50%', margin: 10 }}>
                                    <Text style={{ fontSize: 15 }}> Costo de envío </Text>
                                </View>
                                <View style={{ width: '50%', marginHorizontal: 20, marginVertical: 10, flex: 1, flexDirection: 'row-reverse' }}>
                                    <Text style={{ fontSize: 18 }}>Bs. { this.state.deliveryHome ? parseFloat(this.state.deliveryPrice).toFixed(2) : '0.00' } </Text>
                                </View>
                            </View>
                            <View style={[style.footerItem, { backgroundColor: '#fff' }]}>
                                <View style={{ width: '50%', margin: 10 }}>
                                    <Text style={{ fontSize: 15 }}> TOTAL </Text>
                                </View>
                                <View style={{ width: '50%', marginHorizontal: 20, marginVertical: 10, flex: 1, flexDirection: 'row-reverse' }}>
                                    <Text style={{ fontSize: 22 }}>Bs. { (this.state.cart.reduce((amount, item) => {
                                        return parseFloat(amount) + parseFloat(item.subtotal);
                                    }, 0) + (this.state.deliveryHome ? parseFloat(this.state.deliveryPrice) : 0)).toFixed(2) }
                                    </Text>
                                </View>
                            </View>
                       </View>
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
                    {   this.state.error.value &&
                        <Card title='Aviso importante!' backgroundColor='#E24141'>
                            { this.state.error.message }
                        </Card>
                    }
                    <Separator height={30} />
                </ScrollView>
                <View style={style.footer}>
                    <View style={style.footerItem}>
                        <TextInput
                            style={{ width: '100%', height: 70, borderColor: '#F2F2F2', borderWidth: 1 }}
                            maxLength={150}
                            placeholder="Ej: sin aceitunas..."
                            multiline={true}
                            onChangeText={ (value) => this.setState({cartObservations: value}) }
                        />
                    </View>
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
                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <ButtonPrimary
                                onPress={this.onPressAccept}
                                disabled={this.state.cart.length == 0 || this.state.error.value ? true : false}
                                icon='ios-checkmark-circle-outline'
                            >
                                Realizar pedido
                            </ButtonPrimary>
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
        setCartObservations : (value) => dispatch({
            type: 'SET_CART_OBSERVATIONS',
            payload: value
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
