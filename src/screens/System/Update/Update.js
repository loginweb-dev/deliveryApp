import * as React from 'react';
import {
    View,
    Button,
    Text,
    SafeAreaView,
    Image,
    Linking,
    StyleSheet
} from 'react-native';

import { Config } from '../../../config/config';

function Update({ navigation }) {
  return (
    <SafeAreaView>
        <View>
            <View style={ style.container }>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 30 }}>
                    <Image
                        style={{width: 80, height: 80, borderColor: 'white',
                        borderStyle: 'dotted',
                        borderWidth: 3,
                        borderRadius: 40,}}
                        source={require('../../../assets/images/user.png')}
                    />
                </View>
                <Text style={{ textAlign: 'justify' }}>Se ha realizado una actualización con cambios importantes en la aplicación, para poder usarla te pedimos que realices una actualización.</Text>
                <View style={{ marginTop: 20 }}>
                    <Button
                        title="Update"
                        onPress={() => Linking.openURL(`http://loginweb.dev`)}
                    />
                </View>
                
            </View>
        </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Config.color.background
    },
});

export default Update;