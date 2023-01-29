import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
const { height, width } = Dimensions.get("window");

export default function Donate() {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      walletAddress: "",
      amount: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    // navigation.navigate("LandingPage")
    // await fetch("http://192.168.100.16:3001/funderr/auth", {
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     Usertoken = data
    //     setToken(data)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //   await fetch("http://192.168.100.16:3001/funderr/currentuser",{
    //     headers:{
    //       "x-auth-token": Usertoken,
    //     },
    //     method: "GET"
    //   }).then((res)=>res.json())
    //   .then((data)=>{
    //     console.log("User: ",JSON.stringify(data))
    //     const newUser = data
    //     setUserData(newUser);
    //     setTimeout(() => {
    //       navigation.navigate("LandingPage")
    //     }, 3000);
    //   })
    // setTimeout(() => {
    //   navigation.navigate("LandingPage");
    // }, 1000);
  //   axios
  //     .post("http://192.168.10.5:3001/funderr/auth", data)
  //     .then((result) => {
  //       // Usertoken = result.data;
  //       // setToken(Usertoken);
  //       console.log("Result:", result.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //   toast.error("Wrong Email or Password", {
  //     position: toast.POSITION.TOP_LEFT,
  //   });
  //   });
  //   setTimeout(() => {
  //     navigation.navigate("LandingPage");
  //   }, 2000);
  };

  const onChange = (arg) => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: 10
          
        }}
      >
        Wallet Address
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.amount}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="walletAddress"
        rules={{ required: true }}
      />
      <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: 5,
          
        }}
      >
        Amount
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.amount}
            onChangeText={(value) => onChange(value)}
            value={value}
            numeric
          keyboardType={'numeric'}
          />
        )}
        name="amount"
        rules={{ required: true }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    justifyContent: "center",
  },
  amount: {
    
    borderWidth: 1,
    borderColor: "#242F9B",
    height: 40,
width:200,
    marginTop: "2%",
    borderRadius: 10,
    color:"white"
  },
})