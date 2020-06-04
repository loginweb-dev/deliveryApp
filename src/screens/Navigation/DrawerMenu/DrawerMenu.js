import * as React from 'react';
import { View, TouchableOpacity, ImageBackground, Image, Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';

// UI
import Badge from "../../../ui/Badge";
import MenuDrawerOption from "../../../ui/MenuDrawerOption";

import { Config } from '../../../config/config';

function DrawerMenu({navigation}) {
  return (
    <View>
        <ImageBackground source={ require('../../../assets/images/background.png') } style={{width: '100%', height: 200}}>
            <View  style={{ margin: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => navigation.closeDrawer()}>
                    <Icon name='arrow-left' color="#fff" size={25} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                <Image
                    style={{
                        width: 80,
                        height: 80,
                        borderColor: 'white',
                        borderStyle: 'solid',
                        borderWidth: 3,
                        borderRadius: 40,
                    }}
                    source={require('../../../assets/images/user.png')}
                />
                <View style={{ marginTop: 10 }}>
                    <Badge color={ Config.color.primary } size={20} >Jhon Doe</Badge>
                </View>
            </View>
        </ImageBackground>
        <View style={{ marginTop: 10 }}>
            {/* <TouchableOpacity>
                <MenuDrawerOption icon="home" text="Inicio" />
            </TouchableOpacity> */}
            <TouchableOpacity
                onPress={()=> navigation.navigate('OrderList')}
            >
                <MenuDrawerOption icon="list" text="Mis pedidos" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> navigation.navigate('LocationsList')}
            >
                <MenuDrawerOption icon="map-pin" text="Ubicaciones" />
            </TouchableOpacity>
            <TouchableOpacity>
                <MenuDrawerOption icon="user" text="Perfil" />
            </TouchableOpacity>
            <TouchableOpacity>
                <MenuDrawerOption icon="info-circle" text="Ayuda" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{
                    Alert.alert(
                        'Cerrar sesión',
                        `Deseas cerrar sesión en SkotBurgers?`,
                        [
                            {text: 'Cancelar', style: 'cancel'},
                            {
                                text: 'OK',
                                onPress: () => {
                                    AsyncStorage.setItem('isLoggedIn', '0');
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
                <MenuDrawerOption icon="power-off" text="Salir" />
            </TouchableOpacity>
        </View>
    </View>
  );
}

export default DrawerMenu;
