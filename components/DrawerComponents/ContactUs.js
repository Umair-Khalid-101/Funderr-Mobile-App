import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
import * as React from 'react'
import { useState, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

export default function ContactUs() {
    const navigation = useNavigation();
    const {register,setValue,handleSubmit,control, reset, formState: { errors },
      } = useForm({
        defaultValues: {
          email: "",
        },
      });
    const [email, setEmail] = useState("");


      const onSubmit= async (data) =>{
        console.log(data);
      }
  return (
    <View>
      <Text style={{marginTop:50, marginLeft:10}}> <AntDesign
          
          name="arrowleft"
          size={28}
          color="#242F9B"
          onPress={() => navigation.navigate("Drawer")}
        /></Text>
        <View>
        <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "10%",
          marginLeft: "10%",
        }}
      >
        Email
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.email}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
        <Text
        style={{
          color: "#242F9B",
          fontSize: 18,
          marginTop: "10%",
          marginLeft: "10%",
        }}
      >
        Type Your Message Here
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.message}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="Message"
        rules={{ required: true }}
      />
      <TouchableOpacity
        style={styles.signupbuttoncontainer}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.signupbutton}>Send</Text>
      </TouchableOpacity>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    email: {
      marginLeft: "10%",
      borderWidth: 1,
      borderColor: "#242F9B",
      height: 40,
      width: "75%",
      marginTop: "2%",
      borderRadius: 10,
    },
    message: {
      marginLeft: "10%",
      borderWidth: 1,
      borderColor: "#242F9B",
      height: 100,
      width: "75%",
      marginTop: "2%",
      borderRadius: 10,
    },
    signupbuttoncontainer: {
        backgroundColor: "#242F9B",
        height: "15%",
        borderRadius: 50,
        width: "70%",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "13%",
        marginTop: "5%",
      },
      signupbutton: {
        color: "white",
      },
})