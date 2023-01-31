import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";

const { height, width } = Dimensions.get("window");
import { colors } from "./constants";

export default function MainPage() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.landingpageimage}
        source={require("../assets/landingpage.png")}
      />
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 18,
          fontWeight: "bold",
          bottom: 90,
        }}
      >
        Welcome to Funderr
      </Text>
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 14,
          bottom: 80,
        }}
      >
        We Aim to make Donation Easy!
      </Text>
      <TouchableOpacity
        style={styles.loginbuttoncontainer}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.loginbutton}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupbuttoncontainer}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.signupbutton}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8%",
    width: width,
    height: height,
  },
  landingpageimage: {
    width: "100%",
    height: "50%",

    resizeMode: "stretch",
    bottom: 90,
  },
  loginbuttoncontainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    bottom: 40,
    right: 60,
  },
  loginbutton: {
    color: colors.primary,
  },
  signupbuttoncontainer: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "white",
    paddingVertical: 9,
    paddingHorizontal: 28,
    bottom: 80,
    left: 70,
  },
  signupbutton: {
    color: "white",
  },
});
