import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";

import { colors } from "./constants";
import UserContext from "./context/userContext";

export default function DaysLeft({ deadline, campaign }) {
  const { userdata } = useContext(UserContext);
  const [remainingDays, setRemainingDays] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const remaining = daysLeft(deadline);
    setRemainingDays(remaining);
  }, []);

  const daysLeft = (date) => {
    const now = new Date();
    const futureDate = new Date(date);
    const timeDiff = futureDate.getTime() - now.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {remainingDays > 0 && (
        <Text
          style={{
            marginTop: "5%",
            fontSize: 20,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          Days Left: {remainingDays}
        </Text>
      )}
      {remainingDays < 1 && (
        <Text
          style={{
            marginTop: "5%",
            fontSize: 20,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          Campaign Expired!
        </Text>
      )}
      {remainingDays > 0 && campaign.postedBy !== userdata._id && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  signupbuttoncontainer: {
    backgroundColor: colors.primary,
    height: 40,
    borderRadius: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    marginBottom: "5%",
  },
  signupbutton: {
    color: "white",
  },
});
