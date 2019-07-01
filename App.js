import Home from './js/components/home'
import EntryARScene from './js/components/EntryARScene';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NativeRouter, Route, Switch } from 'react-router-native';

import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
} from 'react-native';

import store from './js/store'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NativeRouter>
          <View>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/entryAr" component={EntryARScene} />
            </Switch>
          </View>
        </NativeRouter>
      </Provider>
    );
  }
}
