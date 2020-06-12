
import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { connect } from 'react-redux';
import { createDrawerNavigator, DrawerContentScrollView, } from '@react-navigation/drawer';

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
      this.state = {
        loading: true,
      }
      this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    setTimeout(()=>{
        this.setState({
            loading: false
        });
    }, 0);
    console.log(this.props.user)
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
          backgroundColor: Config.draweMenu.backgroundSecondary,
        }}
      >
        <DrawerNavigator.Screen
          name="Home"
          component={StackNavigation}
          //NOTA: Si el usuario está logueado se activa el DrawerMenu mediante gestos
          // para evitar que el DrawerMenu se pueda visualizar en el screen Login

          options={{ gestureEnabled: this.props.user.id ? true : false }}
        />
      </DrawerNavigator.Navigator>
    );
  }
}

// export default Main;
const mapStateToProps = (state) => {
  return {
    user : state.user,
  }
}

export default connect(mapStateToProps, null)(Main);