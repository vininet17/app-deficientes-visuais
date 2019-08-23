import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';

var SoundPlayer = require('react-native-sound');

var song = null;

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pause: false,
    };
  }

  //componentWillMount() {
    //song = new SoundPlayer('ola.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
    //  if(error)
      //  ToastAndroid.show('Error when init SoundPlayer :(((', ToastAndroid.SHORT);
    //});
 // }

  onPressButtonPlay() {
    song = new SoundPlayer('ola.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
      if(error)
        ToastAndroid.show('Error when init SoundPlayer :(((', ToastAndroid.SHORT);
      else {
        song.play((success) => {
          if(!success)
            ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
        });
      }
    });

   // if(song != null) {
     // song.play((success) => {
    //    if(!success)
    //      ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
    //  });
    //}
  }

  onPressButtonPause() {
    if(song != null) {
      if(this.state.pause) // play resume
        song.play((success) => {
          if(!success)
            ToastAndroid.show('Error when play SoundPlayer :(((', ToastAndroid.SHORT);
        });
      else song.pause();

      this.setState({pause: !this.state.pause});
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onPressButtonPlay.bind(this)}>
          <Text style={styles.buttonText}>Play</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.onPressButtonPause.bind(this)}>
          <Text style={styles.buttonText}>{this.state.pause ? 'Resume' : 'Pause'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonText: {
    fontSize: 30,
  },
});

