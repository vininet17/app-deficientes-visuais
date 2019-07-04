import React from 'react';
import { AppRegistry, View, Image, Alert, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';

const estilos = {
	principal: {
		backgroundColor: 'black',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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

takePicture = async function() {
    if (this.camera) {
        const options = { quality: 0.5, base64: true };
        const data = await this.camera.takePictureAsync(options)
        alert(data.uri);
    }
};    

const App = () => {
	const { principal, imagem, preview, capture } = estilos;
	return (
		<View style={principal}>

			<RNCamera
  				ref={camera => { this.camera = camera }}
  				style = {preview}
  				type={RNCamera.Constants.Type.back}
 				autoFocus={RNCamera.Constants.AutoFocus.on}
  				flashMode={RNCamera.Constants.FlashMode.off}
  				permissionDialogTitle={'Permission to use camera'}
  				permissionDialogMessage={'We need your permission to use your camera phone'}
			/>

			<TouchableOpacity onPress={this.takePicture}>
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
};
AppRegistry.registerComponent('appdefvisu', () => App);
