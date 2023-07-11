import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Map from '../components/Map';

const PickDropLocation = ({navigation}) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  const [pickupCoordinates, setPickupCoordinates] = useState()
  const [dropCoordinates, setDropCoordinates] = useState()

  const handlePickupLocation = (data, details) => {
    setPickupLocation(data.description);
    setPickupCoordinates(details.geometry.location)
  };
  
  const handleDropLocation = (data, details) => {
    setDropLocation(data.description);
    setDropCoordinates(details.geometry.location)
  };

  const autocompleteStyles = {
    textInput: {
      color: 'black', // Set the color of the text
      zIndex: 1,
      fontFamily: 'Montserrat-Medium',
    },
    listView: {
      backgroundColor: 'black',
      position: 'absolute',
      top: 45,
      zIndex: 999,
      height: 250,
    },
    // Add other custom styles if needed
  };

  const renderRow = rowData => {
    // Customize the text color of each suggestion item
    return (
      <Text style={{color: 'black', zIndex: 999}}>{rowData.description}</Text>
    );
  };

  const dropAutocompleteStyles = {
    ...autocompleteStyles,
    listView: {
      ...autocompleteStyles.listView,
    },
  };


  return (
    <View style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <View style={styles.pickupcontainer}>
          <GooglePlacesAutocomplete
            placeholder="Pickup Location"
            placeholderTextColor="black"
            fetchDetails={true}
            onPress={handlePickupLocation}
            query={{
              key: 'AIzaSyCUv7yJhnaMgU11mS-zDn9kCf9BklvsMsw',
              language: 'en',
            }}
            styles={autocompleteStyles}
            renderRow={renderRow} // Add the renderRow prop
          />
        </View>
        <View style={styles.droplocationcontiner}>
          <GooglePlacesAutocomplete
            placeholder="Drop Location"
            placeholderTextColor="black"
            fetchDetails={true}
            onPress={handleDropLocation}
            query={{
              key: 'AIzaSyCUv7yJhnaMgU11mS-zDn9kCf9BklvsMsw',
              language: 'en',
            }}
            styles={dropAutocompleteStyles} // Use the modified dropAutocompleteStyles for drop location
            renderRow={renderRow} // Add the renderRow prop
          />
        </View>
      </View>
      <Map pickupCoordinates={pickupCoordinates} dropCoordinates={dropCoordinates}/>
      {/* <View>
        <TouchableOpacity onPress={() => {
          console.log(pickupLocation);
          console.log(dropLocation);
          navigation.navigate('Home', { pickupLocation: pickupLocation, dropLocation: dropLocation });
        }}>
          <Text style={{ color: 'black' }}>
            Press
          </Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.submitbuttoncontainer}>
        <TouchableOpacity
          style={styles.submitbutton}
          onPress={() => {
            navigation.navigate('Home', {
              pickupLocation: pickupLocation,
              dropLocation: dropLocation,
            });
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontFamily: 'Montserrat-Bold',
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 36,
    paddingHorizontal: 8,
  },
  inputContainer:{
    display:'flex',
    justifyContent:'space-around',
    marginBottom:24
  },
  pickupcontainer: {
    // backgroundColor:'red',
    width: '100%',
    height: '7%',
  },
  droplocationcontiner: {
    // backgroundColor:'red',
    width: '100%',
    height: '10%',
  },
  submitbuttoncontainer: {
    width: '100%',
    height: 50,
    // backgroundColor:'blue',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  submitbutton: {
    backgroundColor: '#0056FB',
    height: '90%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0056FB',
    borderRadius: 10,
  },
});

export default PickDropLocation;
