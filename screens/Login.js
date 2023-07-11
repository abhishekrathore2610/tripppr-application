import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React from "react";
import { useState,useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';




const Login = ({ navigation }) => {
  
  useEffect(()=> {
    GoogleSignin.configure()
  },[])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info',userInfo)
      navigation.navigate('Home')
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log(error)
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log(error)
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log(error)
      } else {
        // some other error happened
        console.log(error)
      }
    }
  };

  const [data,setData] = useState(null)
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  
  
  const storeToken = async (token) => {
    try {
      if (token) {
        await AsyncStorage.setItem('token', token);
        console.log('Token stored successfully.');
      } else {
        console.log('Token is null or undefined. Unable to store.');
      }
    } catch (error) {
      console.log('Failed to store token:', error);
    }
  };
  
  const handlePostRequest = () => {
    setEmail('');
    setPassword('');
    


    
    const data = {
      email:email,

      password: password,
    };

    console.log(data);

    fetch(
      "https://trippr-production-64zvm7t2wa-em.a.run.app/api/v1/auth/customer/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        // Handle the response data here
        console.log(responseData);
        if(responseData.statusCode=== 200){

          storeToken(responseData.data.token);
          navigation.navigate('Home')
        } else{
          console.warn("Invalid email or password")
        }
      })
      .catch((error) => {
        // Handle any errors here
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.first}>
        <View>
          <Image
            source={require("../assets/login-logo-new.png")}
            resizeMode="center"
          />
        </View>
      </View>
      <View style={styles.second}>
        <TextInput
          style={styles.input1}
          placeholder="Email"
          placeholderTextColor="#7F7F73"
          value={email}
          onChangeText={(e) => setEmail(e)}
        />
        <View style={styles.password}>
          <TextInput
            style={styles.input2}
            placeholder="Password"
            placeholderTextColor="#7F7F73"
            value={password}
            onChangeText={(e) => setPassword(e)}
            secureTextEntry={hidePassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={require("../assets/eye.png")}
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.text}>
          <Text style={styles.realtext}>Forgot Password?</Text>
        </View>

        <TouchableOpacity style={styles.loginbtn} onPress={handlePostRequest}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.third}>
        <Image source={require("../assets/or-line.png")} />
        <TouchableOpacity style={styles.logos} onPress={signIn}>
          {/* <Image source={require("../assets/google1-logo.png")} />
          <Image source={require("../assets/facebook-logo.png")} />
          <Image source={require("../assets/twitter-logo.png")} />
          <Image source={require("../assets/apple-logo.png")} /> */}
          
          <Image source={require('../assets/download.png')} style={{width:'100%',height:'100%'}}/>
        </TouchableOpacity>
        <View style={styles.belowpassword}>
          <Text style={styles.footertext}>Don't have an account?</Text>
          <View style={styles.signupbtncontainer}>
            <TouchableOpacity
              styles={styles.signupbtn}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.signuptext}>Signup</Text>
            </TouchableOpacity>
            
            
            
            
          </View>
        </View>
      </View>
      {/* <View style={{width:'100%',height:40,marginBottom:10,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity onPress={signIn} style={{justifyContent:'center',alignItems:'center',height:'100%',width:'20%'}}>
          <Image source={require('../assets/download.png')} resizeMode="center"/>
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  google: {
    flexDirection: "row",
  },
  first: {
    flex: 0.4,
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  //   backgroundColor:'red'
  },

  second: {
    // backgroundColor:'purple',
    // backgroundColor:'purple',
    width: "100%",
    height: "100%",
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  // backgroundColor:'aqua',
  marginBottom:20
  
  },
  input1: {
    width: "90%",
    // height: "20%",

    borderColor: "gray",
    // borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    borderColor: "#A17FE0",
    color:'black',
    backgroundColor:'white',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation:4,
    fontSize:20
    
  },
  password: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
   
    paddingHorizontal: 10,
    width: "90%",
    // height: "20%",
    borderRadius: 10,
    justifyContent: "space-between",
    borderColor: "#A17FE0",
    marginBottom: 8,
    color:'black',
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation:4,
    backgroundColor:'white',
    
  },
  input2: {
    // width:'80%',
    // height:'40%',
    // borderColor:'gray',
    // borderWidth: 1,
    // paddingHorizontal: 10,
    // marginBottom:20,
    // backgroundColor:'red',
    width: "90%",
    color:'black',
    fontSize:20
    
    
  },
  text: {
    // flexDirection:'start',
    // backgroundColor: "black",
    width: "100%",
    paddingHorizontal: 25,
    // backgroundColor:'pink'
  },
  realtext: {
    // fontFamily:'Manrope',
    color: "#0056FB",
    textDecorationLine: 'underline',
  },
  loginbtn: {
    backgroundColor: "#0056FB",
    width: "75%",
    
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingVertical:12
  },
  logintext: {
    color: "white",
    fontSize:20
  },
  belowpassword: {
  // backgroundColor:'green',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    
    height: 60,
  },
  signupbtn: {
    color: "red",
    // marginTop: 15
  },
  signuptext: {
    color: "#0056FB",
    fontSize: 20,
  },
  third: {
    flex: 0.3,
    // backgroundColor:'green',
    // justifyContent:'center',
    alignItems: "center",
    // paddingTop: 0
  },
  logos: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor:'pink',
    width: "40%",
    margin: 15,
    height:50
    
    
  },
  signupbtncontainer: {
    // backgroundColor:'red',
    
    height: "70%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footertext: {
    textDecorationLine: "underline",
    fontSize: 20,
    color: '#7F7F73'
  },
  googlesignin: {
    width:'100%',
    backgroundColor:'pink',
    height: 30
  }
});
