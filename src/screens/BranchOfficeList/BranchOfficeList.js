import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, StyleSheet, Text, Image, TextInput, Alert, AsyncStorage } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// UI
import PartialModal from "../../ui/PartialModal";
import ButtonPrimary from "../../ui/ButtonPrimary";
import ButtonSecondary from "../../ui/ButtonSecondary";
import BtnCircle from '../../ui/BtnCircle';
import Badge from "../../ui/Badge";

// Configurations
import { Config } from '../../config/config';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class BranchOfficeList extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputDescription: '',
            selectedIndexTab: 0,
            initialLat : Config.location.latitude,
            initialLon: Config.location.longitude,
            region: {
                latitude: Config.location.latitude,
                longitude: Config.location.longitude,
                latitudeDelta: 0.0422,
                longitudeDelta: screenWidth / (screenHeight - 130) * 0.0422
            },
            messageErrorVisible: false,
            markerOpacity: 0,
            markerTitle: '',
            markerDescription: '',
            locations: [],
            locationsName: []
        }
        this.timeOutTip = null;
    }

    componentDidMount(){
        // Si el carrito está vacío limpiar historial de navegación
        this.props.navigation.addListener('focus', () => {
            if(this.props.cart.length == 0){
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: Config.appName }],
                    key: null,
                });
            }
        });
        this.loadLocations();
    }

    // =====================Functions====================
    loadLocations(){
        // Obtener sucursales disponibles
        let apiURL = `${Config.API}/api/v2`;
        fetch(`${apiURL}/get_params/brach_office_availables`)
        .then(res => res.json())
        .then(res => {
            var locations = [];
            res.brach_offices.map(item => {
                locations.push({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    coor: {lat: parseFloat(item.latitude), lon: parseFloat(item.longitude)}
                })
            });
            this.setState({locations}, () => {
                let names = [];
                this.state.locations.map(item => {
                    names.push(item.name);
                });
                this.setState({locationsName: names});

                setTimeout(() => {
                    this.getLocationTab();
                }, 0);
            })
        });
    }

    // ===================End Functions===================

    getLocationTab(){
        let index = this.state.selectedIndexTab;
        let location = this.state.locations[index];
        
        if(location.coor.lat && location.coor.lon){
            this.setState({
                region: {
                    ...this.state.region,
                    latitude: location.coor.lat,
                    longitude: location.coor.lon,
                },
                markerOpacity: 1,
                markerTitle: location.name,
                markerDescription: location.description,
            });

            // Change map center
            this.map.animateToRegion({
                latitude: location.coor.lat,
                longitude: location.coor.lon,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta
            });
        }
    }

    handleSelectedIndexTab = (index) => {
        this.setState({
            selectedIndexTab: index,
            markerOpacity: 0
        });
        setTimeout(() => {
            this.getLocationTab();
        }, 0);
    }

    handleCurrentLocation(location){
        this.setState({
            region: {
                ...this.state.region,
                latitude: location.latitude,
                longitude: location.longitude,
            },
        })
    }

    AcceptDelivery(){
        if(this.props.user.id){
            let index = this.state.selectedIndexTab;
            let location = this.state.locations[index];
            Alert.alert(
                `Deseas recoger tu pedido en ${location.description}?`,
                `Se te notificará cuando tu pedido esté listo.`,
                [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.navigate('DeliverySuccess', {location});
                        }
                    },
                ],
                { cancelable: false }
            )
        }else{
            Alert.alert(
                'Inicia sesión',
                `Para realizar tu pedido debes iniciar sesión primero.`,
                [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.navigation.navigate('Login');
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }

    render(){
        return (
            <View style={ style.container }>
                <View style={style.header}>
                    <SegmentedControlTab
                        values={this.state.locationsName}
                        selectedIndex={this.state.selectedIndexTab}
                        onTabPress={this.handleSelectedIndexTab}
                        tabStyle={{ borderColor: Config.color.primary }}
                        tabTextStyle={{ color: Config.color.primary }}
                        activeTabStyle={{ backgroundColor: Config.color.primary }}
                    />
                </View>
                <MapView
                    ref={map => {this.map = map}}
                    provider={PROVIDER_GOOGLE}
                    style={style.map}
                    initialRegion={this.state.region}
                >
                    <Marker
                        draggable
                        onDragEnd={(e) => this.handleCurrentLocation(e.nativeEvent.coordinate)}
                        coordinate={
                            { 
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude
                            }
                        }
                        title={this.state.markerTitle}
                        description={this.state.markerDescription}
                        opacity={this.state.markerOpacity}
                    >
                        <Image
                            source={require('../../assets/images/marker.png')}
                            style={{ width: 55, height: 55 }}
                        />
                    </Marker>
                </MapView>
                <View style={style.footer}>
                    <ButtonPrimary onPress={() => this.AcceptDelivery()} icon='ios-checkmark-circle-outline' >
                        Continuar
                    </ButtonPrimary>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Config.color.background
    },
    map: {
        height: 400,
        width: screenWidth,
        height: screenHeight-80
    },
    header: {
        width: screenWidth-20,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        margin: 10,
        zIndex:1
    },
    footer: {
        width: screenWidth-20,
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex:1
    },
    messageError: {
        marginTop: 5,
        color: 'red',
        fontWeight: 'bold'
    }
});

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        user: state.user
    }
}

export default connect(mapStateToProps, null)(BranchOfficeList);
