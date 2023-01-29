import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useContext } from "react";
import UserContext from "./context/userContext";

const { height, width } = Dimensions.get("window");

export default function Drawer() {
  const navigation = useNavigation();
  const { userdata } = useContext(UserContext);
  const imageUrl = userdata.picture;
  return (
    <View>
      <View>
        <AntDesign
          style={styles.backicon}
          name="arrowleft"
          size={28}
          color="#242F9B"
          onPress={() => navigation.navigate("Drawer")}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>Name: </Text>
        <Text style={styles.text2}>{userdata.name}</Text>
        <Text style={styles.text}>Email: </Text>
        <Text style={styles.text2}>{userdata.email}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MyCampaigns")}
        >
          <Text style={styles.buttontext}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  backicon: {
    marginLeft: 10,
    alignSelf: "flex-start",
    marginTop: 40,
  },
  image: {
    resizeMode: "stretch",
    width: 200,
    height: 200,
  },
  text: {
    color: "#242F9B",
    fontSize: 30,
    marginTop: 10,
    fontWeight: "bold",
  },
  text2: {
    fontSize: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#242F9B",
    height: "15%",
    borderRadius: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    alignSelf: "center",
  },
  buttontext: {
    color: "white",
    fontSize: 20,
  },
});
