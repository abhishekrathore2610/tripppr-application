import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const PickDropLocation = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');

  const handlePickupLocation = (data, details) => {
    setPickupLocation(data.description);
  };

  const handleDropLocation = (data, details) => {
    setDropLocation(data.description);
  };

  const autocompleteStyles = {
    textInput: {
      color: 'black', // Set the color of the text
    },
    listView: {
      backgroundColor: 'white', // Set the background color of the suggestions list
    },
    // Add other custom styles if needed
  };

  const renderRow = (rowData) => {
    // Customize the text color of each suggestion item
    return (
      <Text style={{ color: 'black' }}>{rowData.description}</Text>
    );
  };

  const dropAutocompleteStyles = {
    ...autocompleteStyles,
    listView: {
      ...autocompleteStyles.listView,
      top: 30, // Adjust the top position to bring the suggestion list closer to the pickup location
    },
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickupcontainer}>
        <Text style={{color:'black'}}>Pickup Location</Text>
        <GooglePlacesAutocomplete
        placeholder='Pickup Location'
        placeholderTextColor="black"
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
        <Text style={{color:'black'}}>Drop Location:</Text>
        <GooglePlacesAutocomplete
        placeholder='Drop Location'
        placeholderTextColor="black"
        onPress={handleDropLocation}
        query={{
          key: 'AIzaSyCUv7yJhnaMgU11mS-zDn9kCf9BklvsMsw',
          language: 'en',
        }}
        styles={dropAutocompleteStyles} // Use the modified dropAutocompleteStyles for drop location
        renderRow={renderRow} // Add the renderRow prop
      />
      </View>
      
      
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
        <TouchableOpacity style={styles.submitbutton} onPress={() => {
          navigation.navigate('Home', { pickupLocation: pickupLocation, dropLocation: dropLocation });
        }}>
          <Text style={{fontSize: 23, color: 'white'}}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  pickupcontainer: {
    // backgroundColor:'red',
    width:'100%',
    height:'40%'
  },
  droplocationcontiner: {
    // backgroundColor:'red',
    width:'100%',
    height:'40%'
  },
  submitbuttoncontainer: {
    width: '100%',
    height: 50,
    // backgroundColor:'blue',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
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
