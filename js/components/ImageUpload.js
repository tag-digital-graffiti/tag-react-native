import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class ImageUpload extends React.Component {
  state = {
    photo: null,
    deviceLat: 0,
    deviceLong: 0,
  };

  // async componentDidMount() {
  //   await navigator.geolocation.getCurrentPosition(position => {
  //     this.setState({
  //       deviceLat: position.coords.latitude,
  //       deviceLong: position.coords.longitude,
  //     });
  //   });
  // }

  // handleUploadPhoto = () => {
  //   //Axios.post('')
  // };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response });
      }
    });
  };

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}
const createFromData = (photo, body) => {
  const data = new FormData();

  data.append('photo', {
    name: photo.fileName,
    type: photo.type,
  });
  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};
