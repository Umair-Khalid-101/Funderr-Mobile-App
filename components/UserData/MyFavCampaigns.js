import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "./Card";
import { colors } from "../constants";
import Loader from "../Loader";
import UserContext from "../context/userContext";
import { BaseUrl } from "../constants";

export default function MyFavCampaigns() {
  const { token, myFavCampaigns, setMyFavCampaigns } = useContext(UserContext);
  const navigation = useNavigation();
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(true);
    fetch(`${BaseUrl}/userfavposts`, {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.userposts);
        let myCampaigns = data.userFavPosts;
        setMyFavCampaigns(myCampaigns);
        setisLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // REMOVE FROM FAVORITES
  const handleUnFav = async (id, title) => {
    // console.log(`${BaseUrl}/deletefromfav/${id}`);
    fetch(`${BaseUrl}/deletefromfav/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        Alert.alert("REMOVED", `${title} Removed from Favorites`);
      })
      .catch((error) => {
        console.log(error);
      });
    let filteredCampaigns = myFavCampaigns.filter((item) => item._id !== id);
    // console.log("FILTERED: ", filteredCampaigns);
    setMyFavCampaigns(filteredCampaigns);
  };

  return (
    <>
      {isLoading && <Loader title="Loading Fav Campaigns" />}
      {!isLoading && (
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
                  onPress={() => navigation.navigate("Drawer")}
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
                Favorite Campaigns: ({myFavCampaigns.length})
              </Text>
              {myFavCampaigns.map((campaign) => (
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
                    type="FavCampaigns"
                    handlePress={() =>
                      handleUnFav(campaign._id, campaign.title)
                    }
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
