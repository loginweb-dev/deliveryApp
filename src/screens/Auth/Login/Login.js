import React, { Component } from 'react';
import {
    View,
    Button,
    Text,
    TextInput,
    Image,
    AsyncStorage,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import CountryPicker from 'react-native-country-picker-modal';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/FontAwesome';

// Components
import ButtonPrimary from "../../../ui/ButtonPrimary";
import Divider from "../../../ui/Divider";

// Configurations
import { Config } from '../../../config/config';

const screenWidth = Math.round(Dimensions.get('window').width);
const URL_BASE = Config.API;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            message: '',
            codeInput: '',
            phoneCode: 'BO',
            phoneNumberCode: '591',
            inputName: '',
            inputNit: '',
            phoneNumber: '',
            confirmResult: null,
        };
    }

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ user: user.toJSON() });
        } else {
            // User has been signed out, reset the state
            this.setState({
                user: null,
                message: '',
                codeInput: '',
                phoneCode: 'BO',
                phoneNumberCode: '591',
                phoneNumber: '',
                confirmResult: null,
            });
        }
        });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {
        const phoneNumber = `+${this.state.phoneNumberCode}${this.state.phoneNumber}`;
        this.renderMessage('Información', 'Enviando mensaje', 'info');

        firebase.auth().signInWithPhoneNumber(phoneNumber)
        .then(confirmResult => {
            this.setState({ confirmResult })
            this.renderMessage('Información', 'El mensaje ha sido enviado', 'info');
        })
        .catch(error => this.renderMessage('Ocurrió un error', error.message, 'danger'));
    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
        confirmResult.confirm(codeInput)
            .then((user) => {
                this.renderMessage('Bien hecho!', `La autenticación fue exitosa`, 'success')
            })
            .catch(error => this.renderMessage('Ocurrió un error', error.message, 'danger'));
        }
    };

    renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ margin: 20 }}>
                    <Text style={{ fontSize:22, textAlign:'center' }}>Regístrate con tu numero de celular</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '10%', justifyContent: 'center' }}>
                            <CountryPicker
                                countryCode={this.state.phoneCode}
                                onSelect={(country) => this.setState({phoneNumberCode: country.cca2,phoneCode: country.callingCode})}
                            />
                        </View>
                        <View style={{ width: '90%', marginVertical: 10 }}>
                            <TextInput
                                style={{ height: 50, fontSize: 25, borderRadius: 5, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 20 }}
                                placeholder="Nº de Celular"
                                onChangeText={value => this.setState({ phoneNumber: value })}
                                value={phoneNumber}
                                keyboardType='phone-pad'
                            />
                        </View>
                    </View>
                    <ButtonPrimary onPress={this.signIn}>
                        Enviar
                    </ButtonPrimary>
                </View>
                <Divider width={screenWidth-20} size={2} color={Config.color.textMuted} />
                <View style={{ margin: 20 }}>
                    <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.login_facebook} >
                        <Text style={{ fontFamily: 'Arial', fontSize: 18, color: 'white' }}>
                            Login con Facebook
                        </Text>
                    </Icon.Button>
                </View>
                <View style={{ margin: 20 }}>
                    <Button title='Ingresar como invitado' onPress={this.successLogin}></Button>
                </View>
            </View>
        );
    }

    renderMessage(message, description, type) {
        showMessage({
            message,
            description,
            type,
            icon: type,
        });
    }

    renderVerificationCodeInput() {
        const { codeInput } = this.state;

        return (
        <View style={{ marginTop: 25, padding: 25 }}>
            <Text>Ingrese el código de verificación:</Text>
            <TextInput
                // autoFocus
                style={{ height: 40, marginTop: 15, marginBottom: 15 }}
                onChangeText={value => this.setState({ codeInput: value })}
                placeholder={'Código... '}
                value={codeInput}
                keyboardType='phone-pad'
            />
            <ButtonPrimary onPress={this.confirmCode}>
                Confirmar
            </ButtonPrimary>
        </View>
        );
    }

    rendersetInformation() {
        // this.renderMessage('Bien hecho!', 'Se confirmó su numero exitosamente', 'success');
        return(
            <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 20, textAlign: 'center' }}>Completa tu información</Text>
                <TextInput
                    style={{ height: 40, borderColor: Config.color.textMuted, borderWidth: 2, marginTop: 20, borderRadius: 5, paddingHorizontal: 10 }}
                    placeholder="Nombre completo"
                    onChangeText={ (value) => this.setState({'inputName': value}) }
                    value={ this.state.inputName }
                />
                <TextInput
                    style={{ height: 40, borderColor: Config.color.textMuted, borderWidth: 2, marginTop: 20, borderRadius: 5, paddingHorizontal: 10 }}
                    placeholder="NIT"
                    onChangeText={ (value) => this.setState({'inputNit': value}) }
                    value={ this.state.inputNit }
                    keyboardType='numeric'
                />
                <Text style={{ color: Config.color.textMuted, marginBottom: 10 }}>El NIT es opcional</Text>
                <ButtonPrimary onPress={this.successLogin}>
                    Guardar información
                </ButtonPrimary>
            </View>
        )
    }

    successLogin = () =>{
        AsyncStorage.setItem('isLoggedIn', '1');
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: Config.appName }],
            key: null,
        });
    }

    // Login Facebook
    login_facebook = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            result => {
                if (result.isCancelled) {this.renderMessage('Advertencia!', `La autenticación fué cancelada`, 'warning');}
                else {
                    AccessToken.getCurrentAccessToken()
                    .then((data) => {
                        fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.accessToken}`)
                        .then(response => response.json())
                        .then(response => {
                            this.successLogin();
                            // console.log(response);
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    })
                }
            },
            function(error) {console.log("Login fail with error: " + error);}
        );
    }

    render() {
        const { user, confirmResult } = this.state;
        return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <ImageBackground source={ require('../../../assets/images/background.png') } style={{width: '100%', height: 200}} />
                <View style={{ width: screenWidth }}>
        
                    {!user && !confirmResult && this.renderPhoneNumberInput()}

                    {!user && confirmResult && this.renderVerificationCodeInput()}

                    {user && this.rendersetInformation()}
                </View>
            </ScrollView>
        </View>
        );
    }
}