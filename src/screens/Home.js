import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, PermissionsAndroid, Platform
} from 'react-native';
import { useDispatch } from "react-redux";

import { setSelectedFeature } from '@modules/reducers/cafe/actions';

import Geolocation from '@react-native-community/geolocation';
// import MapboxGL from "@react-native-mapbox-gl/maps";

Geolocation.setRNConfiguration({ skipPermissionRequests: false, authorizationLevel: 'whenInUse' });
// MapboxGL.setAccessToken("pk.eyJ1IjoiY2hlYnVyaXNoa2EiLCJhIjoiY2s2OGYwaGU2MDM5eTNwbzNpc3FjZTA5dCJ9.oZPv-zYK0gJMsNUpGyiVMA");

import FeatureCollection from '../data/FeatureCollection';
import CafeMap from './CafeMap';
import CafeModal from './CafeModal';

const markerData = FeatureCollection.features;

const FirstMarkerCoords = [
  markerData[0].properties.LONGITUDE,
  markerData[0].properties.LATITUDE
]

export default Home = (props) => {
  const dispatch = useDispatch();

  const [featureCollection, setFeatureCollection] = useState(props.route.params.featureCollection);
  const [currentCoords, setCurrentCoords] = useState(FirstMarkerCoords);

  useEffect(() => {
    dispatch(setSelectedFeature(markerData[0].properties))
  }, []);

  return (
    <View style={styleOf.container}>
      <CafeMap featureCollection={featureCollection} currentCoords={currentCoords} />

      <CafeModal featureCollection={featureCollection} style={styleOf.madal} />

    </View>
  );
}

const styleOf = StyleSheet.create({
  container: {
    flex: 1,
  },
  madal: {
    zIndex: 1
  }
});
