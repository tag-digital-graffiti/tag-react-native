/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import EntryARScene from './EntryARScene';
import Home from './home';
import ImageUpload from './ImageUpload';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Home />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <EntryARScene />
      </View>
    );
  }
}
class UserImageUpload extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ImageUpload />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  AR: SettingsScreen,
  Image: UserImageUpload,
});

export default createAppContainer(TabNavigator);
