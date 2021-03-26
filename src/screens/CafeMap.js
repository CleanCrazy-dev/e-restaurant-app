import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, PermissionsAndroid,
  Dimensions, Platform
} from 'react-native';
import { useDispatch, useSelector } from "react-redux";

import Geolocation from '@react-native-community/geolocation';
import MapboxGL from "@react-native-mapbox-gl/maps";
import moment from 'moment';

Geolocation.setRNConfiguration({ skipPermissionRequests: false, authorizationLevel: 'whenInUse' });
MapboxGL.setAccessToken("pk.eyJ1IjoiY2hlYnVyaXNoa2EiLCJhIjoiY2s2OGYwaGU2MDM5eTNwbzNpc3FjZTA5dCJ9.oZPv-zYK0gJMsNUpGyiVMA");

import { MarkerLoader } from '@components';

import { setSelectedFeature, setSelectedFeatureIndex, setNormalCard, setSelectedSubFeatures, setSelectedSubFeatureIndex } from '@modules/reducers/cafe/actions';

import { isEmpty } from "@utils/functions";

import marker from '../assets/marker.png';
import markerPin from '../assets/marker-select.png';
import mylocation from '../assets/mylocation.png';

const { width, height } = Dimensions.get('window');

export default CafeMap = (props) => {
  const dispatch = useDispatch();

  const { selectedFeature, selectedFeatureIndex, normalCard } = useSelector((state) => state.cafe);

  const [featureCollection, setFeatureCollection] = useState(props.featureCollection);
  const [currentCoords, setCurrentCoords] = useState(props.currentCoords);
  const [coordinates, setCoordinates] = useState([]);
  const [markerLoading, setMarkerLoading] = useState(false);

  console.log("+++++++++++ Cafe Map : ", selectedFeatureIndex, normalCard, featureCollection.features.length);

  let _map = null;

  const createMarkers = () => {
    // TODO geoUtils not supported on mapbox^8.1.0
    // TODO upgrade required
    let localfeatureCollection = featureCollection;

    coordinates.forEach((coordinate, index) => {
      let feature = MapboxGL.geoUtils.makeFeature({ "type": "Point", "coordinates": coordinate });
      feature.id = `${Date.now()}`;
      feature.id = index;

      localfeatureCollection = MapboxGL.geoUtils.addToFeatureCollection(
        featureCollection,
        feature,
      )
    });

    setFeatureCollection(localfeatureCollection);
  }

  const touchScreenEvent = () => {
    setMarkerLoading(true);
    setTimeout(() => setMarkerLoading(false), 300);

    dispatch(setNormalCard(false));
  }


  const onMarkerPress = (e) => {
    const feature = e.features[0].properties;
    const features = featureCollection.features;

    const selected_feature = features.find(mrk => mrk.properties.ID === feature.ID);

    if (feature.ID) {
      const selected_index = features.findIndex(mrk => mrk.properties.ID === feature.ID);

      console.log(feature.ID, " :: ", selected_index);;

      dispatch(setSelectedFeature(selected_feature.properties));
      dispatch(setSelectedFeatureIndex(selected_index));

      dispatch(setNormalCard(true));

      getSubFeatures(Number(selected_feature.properties.LATITUDE), Number(selected_feature.properties.LONGITUDE));

      setMarkerLoading(false);
    }
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED || Platform.OS === 'ios') {
        console.log('Location permission granted.');
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords)
            setCurrentCoords([position.coords.longitude, position.coords.latitude]);
          },
          (error) => alert(error.message),
          {
            enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
          }
        );
      } else {
        console.log('Location permission denied.');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  }, [featureCollection]);

  useEffect(() => {
    getSubFeatures(Number(currentCoords[1]), Number(currentCoords[0]));
  }, [currentCoords]);

  const getSubFeatures = async (lat, lng) => {
    // dispatch(setSelectedSubFeatures([]));
    // dispatch(setSelectedSubFeatureIndex(0));
    try {
      let bounds = await _map.getVisibleBounds();

      console.log("Bounds : ", bounds);

      if (bounds.length == 2) {
        let lat1 = ((bounds[0][1] < bounds[1][1]) ? bounds[0][1] : bounds[1][1]);
        let lat2 = ((bounds[0][1] > bounds[1][1]) ? bounds[0][1] : bounds[1][1]);
        let lng1 = ((bounds[0][0] < bounds[1][0]) ? bounds[0][0] : bounds[1][0]);
        let lng2 = ((bounds[0][0] > bounds[1][0]) ? bounds[0][0] : bounds[1][0]);

        let subFeatures = [];
        let subFeatureIndex = 0;
        const features = featureCollection.features;
        features.map((item) => {
          if(Number(item.properties.LATITUDE) > lat1 && Number(item.properties.LATITUDE) < lat2 && Number(item.properties.LONGITUDE) > lng1 && Number(item.properties.LONGITUDE) < lng2) {
            subFeatures.push(item);
          }
        })

        subFeatures.map((item, index) => {
          if(item.properties.LATITUDE == lat && item.properties.LONGITUDE == lng) subFeatureIndex = index;
        })

        dispatch(setSelectedSubFeatures(subFeatures));
        dispatch(setSelectedSubFeatureIndex(subFeatureIndex));
      }
    } catch (err) {
      console.log("Error : ", err);
    }
  }

  return (
    <View style={styleOf.container}>
      <View onTouchStart={touchScreenEvent} style={styleOf.mapContainer}>
        <MapboxGL.MapView
          ref={(c) => _map = c}
          styleURL='mapbox://styles/cheburishka/ck6i9f74r06ar1jo4l4glr8dn'
          style={styleOf.map}
          showUserLocation={true}
          userTrackingMode={1}>
          <MapboxGL.UserLocation
            renderMode='normal'
            children={
              <MapboxGL.SymbolLayer
                symbolSortKey={1}
                id="locationSymbol"
                minZoomLevel={1}
                style={locationIcon}
              />
            }
          />

          <MapboxGL.Camera
            centerCoordinate={currentCoords}
            zoomLevel={17} />

          {(selectedFeature.length != 0) && (
            <MapboxGL.ShapeSource
              id="markersSource"
              onPress={onMarkerPress}
              hitbox={{ width: 20, height: 20 }}
              shape={featureCollection}
              cluster={true}
              clusterRadius={11}>
              <MapboxGL.SymbolLayer
                symbolSortKey={2}
                id="markerSymbols"
                minZoomLevel={1}
                filter={['!=', 'ID', selectedFeature.ID]}
                style={markerIcon}
              />
              <MapboxGL.SymbolLayer
                symbolSortKey={2}
                id="markerPinSymbols"
                minZoomLevel={1}
                filter={['==', 'ID', selectedFeature.ID]}
                style={markerPinIcon}
              />
            </MapboxGL.ShapeSource>
          )}

        </MapboxGL.MapView>
      </View>

      <MarkerLoader
        enabled={markerLoading}
        top={20}
      />

    </View>
  );
}

const styleOf = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});


const locationIcon = {
  iconImage: mylocation,
  iconAllowOverlap: true,
  textAllowOverlap: true,
  iconSize: 0.25,
  iconColor: '#ffffff',
  iconHaloColor: '#ffffff',
  symbolZOrder: 'auto',
};

const markerIcon = {
  iconImage: marker,
  iconAllowOverlap: true,
  textAllowOverlap: true,
  iconSize: 0.25,
  iconColor: '#ffffff',
  iconHaloColor: '#ffffff',
  symbolZOrder: 'auto',
};

const markerPinIcon = {
  iconImage: markerPin,
  iconAllowOverlap: true,
  textAllowOverlap: true,
  iconSize: 0.25,
  iconColor: '#ffffff',
  iconHaloColor: '#ffffff',
  symbolZOrder: 'auto',
};