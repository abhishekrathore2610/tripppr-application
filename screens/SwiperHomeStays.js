import { StyleSheet, Text, View,Image } from 'react-native'
import React,{useEffect,useState} from 'react'
import Swiper from 'react-native-swiper';

const SwiperHomeStays = () => {
    const [hsdata, sethsData] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://trippr-production-64zvm7t2wa-em.a.run.app/api/v1/homeStay/property/all',
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
    return (
    
      
        <Swiper showsPagination={false} style={styles.container} >
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
        </Swiper>
      
    
  )
}

export default SwiperHomeStays

const styles = StyleSheet.create({
    container: {
      // borderWidth:1,
      // borderColor:'black',
      height:250,
      
    },
    homestaytemplate: {
      backgroundColor:'lightgrey',
      borderRadius:10,
      padding:10,
    }
})