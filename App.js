/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const mensagem = Platform.select({
  ios: 'IOS é ruim',
  android: 
    'Espero que esteja funcionando bem!\n' +
    'Divirta-se',
}); 

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Bem vindo ao meu novo APP!</Text>
        <Text style={styles.instructions}>{mensagem}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5A9A9',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#0000FF',
  },
  instructions: {
    textAlign: 'center',
    color: '#0040FF',
    marginBottom: 5,
  },
});
