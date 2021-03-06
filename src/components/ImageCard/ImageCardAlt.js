import React from 'react';
import { View, ImageBackground, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

// Configurations
import { Config } from '../../config/config.js';

const screenWidth = Math.round(Dimensions.get('window').width);
const apiStorage = Config.debug ? '' : `${Config.API}/storage/`;

const ImageCard = (props) => {
    return(
      <TouchableOpacity
        onPress={props.onPress}
      >
        <View style={ style.cardOption }>
            <ImageBackground source={{ uri: `${apiStorage}${props.image}` }} style={style.cardImage}>
                <View style={style.maskDark} />
                <Text style={ style.cardTitle }>{props.title}</Text>
                <Text style={ style.cardSubtitle }>{props.subtitle}</Text>
            </ImageBackground>
        </View>
      </TouchableOpacity>
        
    );
}

const style = StyleSheet.create({
    cardOption: {
      marginTop: 20,
      width: screenWidth-20,
      height: 200
    },
    cardImage: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center'
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

export default ImageCard;