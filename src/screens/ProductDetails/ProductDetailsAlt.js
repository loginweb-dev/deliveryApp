import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, Share, AsyncStorage } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { showMessage } from "react-native-flash-message";
import RadioForm from 'react-native-simple-radio-button';
import { connect } from 'react-redux';

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";

// UI
import Divider from "../../ui/Divider";
import ButtonSecondary from "../../ui/ButtonSecondary";
import BtnCircle from '../../ui/BtnCircle';

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.product.id,
            name: this.props.route.params.product.name,
            details: this.props.route.params.product.details,
            price: this.props.route.params.product.price,
            image: this.props.route.params.product.image,
            counProduct: 1,
            totalPrice: this.props.route.params.product.price,
            // Productos similares
            similarProducts: this.props.route.params.product.similar,
            similarProductsRadios: [],
        }
    }

    componentDidMount(){
        let products = this.state.similarProducts;
        // Generar radio buttons
        let radioButtons = [];
        products.map((item, index) => {
            radioButtons.push({
                value: item.id, label: item.typeName
            });
        });

        this.setState({
            similarProducts: products,
            similarProductsRadios: radioButtons,
            //////////////////
            id: products[0].id,
            name: products[0].name,
            details: products[0].details,
            price: products[0].price,
            totalPrice: products[0].price,
            image: products[0].image,
        });
    }

    calculateTotal(){
        // Obtener costo total de extras
        let price = this.state.price;
        let counProduct = this.state.counProduct;

        this.setState({totalPrice: parseFloat(price)*counProduct});
    }

    handleCart(){
        // Generar index aleatorio
        let index = this.state.id+'_'+Math.floor(Math.random() * 1001);

        this.props.addItemToCart({
            index,
            id: this.state.id,
            name: this.state.name, 
            price: this.state.price,
            image: this.state.image,
            count: this.state.counProduct,
            subtotal: this.state.totalPrice,
            extras: []
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
     
    handleOnPressRadios = (id) => {
        
        let product = this.state.similarProducts.find(item => item.id == id);
        this.setState({
            id: product.id,
            name: product.name,
            details: product.details,
            price: product.price,
            image: product.image,
            totalPrice: product.price * this.state.counProduct
        });
    }

    render(){
        return (
        <View style={ style.container }>
            <BackgroundTop
                title=''
                subtitle=''
                image={this.state.image}
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
                <Divider color={Config.color.textMuted} size={1} width={screenWidth} />
                <View style={{ margin: 20, alignItems: 'center' }}>
                    <RadioForm
                        radio_props={this.state.similarProductsRadios}
                        initial={0}
                        onPress={ this.handleOnPressRadios }
                        formHorizontal={true}
                        labelStyle={{ paddingHorizontal: 20, color: Config.color.primary }}
                        buttonColor={ Config.color.primary }
                        selectedButtonColor={ Config.color.primary }
                    />
                </View>
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
                    <ButtonSecondary onPress={()=>this.handleCart()} icon='ios-cart' >
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
        marginVertical: 10
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    headerItem: {
        width: '50%',
        fontSize: 20,
        fontWeight: 'bold'
    },
    detailsText: {
        textAlign: 'justify',
        margin: 15,
        fontSize: 15,
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
