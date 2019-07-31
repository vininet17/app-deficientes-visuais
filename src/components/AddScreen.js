import React, {PureComponent}  from 'react';
import { View, TouchableOpacity, Image, StatusBar } from 'react-native';

const estilos = {
	container: {
   		flex: 1,
   		justifyContent: 'center',
      alignItems: 'center',
   		backgroundColor: 'black',
  },
}; 

export default class AddScreen extends PureComponent{
	render () {
		return (
			<View style={estilos.container}>
        <StatusBar hidden={true}/>
        <TouchableOpacity>
            <Image source={require('../imagens/addm.png')} />
        </TouchableOpacity>
      </View>
    );
  }
} 

