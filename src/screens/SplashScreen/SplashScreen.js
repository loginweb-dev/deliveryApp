import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Animated } from 'react-native';

// Configurations
import { Config } from '../../config/config.js';

class SplashScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
        fadeValue: new Animated.Value(-800)
        }

        this._animated();
    }

    _fadeIn = () => {
        Animated.timing(this.state.fadeValue, {
        toValue: 0,
        duration: 300
        }).start();
    }

    _fadeOut = () => {
        Animated.timing(this.state.fadeValue, {
        toValue: 800,
        duration: 300
        }).start();
    }

    _animated = () => {
        setTimeout(() => {
        this._fadeIn()
        }, 300);

        setTimeout(() => {
        this._fadeOut()
        }, 2000);
    }

    render(){
        return (
            <View style={ style.container }>
                <Animated.View style={{ marginLeft: this.state.fadeValue }}>
                    <Image 
                        source={require('../../assets/images/icon.png')}
                        style={style.logo}
                        resizeMode="contain"
                    />
                </Animated.View>
                {/* <Text style={style.title}>{Config.appName}</Text> */}
                <View style={style.footer}>
                    <Text style={style.footerText}>Powered by <Text style={style.footerTextAutor}>{Config.autor}</Text></Text>
                </View>
            </View>
        )
    }
    
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Config.color.backgroundSplash,
    },
    logo: {
        flexDirection: 'column',
        width: 300,
        height:300,
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:10,
        color: Config.color.backgroundSplashText
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 30
    },
    footerText: {
        textAlign: 'center',
        fontSize: 15,
        color: Config.color.backgroundSplashText
    },
    footerTextAutor: {
        fontWeight: 'bold'
    }
});

export default SplashScreen;