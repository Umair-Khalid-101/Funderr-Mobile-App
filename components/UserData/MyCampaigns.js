import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Card from "./Card";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function MyCampaigns() {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 30, alignItems: "center" }}>
      <AntDesign
        style={styles.backicon}
        name="arrowleft"
        size={28}
        color="#242F9B"
        onPress={() => navigation.navigate("Drawer")}
      />

      <View style={styles.card}>
        <Card />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backicon: {
    marginLeft: 10,
    alignSelf: "flex-start",
    marginTop: 20,
  },
  card: {
    marginTop: 20,
    display: "flex",
  },
});
