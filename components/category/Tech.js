import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

import Loader from "../Loader";
import { BaseUrl } from "../constants";
import UserContext from "../context/userContext";
import Card from "../UserData/Card";
import { colors } from "../constants";

export default function CategoryCampaigns({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const { category } = route.params;
  const { categoryCampaigns, setCategoryCampaigns } = useContext(UserContext);

  useEffect(() => {
    fetch(`${BaseUrl}/categoryPost/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryCampaigns(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (isLoading) {
    return <Loader title={`Loading ${category} Campaigns`} />;
  }

  if (categoryCampaigns.length === 0) {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: colors.primary,
          }}
        >
          No Campaigns of Category: {category}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            padding: 16,
            marginTop: 10,
            borderRadius: 10,
          }}
          onPress={() => navigation.navigate("LandingPage")}
        >
          <Text
            style={{
              fontSize: 16,
              color: "white",
            }}
          >
            Back to Home!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-start",
              marginTop: 30,
              marginLeft: 20,
            }}
          >
            <AntDesign
              name="arrowleft"
              size={28}
              color={colors.primary}
              onPress={() => navigation.navigate("LandingPage")}
            />
          </View>
          <Text
            style={{
              marginTop: 30,
              display: "flex",
              flexDirection: "row",
              alignSelf: "flex-start",
              marginLeft: 30,
              fontSize: 20,
              color: "#242F9B",
            }}
          >
            No of {category} Campaigns: ({categoryCampaigns.length})
          </Text>
          {categoryCampaigns.map((campaign) => (
            <View key={Math.random()}>
              <Card
                title={campaign.title}
                description={campaign.description}
                img={campaign.picture}
                target={campaign.campaignGoal}
                username={campaign.posterName}
                userpic={campaign.posterPic}
                category={campaign.category}
                startdate={campaign.startdate}
                campaign={campaign}
                permission={campaign.permission}
                type="CategoryCampaigns"
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
