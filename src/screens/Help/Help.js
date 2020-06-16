import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
    StyleSheet,
    Linking,
    TouchableOpacity
} from 'react-native';

// Configurations
import { Config } from '../../config/config';

// UI
import Badge from "../../ui/Badge";
import Separator from '../../ui/Separator';

const screenWidth = Math.round(Dimensions.get('window').width);

export default class Help extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ style.container }>
                <ScrollView>
                    <ImageBackground source={ Config.images.bannerAlt } style={{width: '100%', height: 300}} />
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Sobre nosotros</Text>
                            <Text style={style.details}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</Text>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Donde nos encontramos</Text>
                            <Text style={style.details}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Telefonos de contacto</Text>
                            <Text style={style.details}>46255555 - 5917777777</Text>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Correo electrónico</Text>
                            <Text style={style.details}>example@domain.com</Text>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Acerca del desarrollador</Text>
                            <Text style={style.details}>La presente aplicación móvil fue desarrollada por la empresa de tecnología LoginWeb.</Text>
                                <TouchableOpacity 
                                    style={{ alignItems: 'center', marginTop: 5}}
                                    onPress={() => {
                                        Linking.openURL(
                                          `http://loginweb.dev`
                                        );
                                    }}
                                >
                                    <Badge color={ Config.color.primary } size={15} >Más información</Badge>
                                </TouchableOpacity>
                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                <Text style={style.details}>Santísima Trinidad - Beni – Bolivia.</Text>
                            </View>
                            <Separator height={30} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Config.color.background
    },
    header: {
        alignItems: 'center',
        padding: 30
    },
    item: {
        flex: 1,
        width: screenWidth,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 3
    },
    title: {
        fontWeight: 'bold'
    },
    details: {
        color: '#8C8C8C',
        fontSize: 18
    },
    footer: {
        padding: 20
    }
});