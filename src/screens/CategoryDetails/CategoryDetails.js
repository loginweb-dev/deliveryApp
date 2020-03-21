import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { showMessage } from "react-native-flash-message";

// Components
import BackgroundTop from "../../components/BackgroundTop/BackgroundTop";
import ItemProduct from "../../components/ItemProduct/ItemProduct";

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

class CategoryDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            heightBanner: 200,
            background : this.props.route.params.category.image,
            title: this.props.route.params.category.title,
            subtitle: this.props.route.params.category.subtitle,
        }
    }

    onPressProduct(product){
        this.props.navigation.navigate('ProductDetails', {product});
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
                title={this.state.title}
                subtitle={this.state.subtitle}
                image={this.state.background}
                height={this.state.heightBanner}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                onScrollEndDrag={this.animation}
            >
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
            <View style={{ height:30 }}></View>
            </ScrollView>
        </View>
        );
    }
}

const style = StyleSheet.create({
    container: { flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

// export default CategoryDetails;
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart : (item) => dispatch({
            type: 'ADD_TO_CART',
            payload: item
        })
    }
}

export default connect(null, mapDispatchToProps)(CategoryDetails);
