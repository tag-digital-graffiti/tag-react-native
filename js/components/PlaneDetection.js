'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNearbyGraffiti } from '../store/graffiti';
import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroBox,
  ViroMaterials,
  ViroARPlaneSelector,
  ViroImage,
} from 'react-viro';
// import console = require('console');

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('../res/guadalupe_360.jpg'),
  },
});

class PlaneDetection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deviceLat: 0,
      deviceLong: 0,
      initialLoading: false,
    };
  }
  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          {
            deviceLat: position.coords.latitude,
            deviceLong: position.coords.longitude,
            error: null,
          },
          () => {
            this.props.getNearbyGraffiti(
              this.state.deviceLat,
              this.state.deviceLong
            );
          }
        );
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    console.log(this.state.deviceLat);

    this.setState({ initialLoading: true });
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
    console.log(this.props.myGraffiti);
    if (this.state.initialLoading && this.props.myGraffiti[0]) {
      return (
        <ViroARScene
          onTrackingUpdated={() => {
            this.setState({ text: `CONGRATULATIONS LIOR <3 <3` });
          }}
          anchorDetectionTypes={['PlanesVertical']} //['PlanesHorizontal', 'PlanesVertical'] props on VIROARPlaneSelector: alignment="Horizontal"
        >
          {/* <ViroARPlaneSelector
            minHeight={0.5}
            minWidth={0.5}
            alignment="Vertical"
          >
            <ViroImage
              height={0.5}
              width={0.5}
              rotation={[-90, 0, 0]}
              placeholderSource={require('../res/monitor.jpg')}
              source={{ uri: this.props.myGraffiti[0].arTagUrl }}
            />
          </ViroARPlaneSelector> */}
          <ViroText
            text={this.props.myGraffiti[0].id}
            scale={[0.5, 0.5, 0]}
            position={[0, 0, -1]}
          />
          {/* <ViroImage
            height={0.5}
            width={0.5}
            rotation={[-90, 0, 0]}
            // placeholderSource={require('../res/monitor.jpg')}
            source={{ uri: this.props.myGraffiti[0].arTagUrl }}
          /> */}
        </ViroARScene>
      );
    } else {
      return (
        <ViroARScene>
          <ViroText
            text={'Hello'}
            scale={[0.5, 0.5, 0]}
            position={[0, 0, -1]}
          />
        </ViroARScene>
      );
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ee82ee',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  myGraffiti: state.graffiti.nearByTags,
});

const mapDispatchToProps = dispatch => ({
  getNearbyGraffiti: (lat, long) => dispatch(getNearbyGraffiti(lat, long)),
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaneDetection);
