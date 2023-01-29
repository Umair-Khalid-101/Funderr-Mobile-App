import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Card from "./UserData/Card";
export default function LandingPage() {
  const navigation = useNavigation();
  return (
    <View>
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
        />
      </View>
      <View
        style={{
          width: "100%",
          left: 10,
        }}
      >
        <Text
          style={{
            marginTop: 15,
            color: "#242F9B",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Categories
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: 400,
          }}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ height: 70, }}
          >
            <TouchableOpacity
              style={styles.categorybuttons}
              onPress={() => navigation.navigate("Tech")}
            >
              <Text
                style={{ color: "white", fontSize: 10 }}
                onPress={() => navigation.navigate("Tech")}
              >
                Tech
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categorybuttons2}
              onPress={() => navigation.navigate("Medical")}
            >
              <Text
                style={{ color: "white", fontSize: 10 }}
                onPress={() => navigation.navigate("Medical")}
              >
                Medical
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categorybuttons2}
              onPress={() => navigation.navigate("Art")}
            >
              <Text
                style={{ color: "white", fontSize: 10 }}
                onPress={() => navigation.navigate("Art")}
              >
                Art
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categorybuttons2}
              onPress={() => navigation.navigate("Music")}
            >
              <Text
                style={{ color: "white", fontSize: 10 }}
                onPress={() => navigation.navigate("Music")}
              >
                Music
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.categorybuttons2}
              onPress={() => navigation.navigate("Illustration")}
            >
              <Text
                style={{ color: "white", fontSize: 10 }}
                onPress={() => navigation.navigate("Illustration")}
              >
                Illustration
              </Text>
            </TouchableOpacity>
            <View style={{width:30}}></View>
          </ScrollView>

        </View>
      </View>
      <ScrollView style={{ height: 515 }}>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ color: "#242F9B", fontWeight: "bold", fontSize: 20 }}>
            All Campaigns
          </Text>
          <View style={{ marginTop: 10 }}>
            <Card />
          </View>
          <View style={{ marginTop: 10 }}>
            <Card />
          </View>
          <View style={{ marginTop: 10 }}>
            <Card />
          </View>
          <View style={{ marginTop: 10 }}>
            <Card />
          </View>
        </View>
        <View style={{ height: 30 }}></View>
      </ScrollView>

      <View
        style={{
          height: 100,
          width: "100%",
          backgroundColor: "#242F9B",
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
        }}
      >
        <TouchableOpacity
          style={styles.newcampaign}
          onPress={() => navigation.navigate("NewCampaign")}
        >
          <Text
            style={{ color: "#242F9B", fontSize: 30 }}
            onPress={() => navigation.navigate("NewCampaign")}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Navbar: {
    backgroundColor: "#242F9B",
    height: 150,
    width: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  newcampaign: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginRight: 20,
    alignSelf: "center",
  },
  categorybuttons: {
    backgroundColor: "#242F9B",
    height: 40,
    borderRadius: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  categorybuttons2: {
    backgroundColor: "#242F9B",
    height: 40,
    borderRadius: 50,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 10,
  },
});
