import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View>
        <View>
          <Text> HOME </Text>
        </View>
        <TouchableHighlight
          onPress={() => history.push('/ar')}
          underlayColor='whitesmoke'
        >
          <Text>AR</Text>
        </TouchableHighlight>

        <TouchableHighlight
          onPress={() => history.push('/')}
          underlayColor='#04152b'
        >
          <Text>HOME</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
