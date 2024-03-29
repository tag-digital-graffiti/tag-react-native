'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import { ViroARScene, ViroText, ViroConstants } from 'react-viro';
import Axios from 'axios';
import { connect } from 'react-redux'
import { getNearbyGraffiti } from '../store/graffiti'

export default class HelloWorldSceneAR extends Component {
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
    };

    // bind 'this' to functions
    this._onUpdated = this._onUpdated.bind(this);
    this._latLongToMerc = this._latLongToMerc.bind(this);
    this._transformPointToAR = this._transformPointToAR.bind(this);
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
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
  // render() {
  //   return this.state.deviceLat - this.state.markerLat < 0.0002 &&
  //     this.state.deviceLong - this.state.markerLong < 0.0002 ? (
  //       <ViroARScene onTrackingUpdated={this._onUpdated}>
  //         <ViroText
  //           text={this.state.text}
  //           scale={[0.5, 0.5, 0.5]}
  //           position={[0, 0, -1]}
  //           style={styles.helloWorldTextStyle}
  //         />
  //       </ViroARScene>
  //     ) : (
  //       <ViroARScene onTrackingUpdated={this._onUpdated}>
  //         <ViroText
  //           text={'NOTHING HERE'}
  //           scale={[0.5, 0.5, 0.5]}
  //           position={[0, 0, -1]}
  //           style={styles.helloWorldTextStyle}
  //         />
  //       </ViroARScene>
  //     );
  // }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onUpdated}>
        <ViroText
          text={this.state.text}
          scale={[1, 1, 1]}
          position={(() => {
            let point = this._transformPointToAR(
              this.state.markerLat,
              this.state.markerLong
            );
            return [point.x, 0, point.z];
          })()}
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text={this.state.deviceLat.toString()}
          scale={[1, 1, 1]}
          transformBehaviors="billboard"
          position={(() => {
            let point = this._transformPointToAR(
              this.state.deviceLat,
              this.state.deviceLong
            );
            return [point.x, 0, point.z];
          })()
          }
          style={styles.helloWorldTextStyle}
        />
        <ViroText
          text={this.state.deviceLong.toString()}
          scale={[1, 1, 1]}
          transformBehaviors="billboard"
          position={(() => {
            let point = this._transformPointToAR(
              this.state.deviceLat,
              this.state.deviceLong
            );
            return [point.x, 2, point.z];
          })()}
          style={styles.helloWorldTextStyle}
        />
      </ViroARScene>
    );
  }
  _onUpdated() { }

  _latLongToMerc = (lat_deg, lon_deg) => {
    var lon_rad = (lon_deg / 180.0) * Math.PI;
    var lat_rad = (lat_deg / 180.0) * Math.PI;
    var sm_a = 6378137.0;
    var xmeters = sm_a * lon_rad;
    var ymeters = sm_a * Math.log((Math.sin(lat_rad) + 1) / Math.cos(lat_rad));
    return { x: xmeters, y: ymeters };
  };

  _transformPointToAR = (lat, long) => {
    var objPoint = this._latLongToMerc(lat, long);
    // var devicePoint = this._latLongToMerc(
    //   this.state.latitude,
    //   this.state.longitude
    // );
    var devicePoint = this._latLongToMerc(
      this.state.deviceLat,
      this.state.deviceLong
    );

    // latitude(north,south) maps to the z axis in AR
    // longitude(east, west) maps to the x axis in AR
    var objFinalPosZ = objPoint.y - devicePoint.y;
    var objFinalPosX = objPoint.x - devicePoint.x;
    //flip the z, as negative z(is in front of us which is north, pos z is behind(south).
    if (Math.abs(objFinalPosZ) > 200 || Math.abs(objFinalPosX) > 200) {
      objFinalPosX = objFinalPosX * 0.1;
      objFinalPosZ = objFinalPosZ * 0.1;
    }

    return { x: objFinalPosX, z: -objFinalPosZ };
  };
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ff403a',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});

const mapDispatch = (dispatch) => ({
  getNearbyGraffiti: (lat, long) => dispatch(getNearbyGraffiti(lat, long))
})

const mapState = state => ({
  nearByTag: state.graffiti.nearByTag
})
module.exports = HelloWorldSceneAR;
