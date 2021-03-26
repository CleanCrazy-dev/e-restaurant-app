import React, { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { Container } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CafeService } from "@modules/services";

import { 
  LightSplash_01,
  LightSplash_02,
  LightSplash_03,
  LightSplash_04,
  LightSplash_05 } from '@components/svgs';

import FeatureTemplate from '../data/FeatureTemplate';

export default Splash = (props) => {

  const [splashId, setSplashId] = useState(1);

  // const [featureCollection, setFeatureCollection] = useState(FeatureTemplate);

  useEffect(() => {
    CafeService.fetchFeatures()
      .then((response) => {
        const newFeatures = FeatureTemplate;
        newFeatures.features = response.features;

        // setFeatureCollection(newFeatures);

        setTimeout(() => props.navigation.push("Home", { featureCollection: newFeatures }), 1000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSplashId(splashId => (splashId == 4 ? 1 : splashId + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        {/* <ActivityIndicator style={styles.indicator} color={'#FFF'} />
        <Text style={styles.text}>Loading Application</Text> */}
        {splashId == 1 ? <LightSplash_01 /> : splashId == 2 ? <LightSplash_02 /> : splashId == 3 ? <LightSplash_03 /> : splashId == 4 ? <LightSplash_04 /> : <LightSplash_05 />}
      </View>
    </Container >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C5DD3'
  },
  indicator: {
    marginTop: 24
  },
  text: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF'
  }
});
