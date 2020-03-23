
import React, { Component } from 'react';
import {
  AsyncStorage, View, Dimensions
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, } from '@react-navigation/drawer';

// Configurations
import { Config } from '../config/config.js';

// Screens
import StackNavigation from '../screens/Navigation/StackNavigation/StackNavigation';
import DrawerMenu from '../screens/Navigation/DrawerMenu/DrawerMenu';

const DrawerNavigator = createDrawerNavigator();
const screenWidth = Math.round(Dimensions.get('window').width);

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView >
      <DrawerMenu {...props} />
    </DrawerContentScrollView>
  );
}

class Main extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loading: true,
        widthDreawer: 0
      }
      this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    setTimeout(()=>{
        this.setState({
            widthDreawer: isLoggedIn == '1' ? (screenWidth/10)*7 : 0,
            loading: false
        });
    }, 0);
    console.log(this.state.widthDreawer)
};

  // Render any loading content that you like here
  render() {
    if(this.state.loading){
      return(<View/>);
    }

    return (
      <DrawerNavigator.Navigator
        drawerContent={props => CustomDrawerContent(props)}
        initialRouteName="Home"
        drawerStyle={{
          width: this.state.widthDreawer,
        }}
      >
        <DrawerNavigator.Screen name="Home" component={StackNavigation} />
      </DrawerNavigator.Navigator>
    );
  }
}

export default Main;
