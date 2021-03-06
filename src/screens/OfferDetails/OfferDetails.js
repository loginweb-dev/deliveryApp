import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet, Dimensions, Animated, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { showMessage } from "react-native-flash-message";

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";
import ItemProduct from "../../components/ItemProduct/ItemProduct";

// UI
import Separator from '../../ui/Separator';
import Loading from '../../ui/Loading';

// Configurations
import { Config } from '../../config/config';

// Registers
import { Products } from '../../config/registers';

const screenWidth = Math.round(Dimensions.get('window').width);

const scrollY = new Animated.Value(0);
const traslateY = scrollY.interpolate({
    inputRange: [0,250],
    outputRange:[0, -250]
});

class OfferDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.route.params.offer.id,
            background : this.props.route.params.offer.image,
            title: this.props.route.params.offer.title,
            subtitle: this.props.route.params.offer.subtitle,
            productsList: Config.debug ? Products : [],
            loading: true,
        }
    }

    componentDidMount() {
        if(!Config.debug){
            this.getData()
        }else{
            this.setState({ loading: false });
        }
    }
    
    getData = () => {
        let apiURL = `${Config.API}/api/v2`;
        fetch(`${apiURL}/offer_products/${this.state.id}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                productsList: res.productsList,
                loading: false
            });
        })
        .catch(error => {
            console.log(error);
        });
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
                {   this.state.loading &&
                        <View style={{ marginTop: 20 }}>
                            <Loading />
                        </View>
                    }
                {
                    this.state.productsList.map(item=>
                        <ItemProduct
                            name={item.name}
                            details={item.details}
                            price={item.price}
                            oldPrice={item.oldPrice}
                            image={item.image}
                            type={item.type}
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
        backgroundColor: Config.color.background
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

export default connect(mapStateToProps, mapDispatchToProps)(OfferDetails);
