import React from 'react';
import { View, ImageBackground, Text, StyleSheet, Dimensions } from "react-native";

const screenWidth = Math.round(Dimensions.get('window').width);

const BackgroundTop = (props) => {
    return(
      <View style={ [style.cardOption, {height: props.height}] }>
          <ImageBackground source={{ uri: props.image }} style={style.cardImage}>
              <View style={style.maskDark} />
              <Text style={ style.cardTitle } numberOfLines={1}>{props.title}</Text>
              <Text style={ style.cardSubtitle } numberOfLines={2}>{props.subtitle}</Text>
          </ImageBackground>
      </View>
    );
}

const style = StyleSheet.create({
    cardOption: {
      width: screenWidth,
      // height: 200
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

export default BackgroundTop;