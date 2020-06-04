import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

// UI
import ButtonPrimary from "../../ui/ButtonPrimary";
import ButtonSecondary from "../../ui/ButtonSecondary";

// UI
import Avatar from "../../ui/Avatar";

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);

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

    render(){
        return (
            <View style={ style.container }>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={ style.header }>
                        <Avatar
                            width={120}
                            borderColor='white'
                            image={require('../../assets/images/user.png')}
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={style.input}
                            placeholder="Nombre completo"
                            onChangeText={ (value) => this.setState({'inputName': value}) }
                            value={ this.state.inputName }
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={style.input}
                            placeholder="NIT o CI"
                            onChangeText={ (value) => this.setState({'inputNit': value}) }
                            value={ this.state.inputNit }
                        />
                    </View>
                    <View style={ style.item }>
                        <TextInput
                            style={style.input}
                            placeholder="Nº de celular"
                            onChangeText={ (value) => this.setState({'phoneNumber': value}) }
                            value={ this.state.phoneNumber }
                        />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text>No compartimos tu información con nadie</Text>
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
    input: {
        height: 40,
        borderColor: Config.color.textMuted,
        borderWidth: 2,
        marginVertical: 5,
        borderRadius: 5,
        paddingHorizontal: 10,
        width: '100%',
        fontSize: 15
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
