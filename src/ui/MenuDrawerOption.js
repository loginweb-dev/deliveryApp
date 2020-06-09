import React from 'react';
import { View, Text } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

// Configurations
import { Config } from '../config/config';

const MenuDrawerOption = props => {
  return (
    <View style={{ width: '100%', flex: 1, flexDirection: 'row', marginLeft: 20, paddingTop: 10, paddingBottom:10 }}>
        <Icon name={props.icon} size={25} color={ Config.draweMenu.colorText } />
        <Text style={{ marginLeft: 20, fontSize: 20, color: Config.draweMenu.colorText }}>{props.text}</Text>
    </View>
  );
}

export default  MenuDrawerOption