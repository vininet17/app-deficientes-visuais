import React, {PureComponent}  from 'react';
import { Text, View, TouchableOpacity, PermissionsAndroid, StatusBar } from 'react-native';
import { RNCamera } from 'react-native-camera';

const estilos = {
	container: {
   		flex: 1,
   		flexDirection: 'column',
   		backgroundColor: 'black',
    },
	preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20
    }

}; 

export default class CameraScreen extends PureComponent{
	render () {
		return (
			<View style={estilos.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={estilos.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={estilos.capture}>
            <Text style={{ fontSize: 14 }}> TIRAR FOTO </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };
} 
