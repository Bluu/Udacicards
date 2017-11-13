import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import reduxStore from './store';
import Home from './components/home'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ reduxStore }>
        <Home />
      </Provider>
    );
  }
}
