// import React, { Component } from 'react';
// import { View, Alert } from 'react-native';
// import { Navigation, Splash } from './screens';

// import DeviceStorage from './services/DeviceStorage';

// const TestFairy = require('react-native-testfairy');

// export default class LeftScreen extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       splash: true
//     };
//   }

//   async componentDidMount(){
//     this.startTestFairyNoRecording();

//     setTimeout(() => this.setState({splash: false}), 2000);
//   }

//   componentWillUnmount(){
//     TestFairy.stop();
//   }

//   askRecordingPermission = () => {
//     Alert.alert(
//       "Session Recording Permission",
//       "Session recording permission is required to improve usability in the future.",
//       [
//         {
//           text: "Cancel",
//           style: 'cancel',
//         },
//         { 
//           text: "Allow",
//           onPress: this.startTestFairy
//         },
//       ],
//       { cancelable: false }
//     );
//   }

//   startTestFairy = async () => {
//     await DeviceStorage.set('recordingPermission', 'true');
//     TestFairy.setServerEndpoint("https://coldbrew.testfairy.com");
//     TestFairy.begin("SDK-fWN6ojh8");
//   }

//   startTestFairyNoRecording = async () => {
//     TestFairy.disableVideo();
//     TestFairy.setServerEndpoint("https://coldbrew.testfairy.com");
//     TestFairy.begin("SDK-fWN6ojh8");
//   }

//   render(){
//     let { splash } = this.state;
//     return (
//       <View>
//         {splash ? <Splash /> : <Navigation />}
//       </View>
//     );
//   }
// }

import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@modules';

import AppContainer from '@navigations';

LogBox.ignoreAllLogs(true);

export default App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContainer />
      </PersistGate>
    </Provider>
  );
}