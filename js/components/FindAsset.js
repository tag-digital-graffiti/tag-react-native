'use strict';

import React, { Component } from 'react';

import { StyleSheet, View } from 'react-native';

import {
  ViroARScene,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroARPlane,
  ViroText,
  ViroMaterials,
  ViroARPlaneSelector
} from 'react-viro';

import { connect } from 'react-redux';
import { getNearbyGraffiti } from '../store/graffiti';

class FindAsset extends Component {
  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text: 'hello world',
      deviceLat: 0,
      deviceLong: 0,
      markerLat: 40.705167,
      markerLong: -74.009049,
      error: null,
      scale: [1, 1, 0],
      loading: false
    };

    // bind 'this' to functions
    // this._onUpdated = this._onUpdated.bind(this);
    // this._latLongToMerc = this._latLongToMerc.bind(this);
    // this._transformPointToAR = this._transformPointToAR.bind(this);
    this._onPinch = this._onPinch.bind(this);
    this._createTarget = this._createTarget.bind(this)
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          deviceLat: position.coords.latitude,
          deviceLong: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    await this.props.getNearbyGraffiti(this.state.deviceLat, this.state.deviceLong)
    this.setState({ loading: true });

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

  _createTarget() {
    ViroARTrackingTargets.createTargets({
      targetOne: {
        source: { uri: this.props.nearByTag[0].assetUrl },
        // orientation: '',
        physicalWidth: 0.3 // real world width in meters
      }
    })
  }

  render() {
    if (this.state.loading && this.props.nearByTag[0]) {
      this._createTarget()
      ViroMaterials.createMaterials({
        ViroARPlaneSelector_Translucent: {
          lightingModel: 'Constant',
          diffuseColor: 'rgba(0, 128, 0, 0.3)'
        }
      });
      return (
        <ViroARScene>
          {/* anchorDetectionTypes={['PlanesVertical', 'PlanesHorizontal']} */}
          <ViroARImageMarker target="targetOne" pauseUpdates={true}>
            {/* <ViroARPlane minHeight={.5} minWidth={.5}> */}
            <ViroImage
              // height={2}
              // width={2}
              source={{ uri: this.props.nearByTag[0].arTagUrl }}
              // position={[0, 0, 0.1]}
              scale={this.state.scale}
              // resizeMode={'ScaleToFit'}
              position={[0, 0, -1]}
              transformBehaviors={['billboard']}
              onPinch={this._onPinch}
            />
            {/* </ViroARPlane> */}
          </ViroARImageMarker>
        </ViroARScene>
      );
    } else {
      return (
        <ViroARScene>
          <ViroText
            text={'NOTHING HERE'}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
          />
        </ViroARScene>
      );
    }
  }
}

const mapDispatch = dispatch => ({
  getNearbyGraffiti: (lat, long) => dispatch(getNearbyGraffiti(lat, long))
});

const mapState = state => ({
  nearByTag: state.graffiti.nearByTags
});

module.exports = connect(
  mapState,
  mapDispatch
)(FindAsset);

// export default connect(
//   mapState,
//   mapDispatch
// )(FindAsset)
