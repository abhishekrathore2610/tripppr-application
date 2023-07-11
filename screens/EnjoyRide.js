import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
// import { EvilIcons } from '@expo/vector-icons';

const EnjoyTrip = props => {
  return (
    <View style={styles.container}>
      <View style={styles.uppercontainer}>
        
        <Image
          source={require('../assets/enjoy-trip-new.png')}
          style={styles.image1}
        />
      </View>
      <View style={styles.lowercontainer}>
        <Image
          source={require('../assets/backgroung-one.png')}
          resizeMode="cover"
          style={styles.image2}
        />
        <View style={styles.buttoncontainer}></View>

        <Text style={styles.text1}>Enjoy your Trip</Text>
        <Text style={styles.text2}>
          Discover new places and share with your friends and travel together
        </Text>

        <TouchableOpacity
          onPress={() => props.navi.navigate('Login')}
          style={styles.arrowbtn}>
          <Image style={{width:48, height:48}} source={require('../assets/next-arrow-icon.png')}/> 
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EnjoyTrip;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  uppercontainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    position:'relative'
  },
  lowercontainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    width: '100%',
    alignContent: 'center',
    position: 'relative',
  },

  image2: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  text1: {
    position: 'absolute',
    bottom: '33%',
    textAlign: 'center',
    width: '100%',
    fontSize: 22,
    fontFamily:'Montserrat-Bold',
    color: '#5158D5',
    fontWeight: '400',
    textTransform:'uppercase',

    // letterSpacing:'.5'
  },
  text2: {
    position: 'absolute',
    bottom: '14%',
    width:'100%',
    fontFamily:'Montserrat-Light',
    textAlign: 'center',
    color: '#9747FF',
    bottom: '20%',
    paddingHorizontal:16
    // fontFamily:'Montserrat',
    // letterSpacing:'.7'
  },
  image1: {
    width: '95%',
    height: '100%',
    resizeMode:'contain',
    marginTop:128
  },
  btn1: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    zIndex: 1,
  },
  btntext: {
    color: 'black',
  },
  buttoncontainer: {
    position: 'absolute',
    right: 0,
    bottom: '33%',
  },
  arrowbtn: {
    position:'absolute',
    right:15,
    bottom:10,
    zIndex:100
  },
});