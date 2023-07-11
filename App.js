import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SwiperScreen from './SwiperScreen';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import PickDropLocation from './screens/PickDropLocation';
import Cars from './screens/Cars';
import CarDetails from './screens/CarDetails';
import linking from './linking';
import Homestay from './screens/Homestay';
import HomestayDetail from './screens/HomestayDetail';



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Swiper" component={SwiperScreen} />
        {/* <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="Screen5" component={Screen5}  /> */}
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='PickDropLocation' component={PickDropLocation}/>
        <Stack.Screen name='Cars' component={Cars}/>
        <Stack.Screen name='CarDetails' component={CarDetails}/>
        <Stack.Screen name='Homestay' component={Homestay}/>
        <Stack.Screen name='HomestayDetail' component={HomestayDetail}/>
        
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App

const styles = StyleSheet.create({})