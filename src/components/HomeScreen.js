import React, {PureComponent}  from 'react';
import { View, Image, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';

const estilos = StyleSheet.create({
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
	}
});

export default class HomeScreen extends PureComponent{
	render () {
		return (
			<View style={estilos.principal}>
				<StatusBar hidden={true}/>
				<TouchableOpacity onPress={ () => this.props.navigation.navigate('Add')}>
					<Image style={estilos.imagem} source={require('../imagens/addm.png')} />
				</TouchableOpacity>
				<TouchableOpacity onPress={ () => this.props.navigation.navigate('Camera')}>
					<Image style={estilos.imagem} source={require('../imagens/camm.png')} />
				</TouchableOpacity>	
				<TouchableOpacity onPress={ () => this.props.navigation.navigate('Voice')}>
					<Image style={estilos.imagem} source={require('../imagens/docm.png')} />
				</TouchableOpacity>		
			</View>
		);
	}
}