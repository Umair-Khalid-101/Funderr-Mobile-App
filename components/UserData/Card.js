import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function Card() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("CardDetails")}>
      <View
        style={{
          ...styles.card,
        }}
      >
        <TouchableOpacity style={{ ...styles.heartIcon }}>
          <Ionicons name="heart-outline" size={24} color="#242F9B" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", width: 300 }}>
          <Image
            style={{ ...styles.image }}
            source={require("../../assets/CampaignSuccess.png")}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...styles.heading }}>Title</Text>
            <Text style={{ ...styles.textSecondary }}>Total: 2 ETH </Text>
            <Text style={{ ...styles.textSecondary }}>Raised: 1.2 ETH</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 50,
    color: "#242F9B",
  },

  textSecondary: {
    fontSize: 15,
    marginTop: 5,
    color: "#242F9B",
  },
  heartIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
});
