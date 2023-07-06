import React, {useRef, useEffect} from 'react';
import Swiper from 'react-native-swiper';
import {View, Text} from 'react-native';
import HomeLogo from './screens/HomeLogo';
import BookRide from './screens/BookRide';
import FindHotel from './screens/FindHotel';
import EnjoyTrip from './screens/EnjoyRide';
import Login from './screens/Login';
function SwiperScreen({navigation}) {
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(1);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Swiper ref={swiperRef} loop={false}>
      <HomeLogo />
      <BookRide />
      <FindHotel />
      <EnjoyTrip navi={navigation} />
      
    </Swiper>
  );
}

export default SwiperScreen;
