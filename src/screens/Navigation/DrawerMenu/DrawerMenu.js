import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground, Text, Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';

// UI
import Badge from "../../../ui/Badge";
import MenuDrawerOption from "../../../ui/MenuDrawerOption";
import Avatar from "../../../ui/Avatar";
import BtnCircle from '../../../ui/BtnCircle';

import { Config } from '../../../config/config';

class DrawerMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            user: {}
        }
    }

    render(){
        return (
            <View>
                <ImageBackground source={ Config.images.background } style={{width: '100%', height: 200}}>
                    <View  style={{ margin: 10, flexDirection: 'row' }}>
                        <BtnCircle
                            backgroundColor={ Config.draweMenu.backgroundSecondary }
                            color={ Config.draweMenu.colorText }
                            onPress={() => this.props.navigation.closeDrawer()}
                            icon='md-arrow-back'
                            size={1}
                        />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Avatar
                            width={80}
                            borderColor='white'
                            image={this.props.user.avatar ? {uri: this.props.user.avatar} : require('../../../assets/images/user.png')}
                        />
                        <View style={{ marginTop: 10 }}>
                        <Badge color={ Config.color.primary } size={15} >{ this.props.user.name }</Badge>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('OrderList')}
                    >
                        <MenuDrawerOption icon="ios-list" text="Mis pedidos" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Profile')}
                    >
                        <MenuDrawerOption icon="md-contact" text="Perfil" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('LocationsList')}
                    >
                        <MenuDrawerOption icon="ios-pin" text="Ubicaciones" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=> this.props.navigation.navigate('Help')}
                    >
                        <MenuDrawerOption icon="ios-information-circle" text="Acerca de" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{
                            Alert.alert(
                                'Cerrar sesión',
                                `Deseas cerrar sesión en ${Config.appName}?`,
                                [
                                    {text: 'Cancelar', style: 'cancel'},
                                    {
                                        text: 'OK',
                                        onPress: () => {
                                            // Cerrar DrawerMenu
                                            this.props.navigation.closeDrawer();
                                            // Vaciar AsyncStorage
                                            AsyncStorage.setItem('isLoggedIn', '0');
                                            AsyncStorage.setItem('UserSession', '{}');
                                            AsyncStorage.setItem('UserShoppingcart', '[]');
                                            // Vaciar estados
                                            this.props.setUser({});
                                            this.props.updateCart([]);
                                            firebase.auth().signOut();
                                            // Reset navigation y redireccionar al login
                                            this.props.navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'Login' }],
                                            });
                                        }
                                    },
                                ],
                                { cancelable: false }
                            )
                        }}
                    >
                        <MenuDrawerOption icon="ios-power" text="Salir" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch({
            type: 'SET_USER',
            payload: user
        }),
        updateCart : (newCart) => dispatch({
            type: 'RELOAD_CART',
            payload: newCart
        }),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DrawerMenu);
