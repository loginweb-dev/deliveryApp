import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    AsyncStorage,
    ImageBackground,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Keyboard
} from 'react-native';
import firebase from 'react-native-firebase';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { connect } from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import { showMessage } from "react-native-flash-message";
import Icon from 'react-native-vector-icons/Ionicons';
import AwesomeAlert from 'react-native-awesome-alerts';

// Components
import ButtonPrimary from "../../../ui/ButtonPrimary";
import Avatar from "../../../ui/Avatar";

// Configurations
import { Config } from '../../../config/config';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeihgt = Math.round(Dimensions.get('window').height);

const URL_BASE = Config.API;
const WIDTHAVATAR = 230;

class Login extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            user: null,
            userInfo: null,
            message: '',
            codeInput: '',
            phoneCode: 'BO',
            phoneNumberCode: '591',
            inputName: '',
            inputNit: '',
            phoneNumber: '',
            confirmResult: null,
            widthAvatar: WIDTHAVATAR,
            viewButtons: true,
            awesomeAlert: {
                show: false,
                title: '',
                message: '',
                showProgress: false
            }
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

        // Detectar keyboard
        Keyboard.addListener('keyboardDidShow', () => { this.setState({ widthAvatar: 120, viewButtons: false }) });
        Keyboard.addListener('keyboardDidHide', () => { this.setState({ widthAvatar: WIDTHAVATAR, viewButtons: true }) });
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }

    signIn = () => {
        const phoneNumber = `+${this.state.phoneNumberCode}${this.state.phoneNumber}`;
        this.renderMessage('Información', 'Enviando mensaje...', 'info');

        firebase.auth().signInWithPhoneNumber(phoneNumber)
        .then(confirmResult => {
            this.setState({ confirmResult })
            this.renderMessage('Información', 'El mensaje ha sido enviado.', 'info');
        })
        .catch(error => this.renderMessage('Ocurrió un error', error.message, 'danger'));
    };

    confirmCode = () => {
        const { codeInput, confirmResult } = this.state;

        if (confirmResult && codeInput.length) {
        confirmResult.confirm(codeInput)
            .then((user) => {
                this.renderMessage('Bien hecho!', `La autenticación fue exitosa.`, 'success')
            })
            .catch(error => this.renderMessage('Ocurrió un error', error.message, 'danger'));
        }
    };

    renderPhoneNumberInput() {
    const { phoneNumber } = this.state;
        return (
            <View style={{ flex: 1, alignItems: 'center', marginTop: 30 }}>
                <View style={{ flex: 1, marginHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize:18, textAlign:'center', color: '#aaa' }}>Regístrate con tu número de celular</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: '10%', justifyContent: 'center' }}>
                            <CountryPicker
                                countryCode={this.state.phoneCode}
                                onSelect={(country) => this.setState({phoneNumberCode: country.cca2,phoneCode: country.callingCode})}
                            />
                        </View>
                        <View style={{ width: '75%', marginVertical: 10 }}>
                            <TextInput
                                style={{ height: 50, fontSize: 25, borderColor: '#ccc', borderWidth: 1, paddingHorizontal: 20 }}
                                placeholder="Nº de Celular"
                                onChangeText={value => this.setState({ phoneNumber: value })}
                                value={phoneNumber}
                                keyboardType='phone-pad'
                            />
                        </View>
                        <View style={{ width: '15%', marginVertical: 10 }}>
                            <TouchableOpacity style={{ backgroundColor: Config.color.primary, padding: 12, paddingHorizontal: 15 }} onPress={this.signIn}>
                                <Icon name='md-send' color='#fff' size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ margin: 10, marginTop: 10 }}>
                        <Text style={{ textAlign: 'center', color: '#aaa' }}>Te enviaremos un mensaje con tu código de verificación para registrate, luego te pediremos alginos datos para completar tu registro.</Text>
                    </View>
                </View>
                { this.state.viewButtons &&
                    <View style={{ alignItems: 'center' }}>
                        {/* Invitado */}
                        <View style={{ margin: 10 }}>
                            <TouchableOpacity onPress={this.guestLogin}>
                                <Text style={{ fontSize: 18, color: '#3b5998' }}>Invitado</Text>
                            </TouchableOpacity>
                        </View>
                        {/* ======== */}
                        <View style={{ height: 80 }}>
                            <Icon.Button name="logo-facebook" backgroundColor="#3b5998" onPress={this.login_facebook} >
                                <Text style={{ fontFamily: 'Arial', fontSize: 18, color: 'white' }}>
                                    Inicia con Facebook
                                </Text>
                            </Icon.Button>
                        </View>
                    </View>
                }
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
            <ButtonPrimary onPress={this.confirmCode} icon='ios-checkmark-circle-outline'>
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
                <ButtonPrimary onPress={this.phoneLogin} icon='ios-checkmark-circle-outline'>
                    Guardar información
                </ButtonPrimary>
            </View>
        )
    }

    guestLogin = () => {
        let guetsUser = {
            id: null,
            name: 'Invitado',
            email: '',
            codePhone: '+591',
            numberPhone: '',
            avatar: '',
            businessName: 'Invitado',
            nit: '00000000',
            type: 'guest'
        }
        this.props.setUser(guetsUser)
        this.successLogin();
    }

    phoneLogin = () => {
        if(this.state.inputName){
            let phoneUser = {
                id: null,
                name: this.state.inputName,
                email: `${this.state.phoneNumber}@loginweb.dev`,
                codePhone: this.state.phoneNumberCode,
                numberPhone: this.state.phoneNumber,
                avatar: '',
                nit: this.state.inputNit,
                type: 'sms',
                tokenDevice: this.props.tokenDevice
            }
            this.setState({
                awesomeAlert: {
                    show: true, showProgress: true,
                    title: 'Cargando...',
                    message: 'Registrando información',
                }
            });
            this.setInfoUser(phoneUser);
        }else{
            this.renderMessage('Advertencia!', `Debes ingresar al menos tu nombre.`, 'warning')
        }
    }

    async setInfoUser(userInfo){
        // Si la app no está en modo desarrollo se hace la petición a la API
        if(Config.debug){
            AsyncStorage.setItem('UserSession', JSON.stringify(userInfo), () => {
                this.props.setUser(userInfo)
                this.successLogin();
            });
        }else{
            let apiURL = `${Config.API}/api/v2`;
            let header = {
                method: 'POST',
                body: JSON.stringify(userInfo),
                headers:{
                'Content-Type': 'application/json'
                }
            }
            fetch(`${apiURL}/login`, header)
            .then(res => res.json())
            .then(res => {
                if(!res.error){
                    AsyncStorage.setItem('UserSession', JSON.stringify(res.user), () => {
                        this.props.setUser(res.user);
                        this.successLogin();
                    });
                }else{
                    this.renderMessage('Error!', res.error, 'danger');
                }
                this.setState({
                    awesomeAlert: {
                        show: false, showProgress: true, title: '',message: '',
                    }
                });
            })
            .catch(error => {
                this.renderMessage('Error!', 'Ocurrió un problema inesperado', 'danger');
                this.setState({
                    awesomeAlert: {
                        show: false, showProgress: true, title: '',message: '',
                    }
                });
            });
        }
    }

    successLogin = () =>{
        AsyncStorage.setItem('isLoggedIn', '1', () => {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: Config.appName }],
                key: null,
            });
        });
    }

    

    // Login Facebook
    login_facebook = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            result => {
                if (result.isCancelled) {this.renderMessage('Advertencia!', `La autenticación fué cancelada.`, 'warning');}
                else {
                    AccessToken.getCurrentAccessToken()
                    .then((data) => {
                        this.setState({
                            awesomeAlert: {
                                show: true, showProgress: true,
                                title: 'Cargando...',
                                message: 'Obteniendo información de Facebook',
                            }
                        });
                        fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${data.accessToken}`)
                        .then(res => res.json())
                        .then(res => {
                            let user = {
                                id: null,
                                name: res.name,
                                email: res.email ? res.email : `${res.id}@loginweb.dev`,
                                codePhone: '+591',
                                numberPhone: '',
                                avatar: `http://graph.facebook.com/${res.id}/picture?type=large`,
                                nit: '',
                                type: 'facebook',
                                tokenDevice: this.props.tokenDevice
                            }
                            this.setInfoUser(user);
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
            <View style={ style.container }>
                {/* <ImageBackground source={ Config.images.banner } style={{width: '100%', height: 250}} /> */}
                <View style={ style.containerLogo }>
                    <Avatar
                        width={this.state.widthAvatar}
                        borderColor='#F2F2F2'
                        image={ Config.images.icon }
                    />
                </View>
                {!user && !confirmResult && this.renderPhoneNumberInput()}
                {!user && confirmResult && this.renderVerificationCodeInput()}
                {user && this.rendersetInformation()}

                {/* Alert */}
                <AwesomeAlert
                    show={this.state.awesomeAlert.show}
                    showProgress={this.state.awesomeAlert.showProgress}
                    title={this.state.awesomeAlert.title}
                    message={this.state.awesomeAlert.message}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1, 
        width: screenWidth,
        height: screenHeihgt,
        backgroundColor: Config.color.background,
    },
    containerLogo: {
        // height: 200,
        // flex: 1,
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

// export default Main;
const mapStateToProps = (state) => {
    return {
        user : state.user,
        tokenDevice : state.tokenDevice,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser : (user) => dispatch({
            type: 'SET_USER',
            payload: user
        }),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);