import React from 'react'
import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'


const HomeLogo = ({navigation}) => {
  console.log('ggg')
  return (
    <View style={styles.container} screenOptions={{headerShown: false}}>
         
      <Image source={require('../assets/trippr-new-logo.png')} style={styles.image} resizeMode='contain' />
       
    </View>
    
  )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0056FB',
        width: "100%",
        height: '100%',
        
        

    },
    
    image: {
      
      width:"70%",
      

      

    }

    

    
        
        
        
        
    
})

export default HomeLogo;