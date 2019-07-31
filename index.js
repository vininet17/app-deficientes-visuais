import React, {PureComponent}  from 'react';
import { AppRegistry, View, Image, Alert, TouchableOpacity, PermissionsAndroid, StyleSheet, StatusBar, CameraRoll} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import CameraScreen from './src/components/CameraScreen';
import HomeScreen from './src/components/HomeScreen';
import FirstScreen from './src/components/FirstScreen';
import AddScreen from './src/components/AddScreen';
import VoiceScreen from './src/components/VoiceScreen';

const estilos = StyleSheet.create({
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

});

const AppNavigator = createStackNavigator (
	{
		First: {
			screen: FirstScreen,
			navigationOptions: () => ({header: null}),
		},
		Home: {
			screen: HomeScreen,
			navigationOptions: () => ({header: null}),
		},
		Camera: {
			screen: CameraScreen,
			navigationOptions: ({ navigation }) => ({ title: 'Camera',
    		}),
		},
		Add: {
			screen: AddScreen,
			navigationOptions: ({ navigation }) => ({ title: 'Adicionar arquivo',
    		}),
		},
		Voice: {
			screen: VoiceScreen,
			navigationOptions: ({ navigation }) => ({ title: 'Comando de voz',
    		}),
		},
	},
	{
		initialRouteName: 'First'
	}
);

const AppContainer = createAppContainer (AppNavigator);

export default class App extends PureComponent{
	render () {
		return (
			<AppContainer/>
		);
	}
}     

AppRegistry.registerComponent('appdefvisu', () => App);
