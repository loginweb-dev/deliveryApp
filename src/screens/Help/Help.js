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
import Icon from 'react-native-vector-icons/Ionicons';

// Configurations
import { Config } from '../../config/config';
import { Settings } from '../../config/registers';

// UI
import Separator from '../../ui/Separator';
import HyperLink from "../../ui/HyperLink";

const screenWidth = Math.round(Dimensions.get('window').width);

export default class Help extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={ style.container }>
                <ScrollView>
                    <ImageBackground source={ Settings.aboutUs.background } style={{width: '100%', height: 300}} />
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Sobre nosotros</Text>
                            <Text style={style.details}>{ Settings.aboutUs.description }</Text>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Donde nos encuentras</Text>
                            {
                                Settings.aboutUs.address.map(item => 
                                    <HyperLink url={`http://www.google.com/maps/place/${item.location.latitude},${item.location.longitude}`}>
                                        { item.details }
                                    </HyperLink>
                                )
                            }
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Telefonos de contacto</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    Settings.aboutUs.phones.map(item => 
                                        <HyperLink url={`tel:${item}`}>
                                            { item }
                                        </HyperLink>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Redes sociales</Text>
                            <View style={{ flexDirection: 'row' }}>
                                {
                                    Settings.aboutUs.social.map(item => 
                                        <HyperLink url={ item.url }>
                                            <Icon name={ item.icon } size={15} /> { item.name }
                                        </HyperLink>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Correo electrónico</Text>
                            {
                                Settings.aboutUs.email.map(item => 
                                    <HyperLink url={`mailto:${item}`}>
                                        { item }
                                    </HyperLink>
                                )
                            }
                        </View>
                    </View>
                    <View style={{ width: screenWidth }}>
                        <View style={ style.item }>
                            <Text style={style.title}>Acerca del desarrollador</Text>
                            <Text style={style.details}>{ Settings.aboutDev.description }</Text>
                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                <HyperLink url={ Settings.aboutDev.url } size={ 20 } color={ Config.color.primary } >
                                    Más información
                                </HyperLink>
                                <Separator height={10} />
                                <Text style={style.details}>{ Settings.aboutDev.addess }</Text>
                                <Text style={style.detailsAlt}>{ Settings.aboutDev.city }</Text>
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
        fontSize: 16,
        marginHorizontal: 5,
        textAlign: 'justify'
    },
    detailsAlt: {
        color: '#8C8C8C',
        fontSize: 13,
        marginHorizontal: 5
    }
});