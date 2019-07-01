import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroImage,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroARPlane,
  ViroText,
  ViroMaterials,
  ViroARPlaneSelector,
  ViroDirectionalLight,
  ViroConstants,
  ViroBox,
  ViroQuad,
  ViroSpotLight,
} from 'react-viro';

const MODELS = [];
const PLANE_SIZE = 0.5;

class testForPlane extends Component {
  state = {
    isTracking: false,
    initialized: false,
    planeWidth: 10,
    planeLength: 10,
    modelMap: MODELS,
  };

  onPlaneSelected = anchorMap => {
    this.setState({
      planeWidth: PLANE_SIZE,
      planeLength: PLANE_SIZE,
    });
  };

  getARScene() {
    return (
      <ViroARPlaneSelector onPlaneSelected={this.onPlaneSelected} pauseUpdates>
        <ViroBox
          width={this.state.planeWidth}
          length={this.state.planeLength}
          scale={[1, 0.02, 1]}
        />
        <ViroQuad
          height={100}
          width={100}
          rotation={[-300, 0, 0]}
          position={[0, -3, 0]}
          materials={['transparent']}
        />
      </ViroARPlaneSelector>
    );
  }

  getUIText(uiText) {
    return (
      <ViroText
        text={uiText}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        transformBehaviors={['billboardX', 'billboardY']}
      />
    );
  }
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroSpotLight
          position={[0, -0.5, -0.5]}
          color="#111"
          direction={[0, 0, -1]}
          attenuationStartDistance={5}
          attenuationEndDistance={10}
          innerAngle={5}
          outerAngle={20}
        />
        {this.state.isTracking
          ? this.getARScene()
          : this.getUIText(
              this.state.initialized ? 'Initializing' : 'No Tracking'
            )}
      </ViroARScene>
    );
  }

  _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        isTracking: true,
        initialized: true,
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        isTracking: false,
      });
    }
  };
}
export default testForPlane;
module.exports = testForPlane;
