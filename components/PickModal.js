import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const PickModal = ({showPopup, handleClose}) => {
  const renderRow = rowData => {
    // Customize the text color of each suggestion item
    return <Text style={{color: 'black'}}>{rowData.description}</Text>;
  };
  return (
    <Modal visible={showPopup} animationType="fade" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={{width:'100%', height:45}}>
            <GooglePlacesAutocomplete
              placeholder="Pickup Location"
              placeholderTextColor="black"
              query={{
                key: 'AIzaSyCUv7yJhnaMgU11mS-zDn9kCf9BklvsMsw',
                language: 'en',
              }}
              renderRow={renderRow} // Add the renderRow prop
            />
          </View>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default PickModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '95%',
    height: 350,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
});
