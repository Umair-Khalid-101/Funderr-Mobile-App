import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function CardDetails({ route }) {
  const { campaign } = route.params;
  // console.log("Campaign:(Details)", campaign);
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <AntDesign
          style={styles.backicon}
          name="arrowleft"
          size={28}
          color="#242F9B"
          onPress={() => navigation.navigate("LandingPage")}
        />
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: campaign.picture }} style={styles.image} />
      </View>
      <ScrollView
        style={{
          height: 500,
          width: 400,
          display: "flex",
        }}
      >
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Campaign Owner:</Text>
            <Text style={styles.text2}>{campaign.posterName}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Title:</Text>
            <Text style={styles.text2}>{campaign.title}</Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Description:</Text>
            <Text style={styles.text2} numberOfLines={3}>
              {campaign.description}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Category:</Text>
            <Text style={styles.text2}>{campaign.category}</Text>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>WalletAddress:</Text>
            <Text style={styles.text2} numberOfLines={3}>
              {campaign.walletAddress}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Target Amount:</Text>
            <Text style={styles.text2}>{campaign.campaignGoal} ETH</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>Raised Amount:</Text>
            <Text style={styles.text2}>1 ETH</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={styles.text}>End Date:</Text>
            <Text style={styles.text2}>{campaign.enddate.split("T")[0]}</Text>
          </View>

          <TouchableOpacity
            style={styles.signupbuttoncontainer}
            onPress={() =>
              navigation.navigate("Donate", {
                campaign,
              })
            }
          >
            <Text style={styles.signupbutton}>Donate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ height: 100 }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    resizeMode: "stretch",
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  backicon: {
    alignSelf: "flex-start",
    marginTop: 40,
    marginRight: 300,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: "#242F9B",
    marginTop: 10,
  },
  longtext: {
    fontSize: 20,
    color: "#242F9B",
    marginTop: 10,
  },
  text2: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 5,
  },
  signupbuttoncontainer: {
    backgroundColor: "#242F9B",
    height: 40,
    borderRadius: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",

    marginTop: "5%",
    marginBottom: "5%",
  },
  signupbutton: {
    color: "white",
  },
});
