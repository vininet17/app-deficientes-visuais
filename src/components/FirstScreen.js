import React, {PureComponent}  from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar } from 'react-native';

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

export default class FirstScreen extends PureComponent{
	render () {
		return (
			<View style={estilos.principal}>
          <StatusBar hidden={true}/>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={estilos.imagem} source={require('../imagens/logo.png')} />
          </TouchableOpacity>
          <Text style={estilos.texto}>EYE</Text>
      </View>
    );
  }
} 
