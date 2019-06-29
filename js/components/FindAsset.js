'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroImage, ViroARTrackingTargets, ViroARImageMarker, ViroARPlane, ViroText, ViroMaterials, ViroARPlaneSelector } from 'react-viro';

export default class FindAsset extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'hello world',
      deviceLat: 0,
      deviceLong: 0,
      markerLat: 40.705167,
      markerLong: -74.009049,
      error: null,
      scale: [1, 1, 0]
    };

    // bind 'this' to functions
    // this._onUpdated = this._onUpdated.bind(this);
    // this._latLongToMerc = this._latLongToMerc.bind(this);
    // this._transformPointToAR = this._transformPointToAR.bind(this);
    this._onPinch = this._onPinch.bind(this);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          deviceLat: position.coords.latitude,
          deviceLong: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
  _onPinch(pinchState, scaleFactor, source) {
    if (pinchState == 3) {
      this.setState({
        scale: [
          this.state.scale[0] * scaleFactor * 0.5,
          this.state.scale[1] * scaleFactor * 0.5,
          this.state.scale[2] * scaleFactor * 0.5
        ]
      });
    }
    //set scale using native props to reflect pinch.
  }

  render() {
    ViroMaterials.createMaterials({
      ViroARPlaneSelector_Translucent: {
        lightingModel: "Constant",
        diffuseColor: "rgba(0, 128, 0, 0.3)"
      }
    });
    return (
      <ViroARScene >
        {/* anchorDetectionTypes={['PlanesVertical', 'PlanesHorizontal']} */}
        <ViroARImageMarker target="targetOne" pauseUpdates={true}>
          {/* <ViroARPlane minHeight={.5} minWidth={.5}> */}
          <ViroImage
            // height={2}
            // width={2}
            source={require('../res/graffiti.png')}
            // position={[0, 0, 0.1]}
            scale={this.state.scale}
            // resizeMode={'ScaleToFit'}
            position={[0, 0, -1]}
            transformBehaviors={['billboard']}
            onPinch={this._onPinch}
          />
          {/* </ViroARPlane> */}

        </ViroARImageMarker>
      </ViroARScene>)

  }
}

ViroARTrackingTargets.createTargets({
  targetOne: {
    source: require('../res/monitor.jpg'),
    // orientation: '',
    physicalWidth: 0.3, // real world width in meters
  },
});

// var styles = StyleSheet.create({
//   helloWorldTextStyle: {
//     fontFamily: 'Arial',
//     fontSize: 30,
//     color: '#ff403a',
//     textAlignVertical: 'center',
//     textAlign: 'center'
//   }
// });

module.exports = FindAsset;


