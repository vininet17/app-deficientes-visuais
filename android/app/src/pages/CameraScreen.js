/*import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

class ExampleApp extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
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
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

AppRegistry.registerComponent('appdefvisu', () => ExampleApp);*/

import React, {Component}  from 'react';
import { AppRegistry, View, Image, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createDrawerNavigator, createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

const estilos = {
	principal: {
		backgroundColor: 'black',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
   		flex: 1,
   		flexDirection: 'column',
   		backgroundColor: 'black',
    },
	imagem: {
		margin: 5,
		width: 220,
		height: 220
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

class HomeScreen extends Component{
	render () {
		return (
			<View style={principal}>
				<TouchableOpacity onPress={ () => this.props.navigation.navigate('Camera')}>
					<Image style={imagem} source={require('./imagens/cam.png')} />
				</TouchableOpacity>	
				<TouchableOpacity>
					<Image style={imagem} source={require('./imagens/doc.png')} />
				</TouchableOpacity>	
				<TouchableOpacity>
					<Image style={imagem} source={require('./imagens/add.png')} />
				</TouchableOpacity>	
			</View>
		);
	}
}   

class CameraScreen extends Component{
	render () {
		return (
			<View style={styles.container}>
        		<RNCamera
         			ref={ref => {
            			this.camera = ref;
          			}}
          			style={estilos.preview}
         			type={RNCamera.Constants.Type.back}
          			flashMode={RNCamera.Constants.FlashMode.on}
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
            			<Text style={{ fontSize: 14 }}> SNAP </Text>
          			</TouchableOpacity>
        		</View>
      		</View>
		);
		takePicture = async() => {
    		if (this.camera) {
      			const options = { quality: 0.5, base64: true };
     			const data = await this.camera.takePictureAsync(options);
      			console.log(data.uri);
    		}
		};
	}
}  

const AppNavigator = createStackNavigator (
	{
		Home: {
			Screen: HomeScreen
		},
		Camera: {
			Screen: CameraScreen
		}
	},
	{
		initialRouteName: 'Camera'
	}
);

const AppContainer = createAppContainer (AppNavigator);

export default class App extends Component {
	render() {
		return <AppContainer/>;
	}
}

AppRegistry.registerComponent('appdefvisu', () => App);
