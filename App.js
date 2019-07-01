import TabNavigator from './js/components/Navigator';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './js/store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    );
  }
}
