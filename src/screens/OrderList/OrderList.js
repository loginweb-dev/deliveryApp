import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

// Components
import OrderItem from '../../components/OrderItem/OrderItem';
import Loading from '../../ui/Loading';

// Configurations
import { Config } from '../../config/config';

// Registers
import { Orders } from '../../config/registers';

class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            ordersList: Config.debug ? Orders : [],
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
        fetch(`${apiURL}/orders_list/2`)
        .then(res => res.json())
        .then(res => {
          this.setState({
            ordersList: res.ordersList,
            loading: false
          });
        })
        .catch(error => {
            console.log(error);
        });
      }

    render(){
        if(this.state.loading){
            return <Loading size="large" />
        }
        return (
            <View style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        this.state.ordersList.map(order => {
                            return (
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('OrderDetails', {order})}>
                                    <OrderItem
                                        cod={order.code}
                                        details={order.details}
                                        status={order.status}
                                        statusName={order.statusName}
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
        backgroundColor: Config.color.background
    },
});

export default OrderList;
