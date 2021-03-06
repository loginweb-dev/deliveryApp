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

class LocationsList extends Component {
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
            modalVisible: false,
            buttonEditVisible: false,
            messageErrorVisible: false,
            markerOpacity: 0,
            markerTitle: '',
            markerDescription: '',
            locationsName: [],
            locationSelecte: false,
            // Verificar si se recibe el parametro cartSuccess para activar las opciones de realizar pedido
            cartSuccess: this.props.route.params ? this.props.route.params.cartSuccess : false,
            showTips: false
        }
        this.timeOutTip = null;
    }

    componentDidMount(){
        this.showTips();
        // Si el carrito está vacío limpiar historial de navegación
        this.props.navigation.addListener('focus', () => {
            if(this.state.cartSuccess && this.props.cart.length == 0){
                this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: Config.appName }],
                    key: null,
                });
            }
        });
        this.loadLocations();
    }

    getCurrentLocation(){
        Geolocation.getCurrentPosition(position => {
            this.setState({
                region: {
                    ...this.state.region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
                markerOpacity: 1,
                buttonEditVisible: true,
                markerTitle: 'Ubicación actual',
                markerDescription: 'Ubicación obtenida según tu GPS.',
            });

            // Change map center
            this.map.animateToRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta
            });
        });
    }

    // =====================Functions====================
    loadLocations(){
        let names = [];
        this.props.locations.map(item => {
            names.push(item.name);
        });
        this.setState({locationsName: names});

        setTimeout(() => {
            this.getLocationTab();
        }, 0);
    }

    handleChangeInput(name, value){
        this.setState({
            [name] : value
        });
    }
    // ===================End Functions===================

    getLocationTab(){
        let index = this.state.selectedIndexTab;
        let location = this.props.locations[index];
        
        if(location.coor.lat && location.coor.lon){
            this.setState({
                region: {
                    ...this.state.region,
                    latitude: location.coor.lat,
                    longitude: location.coor.lon,
                },
                markerOpacity: 1,
                buttonEditVisible: false,
                markerTitle: location.name,
                markerDescription: location.description,
                locationSelecte: true
            });

            // Change map center
            this.map.animateToRegion({
                latitude: location.coor.lat,
                longitude: location.coor.lon,
                latitudeDelta: this.state.region.latitudeDelta,
                longitudeDelta: this.state.region.longitudeDelta
            });
        }else{
            this.setState({locationSelecte: false});
            Alert.alert(
                'Advertencia',
                `Aún no has definido la ubicación de: ${this.state.locationsName[index]}, Deseas definirla?`,
                [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            this.getCurrentLocation();
                        }
                    },
                ],
                { cancelable: false }
            )
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
            buttonEditVisible: true
        })
    }

    handleUpdateLocation(){
        let index = this.state.selectedIndexTab;
        let currentLocation = this.state.region;
        let locationState = this.props.locations;
        let description = this.state.inputDescription;

        if(description != ''){
            locationState[index].coor.lat = currentLocation.latitude;
            locationState[index].coor.lon = currentLocation.longitude;
            locationState[index].description = description;
            this.props.updateLocation(locationState);
            AsyncStorage.setItem('UserLocations', JSON.stringify(locationState), () => {
                this.setState({messageErrorVisible: false, modalVisible: false, buttonEditVisible: false});
                showMessage({
                    message: 'Ubicación editada',
                    description: `Se actualizaron los datos de la ubicación: ${locationState[index].name}.`,
                    type: 'info',
                    icon: 'info',
                });
                this.setState({locationSelecte: true});
            });
        }else{
            this.setState({messageErrorVisible: true});
        }
    }

    AcceptDelivery(){
        if(this.props.user.id){
            Alert.alert(
                'Deseas realizar tu pedido?',
                `Tu pedido se registrará y será enviado a la ubicación seleccionada`,
                [
                    {text: 'Cancelar', style: 'cancel'},
                    {
                        text: 'OK',
                        onPress: () => {
                            let index = this.state.selectedIndexTab;
                            let location = this.props.locations[index];
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

    showTips = () => {
        clearTimeout(this.timeOutTip);
        this.setState({showTips: true})
        this.timeOutTip = setTimeout(() => {
            this.setState({showTips: false})
        }, 8000);
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
                    {this.state.showTips &&
                        <View style={{ alignItems: 'center', marginTop: 10 }}>
                            <Badge
                                color={ 'white' }
                                textColor={ Config.color.primary }
                                borderColor={ Config.color.primary }
                                size={15} >
                                Mantenga presionado el marcador para moverlo
                            </Badge>
                        </View>
                    }
                </View>
                <MapView
                    ref={map => {this.map = map}}
                    provider={PROVIDER_GOOGLE}
                    style={style.map}
                    initialRegion={this.state.region}
                    onPress={ this.showTips }
                    onPanDrag={ this.showTips }
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
                <View style={{ position: 'absolute', bottom: 50, right: 20 }}>
                <BtnCircle
                    backgroundColor={ Config.color.primary }
                    color={ Config.color.textPrimary }
                    onPress={() => this.getCurrentLocation()}
                    icon='md-locate'
                    size={5}
                />
                </View>
                {
                    this.state.buttonEditVisible &&
                    <View style={style.footer}>
                        <ButtonPrimary onPress={() => this.setState({modalVisible:!this.state.modalVisible})} icon='ios-pin'>
                            Actualizar
                        </ButtonPrimary>
                    </View>
                }
                {/* Si no se está editando la ubicación y el pedido fué aceptado se muestra el boton de aceptar */}
                {
                    !this.state.buttonEditVisible && this.state.cartSuccess && this.state.locationSelecte &&
                    <View style={style.footer}>
                        <ButtonPrimary onPress={() => this.AcceptDelivery()} icon='ios-checkmark-circle-outline' >
                            Continuar
                        </ButtonPrimary>
                    </View>
                }
                <PartialModal
                    animationType="slide"
                    visible={this.state.modalVisible}
                    height={230}
                    onRequestClose={()=> this.setState({modalVisible: false})}
                >
                    <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Describenos tu ubicación</Text>
                        <TextInput
                            style={{ height: 100, borderColor: '#AFADAD', borderWidth: 1, borderRadius: 5 }}
                            maxLength={100}
                            // autoFocus={true}
                            placeholder="Casa nro 443 frente a la chancha..."
                            multiline={true}
                            onChangeText={ (value) => this.handleChangeInput('inputDescription', value) }
                        />
                        {
                            this.state.messageErrorVisible ?
                            <Text style={style.messageError}>Debe especificar una descripción de su ubicación.</Text> :
                            <View/>
                        }
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', width: screenWidth }}>
                        <View style={{ width: '50%' }}> 
                            <ButtonSecondary onPress={() => this.setState({modalVisible: false, messageErrorVisible: false})} icon='ios-close-circle-outline' >
                                Descartar
                            </ButtonSecondary>
                        </View>
                        <View style={{ width: '50%' }}>
                            <ButtonPrimary onPress={() => this.handleUpdateLocation()} icon='ios-checkmark-circle-outline'>
                                Guardar
                            </ButtonPrimary>
                        </View>
                    </View>
                </PartialModal>
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

// export default ProductDetails;

const mapStateToProps = (state) => {
    return {
        locations: state.locations,
        cart: state.cart,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLocation : (locations) => dispatch({
            type: 'UPDATE_LOCATION',
            payload: locations
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
