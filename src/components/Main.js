
import React, { Component } from 'react';
import {
  AsyncStorage, Text
} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, } from '@react-navigation/drawer';

// Configurations
import { Config } from '../config/config.js';

// Screens
import StackNavigation from '../screens/Navigation/StackNavigation/StackNavigation';
import DrawerMenu from '../screens/Navigation/DrawerMenu/DrawerMenu';

const DrawerNavigator = createDrawerNavigator();

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
  }

  // Render any loading content that you like here
  render() {
    return (
      <DrawerNavigator.Navigator
        drawerContent={props => CustomDrawerContent(props)}
        initialRouteName="Home"
      >
        <DrawerNavigator.Screen name="Home" component={StackNavigation} />
      </DrawerNavigator.Navigator>
    );
  }
}

export default Main;
