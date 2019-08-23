import React from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Button,
  Clipboard,
  FlatList,
  Image,
  Platform,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";
import { Constants } from "expo";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import uuid from "uuid";
import Environment from "../config/environment";
import firebase from "../config/firebase";
import { Audio } from 'expo-av';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import * as Speech from 'expo-speech';
import axios from 'axios';

console.disableYellowBox = true;
var oquefalar='';
let results = '';
let uploadUrl = '';

export default class HomeScreen extends React.Component {
  speak() {
    var falar = oquefalar;
    Speech.speak(falar);
  }

  state = {
    image: null,
    uploading: false,
    googleResponse: null,
    axiosResponse: null
  };

  async componentDidMount() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.RECORD_AUDIO);
    await Permissions.askAsync(Permissions.READ_EXTERNAL_STORAGE);
  }

  async componentWillMount() {
    this.backgroundMusic = new Audio.Sound();
    try {
      await this.backgroundMusic.loadAsync(
        require("../sounds/telaInicial.mp3")
      );
      await this.backgroundMusic.setIsLoopingAsync(false);
      await this.backgroundMusic.playAsync();
      // Your sound is playing!
    } catch (error) {
      // An error occurred!
    }
  }

  componentDidMount() {
     BackHandler.addEventListener('hardwareBackPress', () => { return true; });
  }

  render() {
    let { image } = this.state;

    return (
      <View style={styles.container} onLoad={this.backgroundMusic.playAsync()}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._pickImage}>
              <Image style={styles.imagem} source={require('../imagens/add.png')} />
            </TouchableOpacity>

            <TouchableOpacity onPress={this._takePhoto}>
              <Image style={styles.imagem} source={require('../imagens/cam.png')} />
            </TouchableOpacity>

            {this.state.axiosResponse && (
              <Text style={styles.texto}>
                Resultado: {results}
              </Text>
            )}
            {this._maybeRenderImage()}
            {this._maybeRenderUploadingOverlay()}
          </View>
        </ScrollView>
      </View>
    );
  }

  organize = array => {
    return array.map(function(item, i) {
      return (
        <View key={i}>
          <Text>{item}</Text>
        </View>
      );
    });
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0,0,0,0.4)",
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let { image, googleResponse } = this.state;
    if (!image) {
      return;
    }

    return (
      <View
        style={{
          marginTop: 20,
          width: 250,
          borderRadius: 3,
          elevation: 2
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          onPress={this.teste}
          title="Procurar texto"
        />

        <View
          style={{
            borderTopRightRadius: 3,
            borderTopLeftRadius: 3,
            shadowColor: "rgba(0,0,0,1)",
            shadowOpacity: 0.2,
            shadowOffset: { width: 4, height: 4 },
            shadowRadius: 5,
            overflow: "hidden",
            color: 'white'
          }}
        >
          <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
        </View>
        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={{ paddingVertical: 10, paddingHorizontal: 10 }}
        />

        <Text>Raw JSON:</Text>

        {googleResponse && (
          <Text
            onPress={this._copyToClipboard}
            onLongPress={this._share}
            style={{ paddingVertical: 10, paddingHorizontal: 10 }}
          >
            JSON.stringify(googleResponse.responses)
          </Text>
        )}
      </View>
    );
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = item => {
    <Text>response: {JSON.stringify(item)}</Text>;
  };

  _share = () => {
    Share.share({
      message: JSON.stringify(this.state.googleResponse.responses),
      title: "Confira",
      url: this.state.image
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    Alert.alert('Sucesso','Copiado para área de transferência');
    oquefalar = 'Copiado para área de transferência'
    {this.speak()}
    oquefalar = ''
  };

  _takePhoto = async () => {
    oquefalar = 'Abrindo câmera'
    {this.speak()}
    oquefalar = ''
    {this.backgroundMusic.stopAsync()}
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4,3]
    });

    this._handleImagePicked(pickerResult);
  };

  _pickImage = async () => {
    oquefalar = 'Abrindo recentes'
    {this.speak()}
    oquefalar = ''
    {this.backgroundMusic.stopAsync()}
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    this._handleImagePicked(pickerResult);
  };

  _handleImagePicked = async pickerResult => {
    try {
      this.setState({ uploading: true });

      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri);
        this.setState({ image: uploadUrl });
      }
    } catch (e) {
      console.log(e);
      Alert.alert('Erro','Upload falhou :(');
      oquefalar = 'Upload falhou'
      {this.speak()}
      oquefalar = ''
    } finally {
      this.setState({ uploading: false });
    }
  };

  submitToGoogle = async () => {
    oquefalar = 'Procurando texto'
    {this.speak()}
    oquefalar = ''
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let { response } = "";
      let body = JSON.stringify({
        requests: [
          {
            image: {
              source: {
                imageUri: image
              }
            },
            features: [
              { type: "TEXT_DETECTION"}
            ]
          }
        ]
      });
      response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          Environment["GOOGLE_CLOUD_VISION_API_KEY"],
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );

      body = {
        "requests": [
          {
            "image": {
              "source": {
                "imageUri": image
              }
            },
            "features": [
              {
                "type": "TEXT_DETECTION",
                "maxResults": 1
              }
            ]
          }
        ]
      }
      axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyBWJs9JaNsnzejUVXzVB6P7dLlvpi5y9fw', body)
  .then((response) => console.log(response));

      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
   teste = async () => {
    try{
      this.setState({ uploading: true });
      let response='';
      let apikey = 'b4d064d7c788957';
      let image = uploadUrl;
      response = axios.get('https://api.ocr.space/parse/imageurl?apikey=' + apikey + '&url=' + image + '&language=por&isOverlayRequired=false')
        .then(function(response) {
          results = response.data.ParsedResults[0].ParsedText;
          console.log(response);
        }).catch(function(error) {
          console.log(error);
        });
      let responseJson = await response;
      this.setState({
        axiosResponse: results,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };
}

async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError("Falha de conexão"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase
    .storage()
    .ref()
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
    color: 'white'
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30,
    color: 'white'
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },

  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },

  helpContainer: {
    alignItems: "center",
    backgroundColor: 'black',
    color: 'white'
  },

  texto: {
  	color: 'white'
  },

  imagem: {
  	margin: 10,
  	width: 280,
  	height: 280
  }
});