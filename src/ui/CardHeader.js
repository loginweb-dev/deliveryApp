import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

// Configurations
import { Config } from '../config/config.js';

const CardHeader = (props) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', marginTop:10, marginRight:10 }}>
        <Icon name="shopping-cart" size={30} color={Config.color.menuText} />
        <Text style={style.badge}>
            { props.cartItems }
        </Text>
    </View>
  );
}

const style = StyleSheet.create({
    badge: {
        marginTop: 10,
        paddingTop: 2,
        paddingBottom: 0,
        borderRadius: 5,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: Config.color.primary,
        color: 'white',
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold'
    }
});

// export default  CardHeader
const mapStateToProps = (state) => {
    return {
        cartItems : state.cart.length
    }
}

export default connect(mapStateToProps)(CardHeader);