import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import Swiper from 'react-native-swiper';

const CarDetails = ({navigation, route}) => {
  const {responseData} = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require('../assets/ep_back.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 20, color: '#7F7F73'}}>Cars Details</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.right}>
          <Image source={require('../assets/share-icon.png')} />
          <Image source={require('../assets/search-icon.png')} />
        </View> */}
      </View>
      <View style={styles.imageswipers}>
        <Swiper style={styles.swiperconatiner} loop={false}>
        <Image
          source={{uri: responseData.data[0].images.front}}
          style={{width: '100%', height: '100%'}}
        />
          <Image
          source={{uri: responseData.data[0].images.rear}}
          style={{width: '100%', height: '100%'}}
        />
        <Image
          source={{uri: responseData.data[0].images.interior[0]}}
          style={{width: '100%', height: '100%'}}
        />
        <Image
          source={{uri: responseData.data[0].images.interior[1]}}
          style={{width: '100%', height: '100%'}}
        />
          <Image
          source={{uri: responseData.data[0].images.interior[2]}}
          style={{width: '100%', height: '100%'}}
        />
        </Swiper>
      </View>
      <View style={styles.carinteriorcontainer}>
      <Image
          source={{uri: responseData.data[0].images.interior[0]}}
          style={styles.carinterior}
          
        />
        <Image
          source={{uri: responseData.data[0].images.interior[1]}}
          style={styles.carinterior}
          
        />
       <Image
          source={{uri: responseData.data[0].images.interior[2]}}
          style={styles.carinterior}
          
        />
      </View>
      <View style={styles.cardetailcontianer}>
        <Text style={{fontFamily: 'Oswald-Medium', fontSize: 25,color:'black'}}>
          {responseData.data[0].vehicleModel}
        </Text>
        <View style={styles.discription}>
          <View style={styles.typecontainer}>
            <Text style={{fontSize: 20,color:'black'}}>Type:</Text>
            <Text style={{fontSize: 20,color:'black'}}>Bus</Text>
          </View>
          <View style={styles.capacitycontainer}>
            <Text style={{fontSize: 20,color:'black'}}>Capacity: </Text>
            <Text style={{fontSize: 20,color:'black'}}>{responseData.data[0].passengerLimit}</Text>
          </View>
        </View>
        <View style={styles.bluetickcont}>
          <Image source={require('../assets/blue-tick.png')} />
          <Text style={{fontSize: 20,color:'black'}}>
            Music System is present in the vehical
          </Text>
        </View>
        <View style={styles.bluetickcont}>
          <Image source={require('../assets/blue-tick.png')} />
          <Text style={{fontSize: 20,color:'black'}}>Travelling with a Pet</Text>
        </View>
        <Text style={{color:'black'}}>
          Driver''s details will be shared after cpmpletion of booking
        </Text>
        <View style={styles.pricerentnowcontainer}>
          <Text style={{fontSize: 25, color: '#0056FB', fontWeight: 700}}>
            ₹ {responseData.data[0].bucketPrice}
          </Text>
          <TouchableOpacity style={styles.rentnowbtn}>
            <Text style={styles.rentnowbtntext}>Rent Now</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.exclusioncontainer}>
        <Text style={{fontSize: 25, fontWeight: 600,color:'black'}}>Exclusion</Text>
        <View style={styles.exclusion}>
          <View style={styles.exclusion1}>
            <Image source={require('../assets/i-sign.png')} />
            <Text style={{fontSize: 18,color:'black'}}>Interstate text not included</Text>
          </View>
          <View style={styles.exclusion1}>
            <Image source={require('../assets/i-sign.png')} />
            <Text style={{fontSize: 18,color:'black'}}>Toll charges not included</Text>
          </View>
        </View>
      </View>
      <View style={styles.safetycontainer}>
        <View style={styles.safetylogocontainer}>
          <Image source={require('../assets/plus-sign.png')} />
          <Text style={{fontSize: 25, fontWeight: 600,color:'black'}}>Safety</Text>
        </View>
        <Text style={{fontSize: 18,color:'black'}}>Your safety is our top priority</Text>
        <View style={styles.safety}>
          <View style={styles.safety1}>
            <Image source={require('../assets/mask.png')} />
            <Text style={{fontSize: 18,color:'black'}}>Driver with Mask</Text>
          </View>
          <View style={styles.safety1}>
            <Image source={require('../assets/arogyasetu.png')} />
            <Text style={{fontSize: 18,color:'black'}}>Drivers with Arogya Setu App </Text>
          </View>
          <View style={styles.safety1}>
            <Image source={require('../assets/handsanitizer.png')} />
            <Text style={{fontSize: 18,color:'black'}}>Hand Sanitizers </Text>
          </View>
          <View style={styles.safety1}>
            <Image source={require('../assets/sanitizedvehical.png')} />
            <Text style={{fontSize: 18,color:'black'}}>Sanitized Vehicles</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default CarDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height:'100%',
    // backgroundColor: "red",
    padding: 8,
    gap: 10,
    backgroundColor: '#F7F2F1',
  },
  left: {
    flexDirection: 'row',
    gap: 20,
    width: 120,
    // backgroundColor:'red',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    gap: 20,
    width: 80,
    // backgroundColor:'red',
    justifyContent: 'space-between',
  },
  hometext: {
    fontSize: 22,
    fontFamily: 'roboto',
    color: '#7F7F73',
  },
  navbar: {
    width: '100%',
    // backgroundColor: "aqua",
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
  },
  imageswipers: {
    width: '100%',
    height: 250,
    // backgroundColor:'pink'
    // justifyContent:'center',
    // alignItems:'center'
    flex: 1,
    marginBottom: 40,
    marginTop:20
  },
  swiperconatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red',
    // paddingHorizontal: '25%',
    // paddingVertical: '35%',

    // flex:1
  },

  carinterior: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  carinteriorcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cardetailcontianer: {
    width: '100%',
    height: 280,
    backgroundColor: '#E0F2F3',
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
  },
  discription: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  typecontainer: {
    flexDirection: 'row',
  },
  capacitycontainer: {
    flexDirection: 'row',
  },
  bluetickcont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 10,
  },
  pricerentnowcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  rentnowbtn: {
    backgroundColor: '#0056FB',
    height: 50,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10,
  },
  rentnowbtntext: {
    color: 'white',
    fontSize: 16,
  },
  exclusioncontainer: {
    width: '100%',
    height: 100,
    // backgroundColor: "yellow",
    marginTop: 15,
  },
  exclusion1: {
    flexDirection: 'row',
    gap: 10,
  },
  exclusion: {
    width: '100%',
    // backgroundColor: "red",
    marginTop: 20,
  },

  safetycontainer: {
    width: '100%',
    height: 200,
    // backgroundColor:'pink',
    marginTop: 25,
  },
  safetylogocontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // backgroundColor:'red',
    marginBottom: 5,
  },
  safety: {
    // backgroundColor:'violet',
    height: 100,
    width: '100%',
    marginTop: 10,
  },
  safety1: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
});
