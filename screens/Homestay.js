import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width; // Get the window width

const Homestay = ({navigation}) => {
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
    <View style={styles.container}>
      <View style={styles.navbar}>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/ep_back.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{fontSize: 20, color: '#7F7F73'}}>Homestays</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.right}>
          <Image source={require('../assets/share-icon.png')} />
          <Image source={require('../assets/search-icon.png')} />
        </View> */}
      </View>
      <ScrollView style={styles.homestaycontainer}>
        {hsdata && hsdata.length > 0 ? (
          hsdata.map((item, index) => (
            <View key={index} style={styles.homestaytemplate}>
              <Image
                source={{uri: item.displayImage}}
                style={styles.templateImage} // Use a custom style for the image
              />
              <View style={styles.homestaytext}>
                <View style={styles.propertyname}>
                  <Text style={styles.templateTitle}>{item.property_name}</Text>
                  <Text style={styles.templateSubtitle}>{item.city}</Text>
                </View>
                <View style={styles.bookbuttoncontainer}>
                  <TouchableOpacity
                    style={styles.bookbtn}
                    onPress={() => {
                      navigation.navigate('HomestayDetail', {item: item});
                    }}>
                    <Text style={{color: 'white', fontSize: 18}}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text>No data available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ...rest of the styles...

  homestaytemplate: {
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  templateImage: {
    width: '100%',
    height: 200, // Adjust the height as per your requirement
    borderRadius: 10,
    marginBottom: 10,
  },
  templateTitle: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 10,
    marginBottom: 5,
  },
  templateSubtitle: {
    color: 'black',
    fontSize: 15,
    paddingLeft: 10,
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
    width: '40%',
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
  bookbtn: {
    backgroundColor: '#0056FB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal:12
    
  },
  homestaytext: {
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    paddingHorizontal:12
  },
  propertyname:{},
  bookbuttoncontainer: {
    flexDirection:'row',
  }
});

export default Homestay;
