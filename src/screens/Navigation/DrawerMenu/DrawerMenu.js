import * as React from 'react';
import { View, TouchableOpacity, ImageBackground, Image, Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

// UI
import Badge from "../../../ui/Badge";
import MenuDrawerOption from "../../../ui/MenuDrawerOption";
import Avatar from "../../../ui/Avatar";
import BtnCircle from '../../../ui/BtnCircle';

import { Config } from '../../../config/config';

function DrawerMenu({navigation}) {
    return (
        <View>
            <ImageBackground source={ Config.images.background } style={{width: '100%', height: 200}}>
                <View  style={{ margin: 10, flexDirection: 'row' }}>
                    <BtnCircle
                        backgroundColor={ Config.draweMenu.backgroundSecondary }
                        color={ Config.draweMenu.colorText }
                        onPress={() => navigation.closeDrawer()}
                        icon='md-arrow-back'
                        size={1}
                    />
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Avatar
                        width={80}
                        borderColor='white'
                        image={require('../../../assets/images/user.png')}
                    />
                    <View style={{ marginTop: 10 }}>
                        <Badge color={ Config.color.primary } size={20} >Jhon Doe</Badge>
                    </View>
                </View>
            </ImageBackground>
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('OrderList')}
                >
                    <MenuDrawerOption icon="ios-list" text="Mis pedidos" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('LocationsList')}
                >
                    <MenuDrawerOption icon="ios-pin" text="Ubicaciones" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Profile')}
                >
                    <MenuDrawerOption icon="md-contact" text="Perfil" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Help')}
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
                                        AsyncStorage.setItem('isLoggedIn', '0');
                                        AsyncStorage.setItem('UserSession', '{}');
                                        firebase.auth().signOut();
                                        navigation.closeDrawer();
                                        navigation.reset({
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

export default DrawerMenu;
