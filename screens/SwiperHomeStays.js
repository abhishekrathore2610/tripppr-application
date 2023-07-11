import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Swiper from 'react-native-swiper';
const {width} = Dimensions.get('window');

const SwiperHomeStays = () => {
  const [hsdata, sethsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://trippr-production-64zvm7t2wa-em.a.run.app/api/v1/homeStay/property/all?skip=10&limit=10',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if required
            },
            body: JSON.stringify({
              // Add any request parameters or data
            }),
          },
        );

        console.log('Response status:', response);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        sethsData(jsonData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if(hsdata.length===0){
    return <Text>Loading</Text>
  }
  return (
    <ScrollView
      horizontal
      style={styles.container}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{width: width * 8.5}}>
      {hsdata && hsdata.length > 0 ? (
        hsdata.map((item, index) => (
          <View key={index} style={styles.homestaytemplate}>
            <View style={{position: 'relative', height: 180, width: '100%'}}>
              <Image
                source={{uri: item.displayImage}}
                style={{
                  width: '100%',
                  height: 180,
                  borderRadius: 16,
                  backgroundColor: '#1624384D',
                }}
              />
              <Image
                style={{
                  marginTop: -32,
                  width: '100%',
                  height: 128,
                  resizeMode: 'contain',
                  position: 'absolute',
                  zIndex: -99,
                  bottom: '-32%',
                  left: '0',
                }}
                source={require('../assets/Shadow.png')}
              />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                color: 'black',
                fontSize: 16,
                paddingLeft: 6,
                fontFamily: 'Montserrat-Medium',
                marginTop: 16,
                zIndex:9
              }}>
              {item.property_name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 6,
                marginTop: 4,
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/gps-new.png')}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontFamily: 'Montserrat-Light',
                }}>
                {item.city}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <View>
          <Text>No data available</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default SwiperHomeStays;

const styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    // borderColor:'black',
    padding: 2,
  },
  homestaytemplate: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
    height: 270,
    width: width * 0.8,
    marginHorizontal: 8,
    marginTop: 2,
    marginBottom: 16,
  },
});
