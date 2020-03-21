import  React, { Component } from 'react';
import {
    View,
    Button,
    ImageBackground,
    Text,
    TextInput,
    SafeAreaView,
    ScrollView,
    AsyncStorage
} from 'react-native';

import { Config } from '../../../config/config';

const URL_BASE = Config.API;

class Login extends Component{
    constructor() {
        super();
        this.state = {
            inputUser: null,
            inputPassword: null
        };
    }

    // =====================Functions====================
    handleChangeInput(name, value){
        this.setState({
            [name] : value
        });
    }

    login(){
        AsyncStorage.setItem('isLoggedIn', '1');
        // this.props.navigation.navigate('Index');
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: Config.appName }],
        });
    }
    // ===================End Functions===================

    render(){
        return (
            <SafeAreaView>
                <View>
                    <ImageBackground source={ require('../../../assets/images/background.png') } style={{width: '100%', height: 200}} />
                    <ScrollView>
                        <View style={{ margin: 20 }}>
                            <Text style={{ fontSize:30, textAlign:'center' }}>Login</Text>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
                                placeholder="User"
                                onChangeText={ (value) => this.handleChangeInput('inputUser', value) }
                                value={ this.state.inputUser }
                            />
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 20 }}
                                placeholder="Password"
                                secureTextEntry={true}
                                onChangeText={ (value) => this.handleChangeInput('inputPassword', value) }
                                value={ this.state.inputPassword }
                            />
                            <View style={{ marginTop: 20 }}>
                                <Button
                                    title="Login"
                                    onPress={() => this.login()}
                                />
                            </View>
                            
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

export default Login;