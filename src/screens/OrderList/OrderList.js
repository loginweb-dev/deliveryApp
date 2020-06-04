import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Components
import OrderItem from '../../components/OrderItem/OrderItem';

const orders = [
    {
        id: 1,
        cod: '00001',
        details: 'Product 1, Product 2, Product 3',
        date: 'Hace 1 dias'
    },
    {
        id: 2,
        cod: '00002',
        details: 'Product 1, Product 2, Product 3',
        date: 'Hace 2 dias'
    },
    {
        id: 3,
        cod: '00003',
        details: 'Product 1, Product 2, Product 3',
        date: 'Hace 1 mes'
    }
  ];

class OrderList extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        orders.map(order => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails')}>
                                    <OrderItem
                                        cod={order.cod}
                                        details={order.details}
                                        date={order.date}
                                    />
                                </TouchableOpacity>
                            )
                        })
                    }
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
    },
});

export default OrderList;
