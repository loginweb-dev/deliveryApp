import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, TextInput, AsyncStorage, Alert } from 'react-native';
import { connect } from 'react-redux';
import { showMessage } from "react-native-flash-message";
// Change Input Image
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'

// UI
import ButtonPrimary from "../../ui/ButtonPrimary";

// UI
import Avatar from "../../ui/Avatar";
import Loading from '../../ui/Loading';

// Configurations
import { Config } from '../../config/config.js';
import { MainStyle } from '../../config/styles.js';

const screenWidth = Math.round(Dimensions.get('window').width);
// Options ImagePicker
const optionsImagePicker = {
    title: 'Seleccionar Imagen',
    takePhotoButtonTitle: 'Tomar una fotografía',
    chooseFromLibraryButtonTitle: 'Seleccionar de la galeria',
    cancelButtonTitle : 'Cancelar',
    quality: 1,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            inputName: this.props.user.name,
            inputPhoneNumber: this.props.user.numberPhone,
            inputBusinessName: this.props.user.businessName,
            inputNit: this.props.user.nit,
            // Si el avatar no existe se le asigna uno por defecto, si existe se debe tener en verificar si es de una red social o el avatar por defecto del sistema
            userAvatar: this.props.user.avatar ? this.props.user.avatar.includes('http') ? {uri: this.props.user.avatar} : {uri: `${Config.API}/storage/${this.props.user.avatar}`} : require('../../assets/images/user.png'),
            // Parametro para redirección en caso de edición rápida
            kickUpdate: this.props.route.params ? this.props.route.params.kickUpdate : false,
            sending: false,
            sendingAvatar: false
        };
    }

    handleChangeAvatar = () => {
        this.setState({
            sendingAvatar: false,
        });
        ImagePicker.showImagePicker(optionsImagePicker, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                if(this.props.user.id && !Config.debug){
                    this.setState({ sendingAvatar: true });
                    let apiURL = `${Config.API}/api/v2`;
                    RNFetchBlob.fetch('POST', `${apiURL}/update_user_avatar/${this.props.user.id}`, {
                        Authorization : "Bearer access-token",
                        'Content-Type' : 'multipart/form-data',
                    }, [
                        { name : 'avatar', filename : 'avatar-png.png', type:'image/png', data: response.data},
                    ]).then(response => response.json())
                    .then(res => {
                        if(res.error){
                            showMessage({
                                message: 'Error',
                                description: `Ocurrió un error en el servidor.`,
                                type: 'danger', icon: 'danger',
                            });
                        }else{
                            let user = this.props.user;
                            let newUser = {
                                ...user,
                                avatar: `${Config.API}/storage/${res.avatar}`
                            }

                            AsyncStorage.setItem('UserSession', JSON.stringify(newUser), () => {
                                this.props.updateUser(newUser);
                                showMessage({
                                    message: 'Avatar actualizado',
                                    description: `Tu imagen de perfil fue actualizada.`,
                                    type: 'info', icon: 'info',
                                });
                                this.setState({userAvatar: { uri: `${Config.API}/storage/${res.avatar}`}});
                            });
                        }
                        this.setState({ sendingAvatar: false });
                    }).catch((err) => {
                        showMessage({
                            message: 'Error!',
                            description: 'Ocurrió un problema inesperado',
                            type: 'danger', icon: 'danger',
                        });
                        this.setState({ sendingAvatar: false });
                    })
                }else{
                    showMessage({
                        message: 'Advertencia',
                        description: `Tu imagen de perfil solo se puede editar si inicias sesión.`,
                        type: 'warning', icon: 'warning',
                    });
                }
            }
          });
    }

    confirmSubmit = () => {
        Alert.alert(
            'Confirmar actualización',
            `Estás seguro que deseas actualizar tu información de perfil?`,
            [
                {text: 'Cancelar', style: 'cancel'},
                {
                    text: 'OK',
                    onPress: () => {
                        this.handleSubmit();
                    }
                },
            ],
            { cancelable: false }
        )
    }

    handleSubmit = () => {
        if(this.state.inputName && this.state.inputPhoneNumber){
            let user = this.props.user;
            let newUser = {
                ...user,
                name: this.state.inputName,
                numberPhone: this.state.inputPhoneNumber,
                businessName: this.state.inputBusinessName,
                nit: this.state.inputNit
            }
            if(newUser.id && !Config.debug){
                this.setState({ sending: true });
                let apiURL = `${Config.API}/api/v2`;
                let header = {
                    method: 'POST',
                    body: JSON.stringify(newUser),
                    headers:{
                    'Content-Type': 'application/json'
                    }
                }
                fetch(`${apiURL}/update_user_profile`, header)
                .then(res => res.json())
                .then(res => {
                    if(!res.error){
                        let newUser = res.user;
                        AsyncStorage.setItem('UserSession', JSON.stringify(newUser), () => {
                            this.props.updateUser(newUser);
                            this.successUpdate();
                        });
                    }else{
                        showMessage({
                            message: 'Error!',
                            description: res.error,
                            type: 'danger', icon: 'danger',
                        });
                    }
                    this.setState({ sending: false });
                })
                .catch(error => {
                    showMessage({
                        message: 'Error!',
                        description: `Ocurrió un problema inesperado.`,
                        type: 'danger', icon: 'danger',
                    });
                    this.setState({ sending: false });
                });
            }else{
                AsyncStorage.setItem('UserSession', JSON.stringify(newUser), () => {
                    this.props.updateUser(newUser);
                    this.successUpdate();
                });
            }
        }else{
            showMessage({
                message: 'Advertencia',
                description: `Debes ingresar al menos tu nombre y número de celular.`,
                type: 'warning',
                icon: 'warning',
            });
        }
    }

    successUpdate = () => {
        showMessage({
            message: 'Datos actualizados',
            description: `Tu información de perfil fue actualizada.`,
            type: 'info',
            icon: 'info',
        });

        if(this.state.kickUpdate){
            setTimeout(() => {
                this.props.navigation.goBack();
            }, 1500);
        }
    }

    render(){
        return (
            <View style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ style.header }>
                        <Avatar
                            width={120}
                            borderColor='white'
                            image={ this.state.userAvatar }
                            onPress={this.state.sendingAvatar ? null : this.handleChangeAvatar}
                        />
                        { this.state.sendingAvatar && <Loading/>}
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={MainStyle.input}
                            placeholder="Nombre completo"
                            onChangeText={ (value) => this.setState({'inputName': value}) }
                            value={ this.state.inputName }
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={MainStyle.input}
                            placeholder="Nº de celular"
                            onChangeText={ (value) => this.setState({'inputPhoneNumber': value}) }
                            value={ this.state.inputPhoneNumber }
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={MainStyle.input}
                            placeholder="Razón social"
                            onChangeText={ (value) => this.setState({'inputBusinessName': value}) }
                            value={ this.state.inputBusinessName }
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={MainStyle.input}
                            placeholder="NIT o CI"
                            onChangeText={ (value) => this.setState({'inputNit': value}) }
                            value={ this.state.inputNit }
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={ [MainStyle.textMuted, MainStyle.p] }>No compartimos tu información personal con nadie.</Text>
                    </View>
                    { this.state.sending && <Loading/>}
                    <View style={ style.footer }>
                        <ButtonPrimary
                            disabled={this.state.sending || this.state.sendingAvatar}
                            onPress={ this.confirmSubmit } icon='ios-checkmark-circle-outline'>
                            Actualizar información
                        </ButtonPrimary>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    footer: {
        padding: 20
    }
});

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser : (newUser) => dispatch({
            type: 'SET_USER',
            payload: newUser
        }),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
