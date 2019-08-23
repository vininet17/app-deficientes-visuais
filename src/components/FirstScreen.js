import React from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, PermissionsAndroid } from 'react-native';
import { Audio } from 'expo-av';

const estilos = {
	principal: {
    backgroundColor: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imagem: {
    margin: 2,
    width: 220,
    height: 220
  },
  texto: {
    color: '#fff',
    marginTop: -15,
    fontSize: 25
  }
}; 

export default class FirstScreen extends React.Component{
  componentDidMount() {
     setInterval(() => {
      {this.props.navigation.navigate('Home')}
    }, 2000);
  }

	render () {
		return (
			<View style={estilos.principal}>
          <StatusBar hidden={true}/>
          <Image style={estilos.imagem} source={require('../imagens/logo.png')} />
          <Text style={estilos.texto}>SEES</Text>
      </View>
    );
  }
} 
