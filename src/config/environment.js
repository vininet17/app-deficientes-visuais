var environments = {
  staging: {
    FIREBASE_API_KEY: 'AIzaSyBGHdlA0wWuJ7YA_E5h1kPFFSS2yx_HIOQ',
    FIREBASE_AUTH_DOMAIN: 'sees-39e09.firebaseapp.com',
    FIREBASE_DATABASE_URL: 'https://sees-39e09.firebaseio.com',
    FIREBASE_PROJECT_ID: 'sees-39e09',
    FIREBASE_STORAGE_BUCKET: 'sees-39e09.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '626494768283',
    GOOGLE_CLOUD_VISION_API_KEY: 'AIzaSyBWJs9JaNsnzejUVXzVB6P7dLlvpi5y9fw'
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  }
};

function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return 'staging';
  } else if (releaseChannel === 'staging') {
    return 'staging';
  } else {
    return 'staging';
  }
}
function getEnvironment(env) {
  console.log('Release Channel: ', getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;