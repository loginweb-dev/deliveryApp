import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

// Configurations
import { Config } from '../../config/config.js';

const SplashScreen = () => (
    <View style={ style.container }>
        <Image 
            source={require('../../assets/images/icon.png')}
            style={style.logo}
            resizeMode="contain"
        />
        <Text style={style.title}>{Config.appName}</Text>
        <View style={style.footer}>
            <Text style={style.footerText}>Powered by <Text style={style.footerTextAutor}>{Config.autor}</Text></Text>
        </View>
    </View>
);

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