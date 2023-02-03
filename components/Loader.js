import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";

import { colors } from "./constants";

export default function Loader({ title }) {
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
          {title}
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
    backgroundColor: colors.primary,
  },
});
