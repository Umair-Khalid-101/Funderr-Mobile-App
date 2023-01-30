import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

export default function Loader() {
  const animation = useRef(null);

  return (
    <View style={styles.loaderContainer}>
      <LottieView
        autoPlay
        ref={animation}
        source={require("../assets/Loader.json")}
        style={{
          position: "absolute",
          marginTop: 100,
          height: 150,
          width: 150,
        }}
      />
      <View>
        <Text
          style={{
            color: "white",
          }}
        >
          Loading Data.
        </Text>
        <Text
          style={{
            color: "white",
          }}
        >
          Please Wait!!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
});
