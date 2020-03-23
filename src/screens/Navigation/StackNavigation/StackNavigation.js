
import React, { Component } from 'react';
import { TouchableOpacity, AsyncStorage, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/FontAwesome';

// Configurations
import { Config } from '../../../config/config.js';

// Views
import SplashScreen from '../../SplashScreen/SplashScreen';
import Login from '../../Auth/Login/Login';
import Index from '../../Index/Index';
import CategoryDetails from '../../CategoryDetails/CategoryDetails';
import ProductDetails from '../../ProductDetails/ProductDetails';
import Cart from '../../Cart/Cart';
import LocationsList from '../../LocationsList/LocationsList';

// UI
import CardHeader from "../../../ui/CardHeader";

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
        }, 2500);
    };

    render() {
        if(this.state.isLoading){
            return(<SplashScreen />);
        }
        return (
            <Stack.Navigator initialRouteName={ this.state.isLoggedIn ? Config.appName : 'Login' }>
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
                        title: <Text style={{ fontSize:25, fontWeight: 'bold' }}>{Config.appName}</Text>,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{ marginLeft:10 }}>
                                <Icon name="bars" size={30} />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CardHeader />
                            </TouchableOpacity>
                        ),
                    }}
                />
                <Stack.Screen
                    name="CategoryDetails"
                    component={CategoryDetails}
                    options={({ route }) => ({
                        title: <Text style={{ fontSize:20, fontWeight: 'bold' }}>{route.params.category.title}</Text>,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CardHeader />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="ProductDetails"
                    component={ProductDetails}
                    options={({ route }) => ({
                        title: <Text style={{ fontSize:18, fontWeight: 'bold' }}>{route.params.product.name}</Text>,
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Cart')}
                            >
                                <CardHeader />
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={() => ({
                        title: <Text style={{ fontSize:18, fontWeight: 'bold' }}>Carrito</Text>,
                    })}
                />
                <Stack.Screen
                    name="LocationsList"
                    component={LocationsList}
                    options={() => ({
                        title: <Text style={{ fontSize:18, fontWeight: 'bold' }}>Mis ubicaciones</Text>,
                    })}
                />

                {/* Screens System config */}
                <Stack.Screen name="Update" component={Update} />
            </Stack.Navigator>
        );
    }
}

export default Main;
