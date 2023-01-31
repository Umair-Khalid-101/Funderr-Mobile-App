import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { colors } from "./constants";
import UserContext from "./context/userContext";
const { height, width } = Dimensions.get("window");

export default function Drawer() {
  const { userdata } = useContext(UserContext);
  const navigation = useNavigation();
  const imageUrl = userdata.picture;
  return (
    <View style={{ height: height, width: width }}>
      <View style={styles.Navbar}></View>
      <View>
        <AntDesign
          style={styles.backicon}
          name="arrowleft"
          size={28}
          color={colors.primary}
          onPress={() => navigation.navigate("LandingPage")}
        />
      </View>
      <Image
        style={{
          width: 150,
          height: 150,
          resizeMode: "stretch",
          marginTop: 5,
          alignSelf: "center",
          borderRadius: 75,
          borderColor: colors.primary,
          borderWidth: 2,
        }}
        source={{ uri: imageUrl }}
      />
      <TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            color: colors.primary,
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 20,
          }}
          onPress={() => navigation.navigate("Profile")}
        >
          Profile
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Mycampaignscontainer}
        onPress={() => navigation.navigate("MyCampaigns")}
      >
        <Text style={styles.Mycampaignstext}>My Campaigns</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Mycampaignscontainer2}
        onPress={() => navigation.navigate("MyFavCampaigns")}
      >
        <Text style={styles.Mycampaignstext}>My Fav Campaigns</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.Mycampaignscontainer2}
        onPress={() => navigation.navigate("HowItWorks")}
      >
        <Text style={styles.Mycampaignstext}>How it Works</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Mycampaignscontainer2}
        onPress={() => navigation.navigate("ContactUs")}
      >
        <Text style={styles.Mycampaignstext}>Contact Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.Mycampaignscontainer2}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.Mycampaignstext}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  backicon: {
    marginLeft: 10,
    alignSelf: "flex-start",
    marginTop: 30,
  },
  Mycampaignscontainer: {
    backgroundColor: colors.primary,
    height: "7%",
    borderRadius: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  Mycampaignstext: {
    color: "white",
  },
  Mycampaignscontainer2: {
    backgroundColor: colors.primary,
    height: "7%",
    borderRadius: 50,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
});
