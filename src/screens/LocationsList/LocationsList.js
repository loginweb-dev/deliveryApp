import React, { Component } from 'react';
import { SafeAreaView, Dimensions, View, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableHighlight, Modal, TextInput } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { connect } from 'react-redux';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

// UI
import Divider from "../../ui/Divider";

// Configurations
import { Config } from '../../config/config.js';


const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

class LocationsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndexTab: 0,
            initialLat : -14.834821,
            initialLon: -64.904159,
            region: {
                latitude: -14.834821,
                longitude: -64.904159,
                latitudeDelta: 0.0422,
                longitudeDelta: screenWidth / (screenHeight - 130) * 0.0422
            },
            modalVisible: false
        }
    }

    componentDidMount(){    
        Geolocation.getCurrentPosition(position => {
            this.setState({
                region: {
                    ...this.state.region,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                },
                initialLat : position.coords.latitude,
                initialLon: position.coords.longitude,
            })
        });
      }

    handleSelectedIndexTab = (index) => {
        this.setState({
            selectedIndexTab: index,
        });
      }

    render(){
        return (
            <View style={ style.container }>
                    <View style={style.header}>
                        <SegmentedControlTab
                            values={['Casa', 'Trabajo', 'Otro']}
                            selectedIndex={this.state.selectedIndexTab}
                            onTabPress={this.handleSelectedIndexTab}
                            tabStyle={{ borderColor: Config.color.primary }}
                            tabTextStyle={{ color: Config.color.primary }}
                            activeTabStyle={{ backgroundColor: Config.color.primary }}
                        />
                    </View>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={style.map}
                        initialRegion={this.state.region}
                    >
                        <Marker
                            draggable
                            onDragEnd={(e) => console.log(e.nativeEvent.coordinate)}
                            coordinate={
                                { 
                                latitude: this.state.region.latitude,
                                longitude: this.state.region.longitude
                                }
                            }
                            title="Casa"
                            description="Manten precionado para cambiar tu ubicación."
                            image={require('../../assets/images/marker.png')}
                        />
                    </MapView>
                    <View style={style.footer}>
                        <TouchableOpacity
                            onPress={()=>this.setState({modalVisible:!this.state.modalVisible})}
                            style={{ backgroundColor: Config.color.primary, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5 }}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}
                    >
                    <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            alignItems: 'center',}}>
                        <View style={{ backgroundColor: 'white', width: screenWidth, height: 230, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                            <View style={{ marginHorizontal: 20, marginTop: 10 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Describenos tu ubicación</Text>
                                <TextInput
                                    style={{ height: 100, borderColor: '#AFADAD', borderWidth: 1, borderRadius: 5 }}
                                    maxLength={100}
                                    // autoFocus={true}
                                    placeholder="Casa nro 443 frente a la chancha..."
                                    multiline={true}
                                />
                            </View>
                            <View style={{ alignItems: 'center', flexDirection: 'row', width: screenWidth }}>
                                <View style={{ width: '50%' }}> 
                                    <TouchableOpacity
                                        onPress={() => {
                                        this.setState({modalVisible: false});
                                        }}
                                        style={{ height: 40, backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5, borderWidth:1, borderColor: Config.color.primary, margin: 10 }}
                                    >
                                        <Text style={{ color: Config.color.primary, fontSize: 20, textAlign: 'center' }}>Descartar</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                        this.setState({modalVisible: false});
                                        }}
                                        style={{ height: 40, backgroundColor: Config.color.primary, paddingHorizontal: 20, paddingVertical: 5, borderRadius: 5, margin: 10 }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Guardar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    map: {
        height: 400,
        width: screenWidth,
        height: screenHeight-80
    },
    header: {
        width: screenWidth-20,
        position: 'absolute',
        top: 10,
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
        margin: 10,
        zIndex:1
    },
});

// export default ProductDetails;

const mapStateToProps = (state) => {
    return {
        locations  : state.locations,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart : (newCart) => dispatch({
            type: 'RELOAD_CART',
            payload: newCart
        }),
        removeItemToCart : (index) => dispatch({
            type: 'REMOVE_FROM_CART',
            payload: index
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);
