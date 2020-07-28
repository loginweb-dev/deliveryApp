import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, Share, AsyncStorage, CheckBox } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { showMessage } from "react-native-flash-message";
import RadioForm from 'react-native-simple-radio-button';
import { connect } from 'react-redux';

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";
import ItemExtra from "../../components/ItemExtra/ItemExtraAlt";

// UI
import Divider from "../../ui/Divider";
import Separator from '../../ui/Separator';
import ButtonSecondary from "../../ui/ButtonSecondary";
import BtnCircle from '../../ui/BtnCircle';

// Configurations
import { Config, reziseImage } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

class ProductDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.product.id,
            name: this.props.route.params.product.name,
            details: this.props.route.params.product.details,
            price: this.props.route.params.product.price,
            oldPrice: this.props.route.params.product.oldPrice,
            image: this.props.route.params.product.image,
            slug: this.props.route.params.product.slug,
            priceExtras: 0,
            counProduct: 1,
            totalPrice : this.props.route.params.product.price,
            extrasList: [],
            // Productos similares
            similarProducts: this.props.route.params.product.similar,
            similarProductsRadios: []
        }
    }

    componentDidMount(){
        let products = this.state.similarProducts;
        // Generar radio buttons
        let radioButtons = [];
        products.map((item, index) => {
            radioButtons.push({
                value: item.id, label: item.name
            });
        });

        // Reset CheckBoxs
        let extras = [];
        this.props.route.params.product.similar[0].extras.map((item) => {
            extras.push({...item, ckecked: false});
        });
        this.setState({
            extrasList: extras
        });

        // Si existen productos similares seleccionar el primero
        if(radioButtons.length > 0){
            this.setState({
                similarProductsRadios: radioButtons,
                id: products[0].id,
                name: products[0].name,
                details: products[0].details,
                price: products[0].price,
                oldPrice: products[0].oldPrice,
                totalPrice: products[0].price,
                image: products[0].image
            });
        }
    }

    handleCheckbox(id){
        // Actualizar valor de chechbox
        let extras = this.state.extrasList;
        extras.forEach(function(part, index) {
            if(this[index].id == id){
                this[index].ckecked = !this[index].ckecked;
                this[index].quantity = 1;
            }
        }, extras);
        this.setState({ extras: extras }, this.calculateTotal);
    }
    handleCheckboxQuantity(id, quantity){
        // Actualizar cantidad de chechbox
        let extras = this.state.extrasList;
        extras.forEach(function(part, index) {
            if(this[index].id == id){
                this[index].quantity = quantity;
                this[index].ckecked = quantity > 0 ? true : false;
            }
        }, extras);
        this.setState({ extras: extras }, this.calculateTotal);
    }

    calculateTotal = () => {
        // Obtener costo total de extras
        let price = this.state.price;
        let extras = this.state.extrasList;
        let counProduct = this.state.counProduct;
        var totalExtras = 0;
        extras.map( item => {
            if(item.ckecked){
                totalExtras += (parseFloat(item.price)*parseFloat(item.quantity));
            }
        });

        this.setState({totalPrice: (parseFloat(price)+parseFloat(totalExtras))*counProduct});
    }

    handleCart(){
        // Generar index aleatorio
        let index = this.state.id+'_'+Math.floor(Math.random() * 1001);

        let extras = this.state.extrasList;
        let extrasSelect = [];
        extras.map( item => {
            if(item.ckecked){
                extrasSelect.push({id: item.id, name: item.name, price: item.price, count: item.quantity, total: item.price,});
            }
        });

        this.props.addItemToCart({
            index,
            id: this.state.id,
            name: this.state.name, 
            price: this.state.price,
            image: this.state.image,
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
                `Echa un vistazo a ${this.state.name} de ${Config.appName} ingresando en ${Config.API}/detalle/${this.state.slug}`,
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
            oldPrice: product.oldPrice,
            image: product.image,
            totalPrice: (product.price * this.state.counProduct) + this.state.priceExtras,
            extrasList: product.extras
        }, this.calculateTotal);

        // Reset CheckBoxs
        let extras = [];
        product.extras.map((item) => {
            extras.push({...item, quantity: 0, ckecked: false});
        });
        this.setState({
            extrasList: extras
        });
    }

    render(){
        return (
        <View style={ style.container }>
            <BackgroundTop
                title=''
                subtitle=''
                image={reziseImage(this.state.image)}
            />
            {/* Share Button */}
            <View style={{ position: 'absolute', top: 200, right: 10 }}>
                <BtnCircle
                    backgroundColor='rgba(0,0,0,0.4)'
                    color='white'
                    onPress={this.onShare}
                    icon='md-share'
                    size={3}
                />
            </View>
            {/* ============ */}
            <View style={style.section}>
                <View style={style.header}>
                    <Text style={style.headerItem}>{this.state.name}</Text>
                    <Text style={[style.headerItem, { textAlign: 'right' }]}>
                        {   this.state.oldPrice != this.state.price &&
                            <Text style={style.ItemListActionsOldPriceText} numberOfLines={1}>{this.state.oldPrice} Bs.</Text>
                        }
                        {parseFloat(this.state.totalPrice).toFixed(2)} Bs.
                    </Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={style.section}>
                    <Text numberOfLines={3} style={style.detailsText}>{this.state.details}</Text>
                </View>
                {/* Si existen productos similares se muestras los radio buttons */}
                {    this.state.similarProductsRadios.length > 1 &&
                    <View style={{ alignItems: 'center' }}>
                        <Divider color={Config.color.textMuted} size={1} width={screenWidth} />
                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                            <View style={{ margin: 20, alignItems: 'center' }}>
                                <RadioForm
                                    radio_props={this.state.similarProductsRadios}
                                    initial={0}
                                    onPress={ this.handleOnPressRadios }
                                    formHorizontal={true}
                                    labelStyle={{ paddingHorizontal: 25, color: Config.color.primary }}
                                    buttonColor={ Config.color.primary }
                                    selectedButtonColor={ Config.color.primary }
                                />
                            </View>
                        </ScrollView>
                    </View>
                }
                {   this.state.extrasList.length > 0 &&
                    <View>
                        <Divider color={Config.color.textMuted} size={1} width={screenWidth} />
                        <View style={style.section}>
                            <Text style={{fontWeight: 'bold'}}>Extras</Text>
                            <View style={{ margin: 10, width: screenWidth-20, }}>
                                {
                                    this.state.extrasList.map(item => 
                                        <ItemExtra
                                            ckecked={item.ckecked}
                                            onChange={() => this.handleCheckbox(item.id)}
                                            name={item.name}
                                            price={item.price}
                                            // onChangeQuantity={(value) => this.handleCheckboxQuantity(item.id, value)}
                                        />
                                    )
                                }
                            </View>
                        </View>
                        <Divider color={Config.color.textMuted} size={1} width={screenWidth} />
                    </View>
                }
                <Separator height={100} />
            </ScrollView>
            <View style={style.footer}>
                <View style={{ width: '40%', alignItems: 'center', justifyContent: 'center' }}>
                    <NumericInput
                        onChange={value => {this.setState({ counProduct: value }, this.calculateTotal)}}
                        value={this.state.counProduct}
                        iconStyle={{ color: 'white', fontSize: 30, fontWeight: 'bold' }} 
                        rightButtonBackgroundColor={Config.color.primary}
                        leftButtonBackgroundColor={Config.color.primary}
                        minValue={1}
                        rounded={true}
                        totalHeight={35}
                        // editable={true}
                    />
                </View>
                <View style={{ width: '60%', alignItems: 'center', justifyContent: 'center' }}>
                    <ButtonSecondary onPress={()=>this.handleCart()} icon='ios-cart'>
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
        marginTop: 10
    },
    header: {
        flexDirection: 'row',
        marginHorizontal: 10,
    },
    headerItem: {
        width: '50%',
        fontSize: 18,
        fontWeight: 'bold'
    },
    ItemListActionsOldPriceText: {
        fontSize:12,
        fontStyle: 'italic',
        textDecorationLine: 'line-through',
        color: 'red'
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