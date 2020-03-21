import 'react-native-gesture-handler';
import React, { Component } from 'react';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Main />
          <FlashMessage position="bottom" />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;