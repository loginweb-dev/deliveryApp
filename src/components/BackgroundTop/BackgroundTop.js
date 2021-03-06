import React from 'react';
import { View, ImageBackground, Text, StyleSheet, Dimensions } from "react-native";

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const apiStorage = Config.debug ? '' : `${Config.API}/storage/`;

const BackgroundTop = (props) => {
    return(
        <ImageBackground source={{ uri: `${apiStorage}${props.image}` }} style={style.cardImage}>
            {props.maskDark && <View style={style.maskDark} />}
            <Text style={ style.cardTitle } numberOfLines={1}>{props.title}</Text>
            <Text style={ style.cardSubtitle } numberOfLines={2}>{props.subtitle}</Text>
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    cardImage: {
      width: screenWidth,
      height: 250,
      alignItems: 'center',
      justifyContent: 'center',
    },
    cardTitle: {
      fontSize: 35,
      color: 'white',
      marginBottom: 10
    },
    cardSubtitle: {
      fontSize: 15,
      color: 'white'
    },
    maskDark: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
  });

export default BackgroundTop;