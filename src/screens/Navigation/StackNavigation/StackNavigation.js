
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';

// Configurations
import { Config } from '../../../config/config.js';
import { MainStyle } from '../../../config/styles.js';

// Views
import SplashScreen from '../../SplashScreen/SplashScreen';
import Login from '../../Auth/Login/Login';
import Index from '../../Index/Index';
import CategoryDetails from '../../CategoryDetails/CategoryDetails';
import OfferDetails from '../../OfferDetails/OfferDetails';
import ProductDetails from '../../ProductDetails/ProductDetails';
import Cart from '../../Cart/Cart';
import LocationsList from '../../LocationsList/LocationsList';
import BranchOfficeList from '../../BranchOfficeList/BranchOfficeList';
import DeliverySuccess from '../../DeliverySuccess/DeliverySuccess';
import OrderList from '../../OrderList/OrderList';
import OrderDetails from '../../OrderDetails/OrderDetails';
import Profile from '../../Profile/Profile';
import Help from '../../Help/Help';

// UI
import CartHeader from "../../../ui/CartHeader";

// Screens System config
import Update from '../../System/Update/Update';

const Stack = createStackNavigator();

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          isLoggedIn: false
        }
        this.bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        setTimeout(()=>{
            this.setState({
                isLoggedIn: isLoggedIn == '1' ? true : false,
                isLoading: false
            });
        }, 2300);
    };

    render() {
        if(this.state.isLoading){
            return(<SplashScreen />);
        }
        return (
            <Stack.Navigator
                initialRouteName={ this.state.isLoggedIn ? Config.appName : 'Login' }
                screenOptions={{ 
                    headerStyle: {
                        backgroundColor: Config.color.menu
                    },
                    headerTintColor: Config.color.menuText,
                }}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: '',
                        headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name={Config.appName} component={Index}
                    options={{
                        title: <Text style={ MainStyle.h3 }>{Config.appName}</Text>,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ marginLeft:10 }}>
                                <Icon name="ios-menu" size={40} color={Config.color.menuText} />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CartHeader />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="CategoryDetails"
                    component={CategoryDetails}
                    options={({ route }) => ({
                        title: <Text style={ MainStyle.h3 }>{route.params.category.title}</Text>,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CartHeader />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="OfferDetails"
                    component={OfferDetails}
                    options={({ route }) => ({
                        title: <Text style={ MainStyle.h3 }>{route.params.offer.title}</Text>,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CartHeader />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                    options={({ route }) => ({
                        title: <Text style={ MainStyle.h3 }>{route.params.product.name}</Text>,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CartHeader />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Carrito</Text>,
                    })}
                />
                <Stack.Screen
                    name="LocationsList"
                    component={LocationsList}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Mis ubicaciones</Text>,
                    })}
                />
                <Stack.Screen
                    name="BranchOfficeList"
                    component={BranchOfficeList}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Sucursales disponibles</Text>,
                    })}
                />
                <Stack.Screen
                    name="DeliverySuccess"
                    component={DeliverySuccess}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Pedido realizado</Text>,
                    })}
                />
                <Stack.Screen
                    name="OrderList"
                    component={OrderList}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Pedidos</Text>,
                    })}
                />
                <Stack.Screen
                    name="OrderDetails"
                    component={OrderDetails}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Detalles de pedido</Text>,
                    })}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Perfil</Text>,
                    })}
                />
                <Stack.Screen
                    name="Help"
                    component={Help}
                    options={() => ({
                        title: <Text style={ MainStyle.h3 }>Acerca de</Text>,
                    })}
                />

                {/* Screens System config */}
                <Stack.Screen name="Update" component={Update} />
            </Stack.Navigator>
        );
    }
}

export default Main;
