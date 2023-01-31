import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Card from "./UserData/Card";
import Loader from "./Loader";
import { BaseUrl } from "./constants/index";
import UserContext from "./context/userContext";
import HorizontalScrollView from "./HorizontalScrollView";
import { colors } from "./constants/index";

export default function LandingPage() {
  const { verifiedCampaigns, setVerifiedCampaigns, token } =
    useContext(UserContext);
  // console.log("Token:", token);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${BaseUrl}/verifiedposts`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.verified);
        setVerifiedCampaigns(data.verified);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // BUTTONS
  const buttons = [
    {
      label: "Technology",
      onPress: () => {
        navigation.navigate("Tech", {
          category: "Technical",
        });
      },
    },
    {
      label: "Medical",
      onPress: () => {
        navigation.navigate("Tech", {
          category: "Medical",
        });
      },
    },
    {
      label: "Art",
      onPress: () => {
        navigation.navigate("Tech", {
          category: "Art",
        });
      },
    },
    {
      label: "Illustration",
      onPress: () => {
        navigation.navigate("Tech", {
          category: "Illustration",
        });
      },
    },
    {
      label: "Music",
      onPress: () => {
        navigation.navigate("Tech", {
          category: "Music",
        });
      },
    },
    {
      label: "Social",
      onPress: () => {
        navigation.navigate("Tech", {
          category: "Social",
        });
      },
    },
  ];

  if (isLoading) {
    return <Loader title="Loading Featured Campaigns" />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.Navbar}>
        <Feather
          name="menu"
          size={30}
          color="white"
          style={{
            marginLeft: "5%",
            top: 30,

            alignSelf: "flex-start",
          }}
          onPress={() => navigation.navigate("Drawer")}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            alignSelf: "center",
          }}
        >
          Welcome
        </Text>
        <Ionicons
          name="notifications"
          size={28}
          color="white"
          style={{ alignSelf: "flex-end", marginRight: "5%", bottom: 30 }}
          onPress={() => navigation.navigate("Notifications")}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontSize: 16,
            marginRight: 10,
            marginTop: 10,
          }}
        >
          Create New Campaign
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginRight: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("NewCampaign")}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          width: "100%",
          left: 10,
        }}
      >
        <Text
          style={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Categories
        </Text>
        <HorizontalScrollView buttons={buttons} />
      </View>
      <ScrollView style={{ height: 515 }}>
        <View style={{ marginLeft: 15 }}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 5,
              marginTop: 10,
            }}
          >
            Verified Campaigns: ({verifiedCampaigns.length})
          </Text>
          {verifiedCampaigns.map((campaign) => (
            <View key={Math.random()}>
              <Card
                title={campaign.title}
                img={campaign.picture}
                target={campaign.campaignGoal}
                description={campaign.description}
                username={campaign.posterName}
                userpic={campaign.posterPic}
                category={campaign.category}
                startdate={campaign.startdate}
                type="Verified Campaign"
                campaign={campaign}
                permission={campaign.permission}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  Navbar: {
    backgroundColor: colors.primary,
    height: 130,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  newcampaign: {
    backgroundColor: "white",
    height: 100,
    borderRadius: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 20,
    alignSelf: "center",
    position: "absolute",
  },
  categorybuttons: {
    backgroundColor: colors.primary,
    height: 40,
    borderRadius: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  categorybuttons2: {
    backgroundColor: colors.primary,
    height: 40,
    borderRadius: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
  },
});
