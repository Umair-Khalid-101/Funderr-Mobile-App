import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import NewCampaignForm from "./UserData/NewCampaignForm";

export default function NewCampaign() {
  const navigation = useNavigation();

  return (
    <View>
      <AntDesign
        style={styles.backicon}
        name="arrowleft"
        size={30}
        color="#242F9B"
        onPress={() => navigation.navigate("LandingPage")}
      />
      <Image
        style={{
          width: 300,
          height: 250,

          top: 7,
          alignSelf: "center",
        }}
        source={require("../assets/landingpage.png")}
      />
      <ScrollView style={{ height: 500 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <NewCampaignForm />
        </View>

        <View style={{ marginTop: 100 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  backicon: {
    marginTop: 40,
    marginLeft: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#242F9B",
    height: 50,
    width: 300,
    borderRadius: 50,
    marginTop: 10,
  },
  input2: {
    borderWidth: 1,
    borderColor: "#242F9B",
    height: 50,
    width: 300,
    borderRadius: 50,
    marginTop: 10,
  },
  input3: {
    borderWidth: 1,
    borderColor: "#242F9B",
    height: 200,
    width: 300,
    borderRadius: 20,
    marginTop: 10,
    lineHeight: 23,
  },
  success: {
    backgroundColor: "#242F9B",
    height: 50,
    borderRadius: 50,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  imagebutton: {
    width: 300,
    height: 50,
    backgroundColor: "#242F9B",
    marginTop: 20,
    borderRadius: 50,

    justifyContent: "center",
    alignItems: "center",
  },
});
