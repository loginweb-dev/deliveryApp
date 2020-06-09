import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
// Change Input Image
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob'

// UI
import ButtonPrimary from "../../ui/ButtonPrimary";
import ButtonSecondary from "../../ui/ButtonSecondary";

// UI
import Avatar from "../../ui/Avatar";

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
            user: null,
            message: '',
            codeInput: '',
            phoneCode: 'BO',
            phoneNumberCode: '591',
            inputName: 'John Doe',
            inputNit: '123456',
            phoneNumber: '85199197',
            confirmResult: null,
        };
    }

    componentDidMount(){

    }

    handleChangeAvatar = () => {
        this.setState({
            alertEdit: false,
        });
        ImagePicker.showImagePicker(optionsImagePicker, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                // RNFetchBlob.fetch('POST', `${BASE_URL}/api/update/profile/delivery/avatar/${this.state.id_field}`, {
                //     Authorization : "Bearer access-token",
                //     otherHeader : "foo",
                //     'Content-Type' : 'multipart/form-data',
                // }, [
                //     { name : 'avatar', filename : 'avatar-png.png', type:'image/png', data: response.data},
                // ]).then(response => response.json())
                // .then(async (res) => {
                //     if(res.error){
                //         this.setState({alertErrorMessage: res.error, alertColorEdit : 'red', alertEdit: true, submited: false});
                //     }else{
                //         const data = await AsyncStorage.getItem('tatuUserDelivery');
                //         let user = JSON.parse(data);
                //         let new_user = {
                //             id: user.id, empleado_id: user.empleado_id, name: user.name, email: user.email, phone: user.phone, address: user.address, avatar: res.avatar
                //         }
                //         AsyncStorage.setItem('tatuUserDelivery', JSON.stringify(new_user));
                //         this.setState({alertErrorMessage: res.success, alertColorEdit : 'green', alertEdit: true, urlAvatar: `${BASE_URL}storage/${res.avatar}`,submited: false});
                //     }
                // }).catch((err) => {
                //     console.log(err)
                // })
            }
          });
    }

    render(){
        return (
            <View style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ style.header }>
                        <Avatar
                            width={120}
                            borderColor='white'
                            image={require('../../assets/images/user.png')}
                            onPress={this.handleChangeAvatar}
                        />
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
                            placeholder="NIT o CI"
                            onChangeText={ (value) => this.setState({'inputNit': value}) }
                            value={ this.state.inputNit }
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={MainStyle.input}
                            placeholder="Nº de celular"
                            onChangeText={ (value) => this.setState({'phoneNumber': value}) }
                            value={ this.state.phoneNumber }
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={ [MainStyle.textMuted, MainStyle.p] }>No compartimos tu información personal con nadie.</Text>
                    </View>
                    <View style={ style.footer }>
                        <ButtonPrimary>
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
