'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroARPlaneSelector,
  ViroImage
} from 'react-viro';

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../res/guadalupe_360.jpg')
  }
});

class PlaneDetection extends Component {
  constructor() {
    super();

    this.state = {
      text: `talia's world`
    };
  }

  _renderScene() {
    return (
      <ViroText
        text={this.state.text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0.3, -1]}
        style={StyleSheet.helloWorldTextStyle}
      />
    );
  }

  render() {
    return (
      <ViroARScene
        onTrackingUpdated={() => {
          this.setState({ text: `CONGRATULATIONS LIOR <3 <3` });
        }}
        anchorDetectionTypes={['PlanesVertical']} //['PlanesHorizontal', 'PlanesVertical'] props on VIROARPlaneSelector: alignment="Horizontal"
      >
        <ViroARPlaneSelector
          minHeight={0.5}
          minWidth={0.5}
          alignment='Vertical'
        >
          <ViroImage
            height={0.5}
            width={0.5}
            rotation={[-90, 0, 0]}
            placeholderSource={require('../res/monitor.jpg')}
            source={require('../res/graffiti.png')}
          />
        </ViroARPlaneSelector>
      </ViroARScene>
    );
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ee82ee',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

module.exports = PlaneDetection;
