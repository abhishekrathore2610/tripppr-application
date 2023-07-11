import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Map = ({pickupCoordinates, dropCoordinates}) => {
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    if (pickupCoordinates && dropCoordinates) {
      const latDelta =
        Math.abs(pickupCoordinates.lat - dropCoordinates.lat) + 1;
      const lngDelta =
        Math.abs(pickupCoordinates.lng - dropCoordinates.lng) + 1;

      const centerLat = (pickupCoordinates.lat + dropCoordinates.lat) / 2;
      const centerLng = (pickupCoordinates.lng + dropCoordinates.lng) / 2;

      const newRegion = {
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: latDelta,
        longitudeDelta: lngDelta,
      };

      setMapRegion(newRegion);
    }
  }, [pickupCoordinates, dropCoordinates]);

  
  return (
    <MapView
      style={{flex: 1}}
      region={mapRegion}
      initialRegion={{
        latitude: 12.9716,
        longitude: 77.5946,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {pickupCoordinates && (
        <Marker
          coordinate={{
            latitude: pickupCoordinates.lat,
            longitude: pickupCoordinates.lng,
          }}
          title="Start">
          <Image
            source={require('../assets/car-icon.png')}
            style={{width: 45, height: 45}}
          />
        </Marker>
      )}
      {dropCoordinates && (
        <Marker
          coordinate={{
            latitude: dropCoordinates.lat,
            longitude: dropCoordinates.lng,
          }}
          title="End">
          <Image
            source={require('../assets/house-icon.png')}
            style={{width: 45, height: 45}}
          />
        </Marker>
      )}

      {pickupCoordinates && dropCoordinates && (
        <MapViewDirections
          origin={{
            latitude: pickupCoordinates.lat,
            longitude: pickupCoordinates.lng,
          }}
          destination={{
            latitude: dropCoordinates.lat,
            longitude: dropCoordinates.lng,
          }}
          apikey="AIzaSyDPRS6TbK83pz_ILgjpsRsbuLT-14lri9I"
          strokeWidth={3}
          strokeColor="blue"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
