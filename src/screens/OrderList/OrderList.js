import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { connect } from 'react-redux';

// Components
import OrderItem from '../../components/OrderItem/OrderItem';

// UI
import Loading from '../../ui/Loading';

// Configurations
import { Config } from '../../config/config';
import { MainStyle } from '../../config/styles.js';

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
        let userID = this.props.user.id ? this.props.user.id : 1;
        fetch(`${apiURL}/orders_list/${userID}`)
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
                {/* Si el carrito está vacío se muestra el logo de cart-empty */}
                { this.state.ordersList.length == 0 &&
                    <View style={{ alignItems: 'center', marginTop: 120 }}>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={ require('../../assets/images/cart-empty.png') }
                        />
                        <Text style={[MainStyle.h2, MainStyle.textMuted]}>No tienes pedidos aún</Text>
                    </View>
                }
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

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, null)(OrderList);
