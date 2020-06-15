
import React, { Component } from 'react';
import {
  View,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView, } from '@react-navigation/drawer';

// Configurations
import { Config } from '../config/config.js';

// Screens
import StackNavigation from '../screens/Navigation/StackNavigation/StackNavigation';
import DrawerMenu from '../screens/Navigation/DrawerMenu/DrawerMenu';

const DrawerNavigator = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView >
      <DrawerMenu {...props} />
    </DrawerContentScrollView>
  );
}

class Main extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: true,
      }
      this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    // Obetenr información de sesión
    let user = await AsyncStorage.getItem('UserSession');
    if(user){
      this.props.setUser(JSON.parse(user))
    }
    
    // Obtener información de localización
    let location = await AsyncStorage.getItem('UserLocations');
    if(location){
      this.props.setLocations(JSON.parse(location))
    }

    // Obtener información del carrito de compra
    let cart = await AsyncStorage.getItem('UserShoppingcart');
    if(cart){
      this.props.updateCart(JSON.parse(cart))
    }

    setTimeout(()=>{
        this.setState({
            loading: false
        });
    }, 0);
  };

  // Render any loading content that you like here
  render() {
    if(this.state.loading){
      return(<View/>);
    }

    return (
      <DrawerNavigator.Navigator
        drawerContent={props => CustomDrawerContent(props)}
        initialRouteName="Home"
        drawerStyle={{
          backgroundColor: Config.draweMenu.backgroundSecondary,
        }}
      >
        <DrawerNavigator.Screen
          name="Home"
          component={StackNavigation}
          //NOTA: Si el usuario está logueado se activa el DrawerMenu mediante gestos
          // para evitar que el DrawerMenu se pueda visualizar en el screen Login

          options={{ gestureEnabled: this.props.user.id ? true : false }}
        />
      </DrawerNavigator.Navigator>
    );
  }
}

// export default Main;
const mapStateToProps = (state) => {
  return {
    user : state.user,
    cart : state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser : (user) => dispatch({
        type: 'SET_USER',
        payload: user
    }),
    setLocations : (locations) => dispatch({
      type: 'SET_LOCATION',
      payload: locations
    }),
    updateCart : (newCart) => dispatch({
      type: 'RELOAD_CART',
      payload: newCart
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);