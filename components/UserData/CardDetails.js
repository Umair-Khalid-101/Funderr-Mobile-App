import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import ProgressBar from "../ProgressBar";
import DaysLeft from "../DaysLeft";

export default function CardDetails({ campaign, campaignDonations }) {
  // console.log("Campaign:(Details)", campaign);
  // console.log("Campaign:(Details)", campaignDonations);
  const navigation = useNavigation();
  const [raised, setRaised] = useState();

  useEffect(() => {
    calculateRaisedAmount();
  }, []);

  const calculateRaisedAmount = () => {
    if (campaignDonations) {
      const sum = campaignDonations.reduce((acc, obj) => {
        return acc + parseFloat(obj.amount);
      }, 0);
      // console.log("Raised Amount: ", sum);
      setRaised(sum);
    }
  };

  const calculatePercentage = (part, whole) => {
    if (whole === 0) {
      return 0;
    } else if (part > whole) {
      return 100;
    } else {
      return (part / whole) * 100;
    }
  };
  let percentage = calculatePercentage(raised, campaign.campaignGoal);
  // console.log(`Percentage: ${percentage}%`);

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
      <ProgressBar
        progress={percentage}
        raised={raised?.toFixed(2)}
        target={campaign.campaignGoal}
      />
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
        </View>
        <DaysLeft deadline={campaign.enddate} campaign={campaign} />
      </ScrollView>
      <View style={{ height: 100 }}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
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
});
