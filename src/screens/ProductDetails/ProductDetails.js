import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, Share, AsyncStorage } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";
import ItemExtra from "../../components/ItemExtra/ItemExtra";

// UI
import Divider from "../../ui/Divider";
import ButtonSecondary from "../../ui/ButtonSecondary";
import BtnCircle from '../../ui/BtnCircle';

// Configurations
import { Config } from '../../config/config.js';

const Extras = [
    {
        'id': 1,
        'name': 'Papas',
        'price': '5.00',
        'ckecked': false
    },
    {
        'id': 2,
        'name': 'Tocino',
        'price': '5.00',
        'ckecked': false
    },
    {
        'id': 3,
        'name': 'Salsa',
        'price': '3.00',
        'ckecked': false
    },
    {
        'id': 4,
        'name': 'Huevo',
        'price': '2.00',
        'ckecked': false
    },
];


const screenWidth = Math.round(Dimensions.get('window').width);

class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.product.id,
            name: this.props.route.params.product.name,
            details: this.props.route.params.product.details,
            price: this.props.route.params.product.price,
            priceExtras: 0,
            counProduct: 1,
            totalPrice : this.props.route.params.product.price,
            extras: Extras,
            background : this.props.route.params.product.image,
        }
    }

    handleCheckbox(id){
        // Actualizar valor de chechbox
        let extras = this.state.extras;
        extras.forEach(function(part, index) {
            if(this[index].id == id){
                this[index].ckecked = !this[index].ckecked;
            }
        }, extras);
        this.setState({ extras: extras });
        this.calculateTotal();
    }

    calculateTotal(){
        // Obtener costo total de extras
        let price = this.state.price;
        let extras = this.state.extras;
        let counProduct = this.state.counProduct;
        var totalExtras = 0;
        extras.map( item => {
            if(item.ckecked){
                totalExtras += parseFloat(item.price);
            }
        });

        this.setState({totalPrice: (parseFloat(price)+parseFloat(totalExtras))*counProduct});
    }

    handleCart(){
        // Generar index aleatorio
        let index = this.state.id+'_'+Math.floor(Math.random() * 1001);

        let extras = this.state.extras;
        let extrasSelect = [];
        extras.map( item => {
            if(item.ckecked){
                extrasSelect.push({id: item.id, name: item.name, price: item.price, count: 1, total: item.price,});
            }
        });

        this.props.addItemToCart({
            index,
            id: this.state.id,
            name: this.state.name, 
            price: this.state.price,
            image: this.state.background,
            count: this.state.counProduct,
            subtotal: this.state.totalPrice,
            extras: extrasSelect
        });

        // Actualizar datos del carro de compra
        setTimeout(() => {
            AsyncStorage.setItem('UserShoppingcart', JSON.stringify(this.props.cart));
        }, 0);

        showMessage({
            message: 'Producto agregado',
            description: 'Se agregó el producto al carrito.',
            type: 'success',
            icon: 'success',
        });
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                'React Native | A framework for building native apps using React',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                // shared with activity type of result.activityType
                } else {
                // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
          alert(error.message);
        }
    };

    render(){
        return (
        <View style={ style.container }>
            <BackgroundTop
                title=''
                subtitle=''
                image={this.state.background}
            />
            {/* Share Button */}
            <View style={{ position: 'absolute', top: 200, right: 15 }}>
                <BtnCircle
                    backgroundColor='rgba(0,0,0,0.4)'
                    color='white'
                    onPress={this.onShare}
                    icon='md-share'
                    size={1}
                />
            </View>
            {/* ============ */}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={style.section}>
                    <View style={style.header}>
                        <Text style={style.headerItem}>{this.state.name}</Text>
                        <Text style={[style.headerItem, { textAlign: 'right' }]}>{parseFloat(this.state.totalPrice).toFixed(2)} Bs.</Text>
                    </View>
                    <Text numberOfLines={3} style={style.detailsText}>{this.state.details}</Text>
                </View>
                <Divider color={Config.color.textMuted} size={1} width={screenWidth-20} />
                <View style={style.section}>
                    <View style={style.header}>
                        <Text style={style.headerItem}>Extras</Text>
                    </View>
                    <View style={{ margin: 10, width: screenWidth-20, }}>
                        {
                            this.state.extras.map(item => 
                                <ItemExtra
                                    ckecked={item.ckecked}
                                    onChange={() => this.handleCheckbox(item.id)}
                                    name={item.name}
                                    price={item.price}
                                />
                            )
                        }
                    </View>
                </View>
                <Divider color={Config.color.textMuted} size={1} width={screenWidth-20} />
                <View style={{ height:80 }}></View>
            </ScrollView>
            <View style={style.footer}>
                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <NumericInput
                        onChange={value => {this.setState({ counProduct: value });this.calculateTotal()}}
                        value={this.state.counProduct}
                        iconStyle={{ color: 'white', fontSize: 30, fontWeight: 'bold' }} 
                        rightButtonBackgroundColor={Config.color.primary}
                        leftButtonBackgroundColor={Config.color.primary}
                        minValue={1}
                        rounded={true}
                        totalHeight={35}
                    />
                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <ButtonSecondary onPress={()=>this.handleCart()}>
                        Añadir
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
        justifyContent: 'center',
        backgroundColor: Config.color.background
    },
    section: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        width: screenWidth-20
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth-20,
    },
    headerItem: {
        width: '50%',
        fontSize: 18,
        fontWeight: 'bold'
    },
    detailsText: {
        textAlign: 'justify',
        margin: 10,
        color: '#8C8C8C'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        width: screenWidth,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
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
        addItemToCart : (item) => dispatch({
            type: 'ADD_TO_CART',
            payload: item
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
