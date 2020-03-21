import * as React from 'react';
import { View, TouchableOpacity, ImageBackground, Image } from 'react-native';

// UI
import Badge from "../../../ui/Badge";
import MenuDrawerOption from "../../../ui/MenuDrawerOption";

import { Config } from '../../../config/config';

function DrawerMenu({navigation}) {
  return (
    <View>
        <ImageBackground source={ require('../../../assets/images/background.png') } style={{width: '100%', height: 170}}>
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
            <TouchableOpacity>
                <MenuDrawerOption icon="home" text="Inicio" />
            </TouchableOpacity>
            <TouchableOpacity>
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
        </View>
    </View>
  );
}

export default DrawerMenu;
