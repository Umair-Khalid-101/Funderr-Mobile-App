import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import UserContext from "../context/userContext";
import { BaseUrl } from "../constants";
import { colors } from "../constants";

export default function Card({
  title,
  img,
  target,
  description,
  username,
  userpic,
  category,
  startdate,
  type,
  campaign,
  permission,
  handlePress,
}) {
  const navigation = useNavigation();

  const { userdata } = useContext(UserContext);

  // ADD CAMPAIGN TO FAVORITES
  const addToFav = async (data) => {
    data.favoritedBy = userdata._id;
    fetch(`${BaseUrl}/addfavorite`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then(() => {
        Alert.alert("Favorite Added", `${campaign.title} added to Favorites`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // DELETE CAMPAIGN

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("RaisedDonations", { campaign })}
    >
      <View
        style={{
          ...styles.card,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          {type === "Verified Campaign" && (
            <>
              <TouchableOpacity style={{ ...styles.verifiedIcon }}>
                <MaterialCommunityIcons
                  name="check-decagram"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.heartIcon }}
                onPress={() => addToFav(campaign)}
              >
                <Ionicons
                  name="heart-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </>
          )}
          {type === "CategoryCampaigns" && (
            <>
              <TouchableOpacity
                style={{ ...styles.heartIcon }}
                onPress={() => addToFav(campaign)}
              >
                <Ionicons
                  name="heart-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
              {permission === "accepted" ? (
                <TouchableOpacity style={{ ...styles.verifiedIcon }}>
                  <MaterialCommunityIcons
                    name="check-decagram"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{ ...styles.verifiedIcon }}>
                  <Ionicons
                    name="pause-circle"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </>
          )}
          {permission === "pending" && (
            <TouchableOpacity
              style={{ ...styles.verifiedIcon }}
              onPress={() => {}}
            >
              <Ionicons name="pause-circle" size={24} color={colors.primary} />
            </TouchableOpacity>
          )}
          {type === "MyCampaigns" && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                top: 10,
              }}
              onPress={handlePress}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
          {type === "MyCampaigns" && (
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 60,
                top: 10,
              }}
              onPress={() => navigation.navigate("EditCampaign", { campaign })}
            >
              <MaterialCommunityIcons
                name="circle-edit-outline"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          )}
          {type === "FavCampaigns" && (
            <>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  right: 10,
                  top: 10,
                }}
                onPress={handlePress}
              >
                <MaterialCommunityIcons
                  name="heart-minus-outline"
                  size={24}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={{ flexDirection: "row", width: 300 }}>
          <View
            style={{
              display: "flex",
            }}
          >
            <Image style={{ ...styles.image }} source={{ uri: img }} />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}
            >
              <Image
                style={{ ...styles.userImage }}
                source={{ uri: userpic }}
              />
              <View
                style={{
                  display: "flex",
                  marginLeft: 5,
                }}
              >
                <Text>{username}</Text>
                <Text>{category}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ ...styles.heading }}>{title}</Text>
            <Text style={{ ...styles.textSecondary }}>
              Target: {target} ETH{" "}
            </Text>
            <Text style={{ ...styles.textSecondary }}>
              StartDate: {startdate.split("T")[0]}
            </Text>
            <Text style={{ ...styles.description }} numberOfLines={3}>
              Description: {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 200,
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    color: colors.primary,
  },

  textSecondary: {
    fontSize: 15,
    marginTop: 5,
    color: colors.primary,
  },
  heartIcon: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  verifiedIcon: {
    position: "absolute",
    right: 10,
    top: 10,
    marginRight: 25,
  },
  description: {
    width: 150,
    height: 100,
    color: colors.primary,
    fontSize: 15,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
