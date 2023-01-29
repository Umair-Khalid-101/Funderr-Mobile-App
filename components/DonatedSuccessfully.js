import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function CampaignSuccess() {
  const navigation = useNavigation();
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{
          width: "90%",
          height: "70%",
          resizeMode: "stretch",
          top: "7%",
          alignSelf: "center",
        }}
        source={require("../assets/CampaignSuccess.png")}
      />
      <Text
        style={{
          color: "#242F9B",
          fontWeight: "bold",
          fontSize: 20,
          top: 20,
          alignSelf: "center",
        }}
      >
        Campaign Successful Created{" "}
      </Text>
      <Text
        style={{
          color: "#242F9B",
          fontWeight: "bold",
          fontSize: 20,
          top: 20,
          alignSelf: "center",
        }}
      >
        GOOD LUCK!{" "}
      </Text>
      <TouchableOpacity
        style={styles.signupbuttoncontainer}
        onPress={() => navigation.navigate("LandingPage")}
      >
        <Text
          style={styles.signupbutton}
          onPress={() => navigation.navigate("LandingPage")}
        >
          Home Page
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  signupbuttoncontainer: {
    backgroundColor: "#242F9B",
    height: "7%",
    borderRadius: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",

    top: 30,
  },
  signupbutton: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
