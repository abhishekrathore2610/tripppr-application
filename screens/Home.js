import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Swiper from 'react-native-swiper';
import SwiperHomeStays from './SwiperHomeStays';

const Home = ({navigation, route}) => {
  const [buttonStates1, setButtonStates1] = useState([true, false, false]);
  const [buttonStates2, setButtonStates2] = useState([true, false, false]);
  const [passengers, setPassengers] = useState(0);

  // const [hsdata, sethsData] = useState([]);
  const dropLocation = route.params?.dropLocation;
  const pickupLocation = route.params?.pickupLocation;
  const handlePress1 = index => {
    const newButtonStates1 = [...buttonStates1];
    newButtonStates1.fill(false);
    newButtonStates1[index] = true;
    setButtonStates1(newButtonStates1);
  };

  const handlePress2 = index => {
    const newButtonStates2 = [...buttonStates1];
    newButtonStates2.fill(false);
    newButtonStates2[index] = true;
    setButtonStates2(newButtonStates2);
  };

  // const [isStartDateTimePickerVisible, setStartDateTimePickerVisible] =
  //   useState(false);
  // const [isEndDateTimePickerVisible, setEndDateTimePickerVisible] =
  //   useState(false);
  // const [startdate, setStartdate] = useState(null);
  // const [enddate, setEnddate] = useState(null);
  const [isStartDateTimePickerVisible, setStartDateTimePickerVisible] =
    useState(false);
  const [isEndDateTimePickerVisible, setEndDateTimePickerVisible] =
    useState(false);
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);

  // const showEndDateTimePicker = () => {
  //   setEndDateTimePickerVisible(true);
  // };
  // const showStartDateTimePicker = () => {
  //   setStartDateTimePickerVisible(true);
  // };

  // const hideStartDateTimePicker = () => {
  //   setDateTimePickerVisible(false);
  // };
  // const hideEndDateTimePicker = () => {
  //   setDateTimePickerVisible(false);
  // };

  // const handleStartConfirm = date => {
  //   setStartdate(date);
  //   hideStartDateTimePicker();
  // };
  // const handleEndConfirm = date => {
  //   setEnddate(date);
  //   hideEndDateTimePicker();
  // };

  // const formatDateTime = datetime => {
  //   return moment(datetime).format('MMMM Do YYYY, h:mm A');
  // };
  const showStartDateTimePicker = () => {
    setStartDateTimePickerVisible(true);
  };

  const hideStartDateTimePicker = () => {
    setStartDateTimePickerVisible(false);
  };

  const handleStartConfirm = date => {
    setStartDate(date);
    hideStartDateTimePicker();
  };

  const showEndDateTimePicker = () => {
    setEndDateTimePickerVisible(true);
  };

  const hideEndDateTimePicker = () => {
    setEndDateTimePickerVisible(false);
  };

  const handleEndConfirm = date => {
    setEndDate(date);
    hideEndDateTimePicker();
  };

  const formatDateTime = dateTime => {
    return moment(dateTime).format('MMMM Do YYYY, h:mm A');
  };

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://trippr-production-64zvm7t2wa-em.a.run.app/api/v1/homeStay/property/all',
  //         {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             // Add any additional headers if required
  //           },
  //           body: JSON.stringify({
  //             // Add any request parameters or data
  //           }),
  //         },
  //       );

  //       console.log('Response status:', response);

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }

  //       const jsonData = await response.json();
  //       sethsData(jsonData.data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleSubmit = async () => {
    const token = await getToken();
    console.log('Token:', token);
    const terms1 = pickupLocation;
    const slicedPickupSubLocalityAddress = terms1.substring(
      0,
      terms1.indexOf(','),
    );

    const firstCommaIndex1 = terms1.indexOf(',');
    const secondCommaIndex1 = terms1.indexOf(',', firstCommaIndex1 + 1);

    const slicedPickupCityAddress =
      secondCommaIndex1 !== -1
        ? terms1.substring(firstCommaIndex1 + 1, secondCommaIndex1)
        : '';

    const terms2 = dropLocation;
    const slicedDropSubLocalityAddress = terms2.substring(
      0,
      terms2.indexOf(','),
    );

    const firstCommaIndex2 = terms2.indexOf(',');
    const secondCommaIndex2 = terms2.indexOf(',', firstCommaIndex2 + 1);

    const slicedDropCityAddress =
      secondCommaIndex2 !== -1
        ? terms2.substring(firstCommaIndex2 + 1, secondCommaIndex2)
        : '';

    //  if (terms.offset === 12) {
    //   from: pickupValue.predictions[0].terms[1]
    //  }

    const date1 = moment(startdate, 'YYYY-MM-DD');
    const date2 = moment(enddate, 'YYYY-MM-DD');
    const diffInDays = date2.diff(date1, 'days');
    const diffInHours = date2.diff(date1, 'hours');

    const data = {
      passengerLimit: passengers,
      from: 'Bengaluru Urban',
      fromSubLocality: slicedPickupSubLocalityAddress,
      toSubLocality: dropLocation,
      fromDate: startdate,
      toDate: enddate,
      toSubLocality: slicedDropSubLocalityAddress,
      to: slicedDropCityAddress,
      totalHours: diffInHours,
      totalDays: diffInDays,
      tripType: 'roundTrip',
    };

    //       const data = {
    //         from:"Bengaluru Urban",
    // fromDate:"2023-06-23T10:00:00.000Z",
    // fromSubLocality:"BTM Layout",
    // isAcVehicle:true,
    // passengerLimit:"3",
    // to:"Panaji",
    // toDate:"2023-06-30T10:00:00.000Z",
    // toSubLocality:"Panaji",
    // totalDays:7,
    // totalDistanceInKm:350,
    // tripType:"roundTrip"
    //       }

    await fetch(
      'https://trippr-production-64zvm7t2wa-em.a.run.app/api/v1/bucket',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`, // Include the bearer token in the Authorization header
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    )
      .then(response => response.json())
      .then(responseData => {
        // Handle the response data here

        navigation.navigate('Cars', {
          responseData: responseData,
          pickupLocation: pickupLocation,
          dropLocation: dropLocation,
          startdate: startdate,
        });
        // if(responseData.statusCode=== 200){
        //   navigation.navigate('Home')
        // } else{
        //   console.warn("Invalid email or password")
        console.log(responseData, 'ko');
        console.log(responseData.data[0].images.front);

        // }
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.navbar}>
        <View style={styles.left}>
          <TouchableOpacity>
            <Image source={require('../assets/Menu.png')} />
          </TouchableOpacity>
          <Text style={{fontSize: 25, color: '#7F7F73'}}>Home</Text>
        </View>
        {/* <View style={styles.right}>
          <Image source={require('../assets/share-icon.png')} />
          <Image source={require('../assets/search-icon.png')} />
        </View> */}
      </View>
      {/* <View style={styles.textcontainer}>
        <Text style={styles.maintext}>
          Discover the <Text style={styles.bluetext}>Best Car Rentals </Text>
          and <Text style={styles.bluetext}>Homestays</Text> in India.
        </Text>
      </View> */}
      {/* <View style={styles.mainimage}>
        <Image
          source={require('../assets/background-img-home.png')}
          resizeMode="contain"
          style={styles.bigimage}
        />
        <Image
          source={require('../assets/discover.png')}
          style={styles.image1}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/tc-applied.png')}
          style={styles.image2}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/special-offer-new.png')}
          style={styles.image3}
          resizeMode="contain"
        />
        <View style={styles.getoffcontainer}>
          <Text style={styles.getofftext1}>GET</Text>
          <Text style={styles.getofftext2}>₹1500</Text>
          <Text style={styles.getofftext1}>OFF ON YOUR FIRST RIDE</Text>
        </View>
      </View> */}
      <View style={styles.btncontainer}>
        <TouchableOpacity
          style={[styles.button1, buttonStates1[0] && styles.activeButton1]}
          onPress={() => {
            handlePress1(0);
            
          }}>
          <Text
            style={[
              styles.btntext,
              {color: buttonStates1[0] ? 'white' : 'black'},
            ]}>
            Cars
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button1, buttonStates1[1] && styles.activeButton1]}
          onPress={() => {
            handlePress1(1);
          }}>
          <Text
            style={[
              styles.btntext,
              {color: buttonStates1[1] ? 'white' : 'black'},
            ]}>
            Buses
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button1, buttonStates1[2] && styles.activeButton1]}
          onPress={() => {
            handlePress1(2);
            navigation.navigate('Homestay')
          }}>
          <Text
            style={[
              styles.btntext,
              {color: buttonStates1[2] ? 'white' : 'black'},
            ]}>
            Homestays
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.taxitab}>
        <TouchableOpacity
          style={[styles.cont1, buttonStates2[0] && styles.activeButton2]}
          onPress={() => handlePress2(0)}>
          <Image
            source={require('../assets/plane-takeoff.png')}
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
          <Text
            style={[
              {fontFamily: 'Montserrat-Bold', fontSize: 11},
              buttonStates2[0] ? {color: 'white'} : {color: 'black'},
            ]}>
            Airport Cabs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cont1, buttonStates2[1] && styles.activeButton2]}
          onPress={() => handlePress2(1)}>
          <Image source={require('../assets/car-local.png')} />
          <Text
            style={[
              {fontFamily: 'Montserrat-Bold', fontSize: 11},
              buttonStates2[1] ? {color: 'white'} : {color: 'black'},
            ]}>
            Local
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.cont1, buttonStates2[2] && styles.activeButton2]}
          onPress={() => handlePress2(2)}>
          <Image source={require('../assets/car-outstation.png')} />
          <Text
            style={[
              {fontFamily: 'Montserrat-Bold', fontSize: 11},
              buttonStates2[2] ? {color: 'white'} : {color: 'black'},
            ]}>
            Outstation
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickdropbox}>
        <TouchableOpacity
          style={styles.pickupContainer}
          onPress={() => navigation.navigate('PickDropLocation')}>
          <Image
            source={require('../assets/gps-new.png')}
            resizeMode="center"
            style={{width: 30, height: 30}}
          />
          {!pickupLocation && (
            <Text style={[styles.fontMontSemi, {color: '#444'}]}>
              Pickup Location
            </Text>
          )}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.fontMontSemi, {color: 'black', flex: 1}]}>
            {pickupLocation}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickupContainer}
          onPress={() => navigation.navigate('PickDropLocation')}>
          <Image
            source={require('../assets/gps-new.png')}
            resizeMode="center"
            style={{width: 30, height: 30}}
          />
          {!dropLocation && (
            <Text style={[styles.fontMontSemi, {color: '#444'}]}>
              Drop Location
            </Text>
          )}
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.fontMontSemi, {color: 'black', flex: 1}]}>
            {dropLocation}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickupContainer}
          onPress={showStartDateTimePicker}>
          <Image
            source={require('../assets/date-icon.png')}
            resizeMode="center"
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
          {!startdate && (
            <Text style={[styles.fontMontSemi, {color: '#444'}]}>
              Start Date
            </Text>
          )}
          {startdate && (
            <Text style={[styles.fontMontSemi, {color: 'black', flex: 1}]}>
              {formatDateTime(startdate)}
            </Text>
          )}
          <DateTimePickerModal
            isVisible={isStartDateTimePickerVisible}
            mode="datetime"
            onConfirm={handleStartConfirm}
            onCancel={hideStartDateTimePicker}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pickupContainer}
          onPress={showEndDateTimePicker}>
          <Image
            source={require('../assets/date-icon.png')}
            resizeMode="center"
            style={{width: 25, height: 25, resizeMode: 'contain'}}
          />
          {!enddate && (
            <Text style={[styles.fontMontSemi, {color: '#444'}]}>End Date</Text>
          )}
          {enddate && (
            <Text style={[styles.fontMontSemi, {color: 'black', flex: 1}]}>
              {formatDateTime(enddate)}
            </Text>
          )}
          <DateTimePickerModal
            isVisible={isEndDateTimePickerVisible}
            mode="datetime"
            onConfirm={handleEndConfirm}
            onCancel={hideEndDateTimePicker}
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.datetimecontainer}>
        <View style={styles.startdate}>
          <Button
            title="Start Date & Time"
            onPress={showStartDateTimePicker}
            style={{borderRadius: 10}}
            color="#0056FB"
          />
          <View style={styles.datetimeshow}>
            {startdate && (
              <Text style={{color: 'black'}}>{formatDateTime(startdate)}</Text>
            )}
            <DateTimePickerModal
              isVisible={isStartDateTimePickerVisible}
              mode="datetime"
              onConfirm={handleStartConfirm}
              onCancel={hideStartDateTimePicker}
            />
          </View>
        </View>
        <View style={styles.startdate}>
          <Button
            title="End Date & Time"
            onPress={showEndDateTimePicker}
            color="#0056FB"
          />
          <View style={styles.datetimeshow}>
            {enddate && (
              <Text style={{color: 'black'}}>{formatDateTime(enddate)}</Text>
            )}
            <DateTimePickerModal
              isVisible={isEndDateTimePickerVisible}
              mode="datetime"
              onConfirm={handleEndConfirm}
              onCancel={hideEndDateTimePicker}
            />
          </View>
        </View>
      </View> */}
      <View style={styles.passengercontainer}>
        <View style={styles.passengerinfo}>
          <View style={styles.passengertext}>
            <Image
              source={require('../assets/passengers.png')}
              resizeMode="center"
              style={{width: 30, height: 30}}
            />
            <Text style={[styles.fontMontSemi, {fontSize: 16, color: '#444'}]}>
              Passengers
            </Text>
          </View>
          <View style={styles.passengernumber}>
            <TouchableOpacity onPress={() => setPassengers(passengers - 1)}>
              <Text style={{fontSize: 20, color: 'black'}}>-</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20, color: 'black'}}>{passengers}</Text>
            {/* <TextInput value={passengers} keyboardType="numeric" style={{borderWidth:1,width:'50%',height:'auto',borderRadius:5,color:'black',fontSize:15,margin:1}} onChange={handlePassengers} borderColor='#0056FB'/> */}
            <TouchableOpacity onPress={() => setPassengers(passengers + 1)}>
              <Text
                style={[styles.fontMontSemi, {fontSize: 20, color: 'black'}]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.submitbuttoncontainer}>
        <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit}>
          <Text style={[styles.fontMontSemi, {fontSize: 23, color: 'white'}]}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.homestaycontainer}>
        <View style={{width: '100%', paddingHorizontal: 8}}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              fontFamily: 'Montserrat-Bold',
            }}>
            Experience the warmth of home in our cozy homestays.
          </Text>
        </View>

        {/* <Swiper showsPagination={false}>
          {hsdata && hsdata.length > 0 ? (
            hsdata.map((item, index) => (
              <View key={index} style={styles.homestaytemplate}>
                <Image
                  source={{uri: item.displayImage}}
                  style={{width: '100%', height: '80%'}}
                />
                <Text style={{color: 'black', fontSize: 18, paddingLeft: 10}}>
                  {item.property_name}
                </Text>
                <Text style={{color: 'black', fontSize: 15, paddingLeft: 10}}>
                  {item.city}
                </Text>
              </View>
            ))
          ) : (
            <View>
              <Text>No data available</Text>
            </View>
          )}
        </Swiper> */}
      </View>
      <SwiperHomeStays />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height:'100%',
    // backgroundColor: "red",
    padding: 4,
    gap: 10,
    backgroundColor: 'white',
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
  fontMontSemi: {
    fontFamily: 'Montserrat-Medium',
  },

  left: {
    flexDirection: 'row',
    width: '30%',
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
  textcontainer: {
    // backgroundColor: "green",
    height: 120,
    width: 310,
    marginTop: 25,
  },
  maintext: {
    color: 'black',
    fontSize: 30,
  },
  bluetext: {
    color: '#0056FB',
  },
  mainimage: {
    // backgroundColor: "blue",
    // width: "100%",
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  bigimage: {
    width: '80%',
    height: 200,
    position: 'relative',
  },
  image1: {
    position: 'absolute',
    width: '55%',

    right: 0,
    bottom: 180,
  },
  image2: {
    position: 'absolute',
    width: '35%',
    bottom: 95,
    left: 25,
  },
  image3: {
    position: 'absolute',
    width: '60%',
    top: 58,
    left: 102,
  },
  getoffcontainer: {
    // backgroundColor:'red',
    width: 205,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 65,
    right: 115,
    gap: 6,
  },
  getofftext1: {
    fontSize: 16,
    fontFamily: 'post',
    color: 'white',
  },
  getofftext2: {
    fontSize: 16,
    fontFamily: 'porter',
    color: 'white',
  },
  btncontainer: {
    // backgroundColor: "purple",
    width: '100%',
    flexDirection: 'row',
    // alignItems:'center',
    height: 40,
    justifyContent: 'center',
    gap: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  button1: {
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1.5,
    // marginTop: 20,
    padding: 4,
    paddingHorizontal: 8,
    color: 'black',
  },
  btntext: {
    fontFamily: 'Montserrat-SemiBold',
    color: 'black',
  },
  activeButton1: {
    backgroundColor: 'grey',
  },
  activeButton2: {
    backgroundColor: '#0373fc',
  },
  taxitab: {
    backgroundColor: 'white',
    width: '99%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    alignItems: 'center',
    marginRight: 2,
    marginLeft: 2,
    // borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'black',
    // shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
    marginTop: 24,
    paddingLeft: 8,
    paddingRight: 8,
  },
  cont1: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 8,
    backgroundColor: 'white',
    borderColor: 'black',
    // borderWidth: 1,
    padding: 5,
    height: 60,
    width: '30%',
    borderRadius: 10,
  },
  pickupContainer: {
    zIndex: 10,
    backgroundColor: 'white',
    width: '95%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 4,
  },
  pickdropbox: {
    // backgroundColor: "green",
    width: '100%',
    alignItems: 'center',

    position: 'relative',
    justifyContent: 'center',
    // marginTop: 15,
    gap: 15,
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  choosebutton: {
    backgroundColor: '#0373fc',
    width: '80%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
  },
  passengercontainer: {
    width: '100%',
    height: 100,
    // backgroundColor:'red',

    marginTop: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  passengerinfo: {
    width: '95%',
    // backgroundColor:'indigo',
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  passengernumber: {
    flexDirection: 'row',
    // backgroundColor:'red',
    width: '20%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  passengertext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  datetimecontainer: {
    padding: 5,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // borderWidth: 1,
    borderRadius: 10,
    marginTop: 15,
    flexDirection: 'row',
    // borderColor:'#0056FB',
    elevation: 5, // Apply elevation for the shadow effect
    shadowColor: 'black', // Set the shadow color
    shadowOpacity: 0.2, // Set the shadow opacity
    shadowRadius: 5, // Set the shadow radius
    shadowOffset: {
      width: 0,
      height: 2,
    },
    padding: 25,
  },
  homestaycontainer: {
    width: '100%',
    // backgroundColor: 'red',
    marginBottom: 10,
    // padding: 30,
    // justifyContent:'center',
    // alignItems:'center'
  },
  homestaytemplate: {
    width: '100%',
    backgroundColor: 'lightgrey',
    borderRadius: 15,
    padding: 5,
  },
});
