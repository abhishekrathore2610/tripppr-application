import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';

const HomestayDetail = ({route, navigation}) => {
  const {item} = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const renderPhotos = () => {
    return item.bestImages.map((photo, index) => (
      <TouchableOpacity key={index} onPress={() => handlePhotoPress(index)}>
        <Image source={{ uri: photo }} style={styles.photo} />
      </TouchableOpacity>
    ));
  };
  const handlePhotoPress = (index) => {
    // Handle photo press event here
    console.log('Photo Pressed:', index);
  };
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  // const [modalVisible, setModalVisible] = useState(false);
  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };
  const generalAmenities = item.general_amenities;
  const renderGrid = () => {
    const gridItems = [];

    for (let i = 0; i < generalAmenities.length; i += 2) {
      const rowItems = [];

      for (let j = i; j < i + 2 && j < generalAmenities.length; j++) {
        rowItems.push(
          <View key={generalAmenities[j]} style={styles.item}>
            <Text style={styles.itemText}>{generalAmenities[j]}</Text>
          </View>,
        );
      }

      gridItems.push(
        <View key={i} style={styles.row}>
          {rowItems}
        </View>,
      );
    }

    return gridItems;
  };

  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={require('../assets/ep_back.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 20, color: '#7F7F73'}}>
              Homestay Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.mainimage1}>
        <Image
          source={{uri: item.photos[0]}}
          style={{width: '100%', height: '100%'}}
        />
      </View>
      <TouchableOpacity
        style={styles.mainimage2}
        onPress={toggleModal}
        >
        <Image
          source={{uri: item.photos[1]}}
          style={{width: '20%', height: '90%'}}
        />
        <Image
          source={{uri: item.photos[2]}}
          style={{width: '20%', height: '90%'}}
        />
      </TouchableOpacity>

      <View style={{marginTop: 10}}>
        <Text style={{color: 'black', fontSize: 23, fontWeight: 500}}>
          {item.property_name}
        </Text>
      </View>
      <View style={{marginTop: 10, flexDirection: 'row', gap: 10}}>
        <Image source={require('../assets/location-logo.png')} />
        <Text style={{color: 'black', fontSize: 23, fontWeight: 400}}>
          {item.city}
        </Text>
      </View>
      <View style={{flexDirection: 'row', paddingTop: 10}}>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 300}}>
          {item.allowed_guest} Guests,
        </Text>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 300}}>
          {item.number_of_bedrooms} Bedrooms,
        </Text>
        <Text style={{color: 'black', fontSize: 20, fontWeight: 300}}>
          {item.number_of_bathrooms} Bathroom
        </Text>
      </View>
      <View style={styles.popularamenities}>
        <Text style={{color:'black', fontSize:20}}>Popular Amenities:</Text>
        <View style={styles.amenitiescontainer}>{renderGrid()}</View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {renderPhotos()}
          </ScrollView>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
        </View>
      </Modal> */}
      
      {/* <Modal visible={isModalVisible} transparent>
  <View style={styles.modalContainer}>
    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
      <Text style={styles.closeButtonText}>Close</Text>
    </TouchableOpacity>
    <ScrollView
            horizontal
            pagingEnabled
            contentContainerStyle={styles.scrollViewContent}
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const scrollOffset = event.nativeEvent.contentOffset.x;
              const imageIndex = Math.floor(
                scrollOffset / (styles.modalImage.width + styles.scrollViewContent.paddingHorizontal)
              );
              setSelectedImageIndex(imageIndex);
            }}
            scrollEventThrottle={200}
          >
            {hsdata[0].photos.map((image, index) => (
              <View key={image.id} style={styles.slide}>
                <Image source={{ uri: image }} style={styles.modalImage} />
              </View>
            ))}
          </ScrollView>
  </View>
</Modal> */}
      {/* {selectedImageIndex !== null && (
        <TouchableOpacity onPress={() => handleImagePress(selectedImageIndex)}>
          <Image source={{ uri: hsdata[0].photos[0] }} style={styles.singleImage} />
        </TouchableOpacity>
      )} */}

      {/* <Modal visible={isModalVisible} transparent>
        <View style={styles.modalContainer}>
          {hsdata[0].bestImages.map((image, index) => (
            <TouchableOpacity
              key={image.id}
              onPress={() => handleImagePress(index)}
              style={styles.thumbnail}
            >
              <Image source={{ uri: image }} style={styles.thumbnailImage} />
            </TouchableOpacity>
          ))}
        </View>
      </Modal> */}
    </ScrollView>
  );
};

export default HomestayDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  navbar: {
    width: '100%',
    // backgroundColor: "aqua",
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  left: {
    flexDirection: 'row',
    width: '55%',
    // backgroundColor:'red',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    width: '20%',
    // backgroundColor:'red',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainimage1: {
    width: '100%',
    height: 250,
    backgroundColor: 'indigo',
    marginTop: 10,
  },
  mainimage2: {
    width: '100%',
    height: 100,
    // backgroundColor: 'red',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  item: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  amenitiescontainer: {
    width:'100%',
    backgroundColor:'lightblue',
    padding:5,
    borderRadius:10,
    marginBottom:20,
    marginTop:10

  },
  popularamenities: {
    marginTop: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding:5
  },
  photo: {
    width: 200,
    height: 200,
    marginRight: 10,
    marginTop:90
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  openButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  openButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  //   modalContainer: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //   },
  //   closeButton: {
  //     position: 'absolute',
  //     top: 16,
  //     right: 16,
  //     zIndex: 1,
  //   },
  //   closeButtonText: {
  //     color: '#fff',
  //     fontSize: 16,
  //   },
  //   slide: {
  //     flex: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     width: '100%',
  //   },
  //   modalImage: {
  //     width: 300,
  //     height: 300,
  //     resizeMode: 'contain',
  //   },
  //   scrollViewContent: {
  //     paddingHorizontal: 16,
  //   },
});
