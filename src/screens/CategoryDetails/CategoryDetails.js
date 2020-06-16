import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, Animated, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { showMessage } from "react-native-flash-message";

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";
import ItemProduct from "../../components/ItemProduct/ItemProduct";

// UI
import Separator from '../../ui/Separator';

// Configurations
import { Config } from '../../config/config';

const screenWidth = Math.round(Dimensions.get('window').width);
const products = [
    {
        'id': 1,
        'name': 'Hamburguesa sencilla',
        'details': 'Carne, ensalada, salsa y huevo.',
        'price': '15.00',
        'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/08/abstract-1238262_960_720.jpg'
    },
    {
        'id': 2,
        'name': 'Hamburguesa doble',
        'details': 'Doble carne, ensalada, salsa y huevo.',
        'price': '20.00',
        'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238459__340.jpg'
    },
    {
        'id': 3,
        'name': 'Lomito',
        'details': 'Lomito de carne, ensalada, salsa y huevo.',
        'price': '18.00',
        'image': 'https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863__340.jpg'
    },
    {
        'id': 4,
        'name': 'Hamburguesa Completa',
        'details': 'Carne, ensalada, salsa, tocino y huevo.',
        'price': '18.00',
        'image': 'https://cdn.pixabay.com/photo/2016/03/05/19/37/appetite-1238457__340.jpg'
    }
];

const scrollY = new Animated.Value(0);
const traslateY = scrollY.interpolate({
    inputRange: [0,250],
    outputRange:[0, -250]
});

class CategoryDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            background : this.props.route.params.category.image,
            title: this.props.route.params.category.title,
            subtitle: this.props.route.params.category.subtitle,
        }
    }

    onPressProduct(product){
        this.props.navigation.navigate('ProductDetails', {product});
    }

    addCart(item){
        // Generar index aleatorio
        let index = this.state.id+'_'+Math.floor(Math.random() * 1001);

        let extras = [];

        this.props.addItemToCart({
            index,
            id: item.id,
            name: item.name, 
            price: item.price,
            image: item.image,
            count: 1,
            subtotal: item.price,
            extras
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

    render(){
        return (
        <View style={ style.container }>
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={(e)=>{
                    scrollY.setValue(e.nativeEvent.contentOffset.y);
                }}
            >
                <Animated.View
                    style={{ 
                        transform:[{
                            translateY: traslateY
                        }]
                    }}
                >
                    <BackgroundTop
                        title={this.state.title}
                        subtitle={this.state.subtitle}
                        image={this.state.background}
                        maskDark
                    />
                </Animated.View>
                <Separator height={5} />
                {
                    products.map(item=>
                        <ItemProduct
                            name={item.name}
                            details={item.details}
                            price={item.price}
                            image={item.image}
                            onPress={() => this.onPressProduct(item)}
                            onPressAdd={() => this.addCart(item)}
                        />
                    )
                }
                {
                    products.map(item=>
                        <ItemProduct
                            name={item.name}
                            details={item.details}
                            price={item.price}
                            image={item.image}
                            onPress={() => this.onPressProduct(item)}
                            onPressAdd={() => this.addCart(item)}
                        />
                    )
                }
                <Separator height={30} />
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
        width: screenWidth,
    },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails);
