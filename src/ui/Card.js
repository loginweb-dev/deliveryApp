import React from 'react';
import { View, Text } from 'react-native';

const Card = props => {
  return (
    <View style={{ margin: 10, backgroundColor: props.backgroundColor ? props.backgroundColor : 'red', padding: 10, borderRadius: 10 }}>
        {   props.title &&
            <Text style={{ color: props.color ? props.color : '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>{ props.title }</Text>
        }
        <Text style={{ color: props.color ? props.color : '#fff', marginBottom: 5 }}>{ props.children }</Text>
    </View>
  );
}

export default  Card;