import React from 'react';
import { Modal, View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const PartialModal = props => {
  return (
    <Modal
        transparent={true}
        animationType={props.animationType}
        visible={props.visible}
        onRequestClose={() => {
            console.log('close');
        }}
    >
        <View style={style.container}>
            <View style={[style.body, {height: props.height}]}>
                {props.children}
            </View>
        </View>
    </Modal>
  );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    body: {
        backgroundColor: 'white',
        width: screenWidth,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
});

export default  PartialModal;