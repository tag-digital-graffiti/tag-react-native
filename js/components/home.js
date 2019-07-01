import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

let styles = StyleSheet.create({
  outer: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold'
  }
});

export default class Home extends Component {
  render() {
    const { history } = this.props;
    return (
      <View style={styles.outer}>
        <View>
          <Text style={styles.text}> HOME not button </Text>
        </View>
        <TouchableHighlight onPress={() => history.push('/ar')}>
          <Text style={styles.text}>AR</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={() => history.push('/')}>
          <Text style={styles.text}>HOME</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
