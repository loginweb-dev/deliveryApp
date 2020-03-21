import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";
import ItemExtra from "../../components/ItemExtra/ItemExtra";

// UI
import Divider from "../../ui/Divider";

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
            heightBanner: 200,
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

    animation = (event)=> {
        let value = event.nativeEvent.contentOffset.y;
        if(value>10){
            this.setState({
                heightBanner: 0
            });
        }else{
            this.setState({
                heightBanner: 200
            });
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

        showMessage({
            message: 'Producto agregado',
            description: 'Se agregó el producto al carrito',
            type: 'success',
            icon: 'success',
        });
    }

    render(){
        return (
        <View style={ style.container }>
            <BackgroundTop
                title=''
                subtitle=''
                image={this.state.background}
                height={this.state.heightBanner}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScrollEndDrag={this.animation}
            >
            <View style={style.section}>
                <View style={style.header}>
                    <Text style={style.headerItem}>{this.state.name}</Text>
                    <Text style={[style.headerItem, { textAlign: 'right' }]}>{parseFloat(this.state.totalPrice).toFixed(2)} Bs.</Text>
                </View>
                <Text numberOfLines={3} style={style.detailsText}>{this.state.details}</Text>
            </View>
            <Divider color='#AFADAD' size={1} width={screenWidth-20} />
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
            <Divider color='#AFADAD' size={1} width={screenWidth-20} />
            <View style={{ height:50 }}></View>
            </ScrollView>
            <View style={style.footer}>
                <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                    <NumericInput
                        onChange={value => {this.setState({ counProduct: value });this.calculateTotal()}}
                        value={this.state.counProduct}
                        iconStyle={{ color: 'white', fontSize: 30, fontWeight: 'bold' }} 
                        rightButtonBackgroundColor={Config.color.primary}
                        leftButtonBackgroundColor={Config.color.primary}
                        minValue={1}
                        rounded={true}
                    />
                </View>
                <View style={{ width: '70%', alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{ backgroundColor: Config.color.secondary, padding: 10, paddingLeft: 40, paddingRight: 40 }}
                        onPress={()=>this.handleCart()}
                    >
                        <Text style={{ color: 'white', fontSize:20 }}>Añadir al carro</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center'
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
        margin: 10
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
