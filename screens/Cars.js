import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';

const Cars = ({route, navigation}) => {
  const {responseData, pickupLocation,startdate} = route.params;
  const dateTimeString = startdate;
  const dateTime = new Date(dateTimeString);

  const formattedDate = dateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  console.log(formattedDate);
  console.log(formattedTime);
  const numberString = responseData.data[0].bucketPrice;

// Using parseInt
const number = parseInt(numberString, 10);
const resultPrice = (number)/10
// Output: 52




  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
      {/* <TouchableOpacity onPress={()=> {
        console.log(responseData)
      }}>
        <Text style={{color:'black',fontSize:25}}>
            Cars
        </Text>
      </TouchableOpacity> */}
      <View style={styles.navbar}>
        <View style={styles.left}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Image source={require('../assets/ep_back.png')} />
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={{fontSize: 20, color: '#7F7F73'}}>Cars</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.right}>
          <Image source={require('../assets/share-icon.png')} />
          <Image source={require('../assets/search-icon.png')} />
        </View> */}
      </View>
      <View style={styles.pickupLocationcontainer}>
        <View style={styles.pickuptext}>
          <Text style={{color: '#7F7F73'}}>
            Pickup Location:
          </Text>
          <Text style={{color:'black'}}>{pickupLocation}</Text>
          <Text style={{color: 'black'}}>{formattedDate}</Text>
          <Text style={{color: 'black'}}>{formattedTime}</Text>
        </View>
        <View style={styles.filterimage}>
          <Image source={require('../assets/Filter.png')} />
        </View>
      </View>
      <View style={styles.cartemplate}>
        <View style={styles.top}>
        <View style={styles.imagecontainer}>
        <Image
          source={{uri: responseData.data[0].images.front}}
          style={{width: '100%', height: '100%'}}
        />
        </View>
          <View style={styles.carinfocontainer}>
            <View style={styles.carinfo}>
              <View style={styles.sixseaters}>
                <Image
                  source={require('../assets/users-xl.png')}
                  resizeMode="center"
                  style={styles.imagex}
                />
                <Text style={{color: '#7F7F73'}}>{responseData.data[0].passengerLimit} seater</Text>
              </View>
              <View style={styles.ac}>
                <Image
                  source={require('../assets/ac-xl.png')}
                  resizeMode="center"
                  style={styles.imagex}
                />
                <Text style={{color: '#7F7F73'}}>ac</Text>
              </View>
              <View style={styles.spedometer}>
                <Image
                  source={require('../assets/spedometer-xl.png')}
                  resizeMode="center"
                  style={styles.imagex}
                />
                <Text style={{color: '#7F7F73'}}>12km/hr</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.left2}>
            <Text style={{color:'black',fontSize:18,fontFamily:'Oswald-Medium'}}>{responseData.data[0].vehicleModel}</Text>
            <Text style={{color: '#7F7F73'}}>Book now at just</Text>
            <Text style={styles.twoninenineseven}>₹{resultPrice}</Text>
            <Text style={{color: '#7F7F73'}}>Pay the rest later </Text>
          </View>
          <View style={styles.right2}>
            <Text style={styles.eightsixtwozero}>₹{responseData.data[0].bucketPrice}</Text>
            <TouchableOpacity
              style={styles.rentnowbtn}
              onPress={() => navigation.navigate('CarDetails',{responseData:responseData})}>
              <Text style={styles.rentnowbtntext}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
};

export default Cars;

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
    width: '25%',
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
  pickupLocationcontainer: {
    // backgroundColor:'red',
    width: '100%',
    height: 100,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 100
  },
  pickuptext: {
    borderWidth: 1,
    borderColor: '#0056FB',
    borderRadius: 10,
    width: '86%',
    height: '90%',
    justifyContent: 'center',
    padding: 5,
  },
  cartemplate: {
    width: '100%',
    height: 350,
    backgroundColor: 'lightgrey',
    marginTop: 20,
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  top: {
    height: '60.5%',
    backgroundColor:'pink',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  mainimage: {
    position: 'absolute',
    top: 50,
    right: 100,
    zIndex: 1,
    width: '100%',
  },
  carinfocontainer: {
    height: '40%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  bottom: {
    height: '39.4%',
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',

    paddingTop: 40,
    marginTop: 2,
  },
  sixseaters: {
    width: 60,
    height: 60,
    // backgroundColor:'indigo',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  ac: {
    width: 50,
    height: 50,
    // backgroundColor:'indigo',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  spedometer: {
    width: 60,
    height: 60,
    // backgroundColor:'indigo',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  imagex: {
    width: 40,
    height: 40,
  },
  // mainimage: {

  // },
  // bottom: {
  //   flexDirection: "row",
  //   backgroundColor: "white",
  //   paddingHorizontal: 25,
  //   marginTop: 5,
  //   height: 128,
  // },
  left2: {
    width: '50%',
    height: 150,
    // backgroundColor:'pink',
    // justifyContent:'center'
    marginTop: 10,
    paddingHorizontal: 10,
  },
  right2: {
    width: '50%',
    alignItems: 'flex-end',
    height: 150,
    // justifyContent: "center",

    // backgroundColor: "red",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  eightsixtwozero: {
    fontSize: 25,
    color: '#0056FB',
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
  // marutisuzukitext: {
  //   fontFamily: 'oswald',
  //   fontSize: 18,
  //   color: '#7F7F73',
  // },
  twoninenineseven: {
    color: '#0056FB',
  },
  carinfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50%",
    // backgroundColor:'green',
    marginTop: 18,
  },
  imagecontainer: {
    width:'100%',
    height:'100%',
    // backgroundColor:'indigo'

  }
});
