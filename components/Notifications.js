import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "./constants";
import Loader from "./Loader";
import { BaseUrl } from "./constants";
import UserContext from "./context/userContext";

const NotificationItem = ({ item, onPress }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.itemText} numberOfLines={2}>
      {item.message}
    </Text>
    <View>
      {item.status === "read" ? (
        <>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
            }}
          >
            <MaterialCommunityIcons
              name="checkbox-multiple-marked-outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 20,
            }}
          >
            <MaterialCommunityIcons
              name="bell-badge-outline"
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
    {item.status === "unread" ? (
      <>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Mark As Read</Text>
        </TouchableOpacity>
      </>
    ) : (
      <></>
    )}
  </View>
);

const Notifications = () => {
  const { token, markAsRead } = useContext(UserContext);
  const [userNotifications, setuserNotifications] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetch(`${BaseUrl}/usernotifications`, {
      headers: {
        "x-auth-token": token,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setuserNotifications(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [notifications, setNotifications] = useState([
    {
      "._id": "1",
      notification: "You do not have any Notifications",
      status: "unread",
    },
  ]);

  const handlePress = (id) => {
    let updatedNotifications = userNotifications.map((item) => {
      return item._id === id ? { ...item, status: "read" } : item;
    });
    // console.log("UpdatedNotifications: ", updatedNotifications);
    setuserNotifications(updatedNotifications);
    markAsRead(id);
    Alert.alert("Read", "Marked as Read");
  };

  return (
    <>
      {isLoading && <Loader title="Loading Notifications..." />}
      {!isLoading && (
        <SafeAreaView>
          <>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "flex-start",
                marginTop: 30,
                marginLeft: 10,
                marginBottom: 20,
              }}
            >
              <AntDesign
                name="arrowleft"
                size={28}
                color={colors.primary}
                onPress={() => navigation.navigate("LandingPage")}
              />
            </View>
            {userNotifications.length > 0 && (
              <>
                <FlatList
                  data={userNotifications}
                  renderItem={({ item }) => (
                    <NotificationItem
                      item={item}
                      onPress={() => handlePress(item._id)}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                />
              </>
            )}
            {userNotifications.length === 0 && (
              <FlatList
                data={notifications}
                renderItem={({ item }) => (
                  <NotificationItem
                    item={item}
                    onPress={() => handlePress(item._id)}
                  />
                )}
                keyExtractor={(item) => item._id}
              />
            )}
          </>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 12,
    flex: 1,
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 10,
  },
});

export default Notifications;
