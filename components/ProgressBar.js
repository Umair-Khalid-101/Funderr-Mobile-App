import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

import { colors } from "./constants";

const ProgressBar = ({ progress, raised, target }) => {
  const [width, setWidth] = useState(0);

  React.useEffect(() => {
    setWidth(progress);
  }, [progress]);

  return (
    <>
      <View style={styles.container}>
        <View color={colors.primary} style={styles.progress}>
          <View style={[styles.innerProgress, { width: `${width}%` }]} />
        </View>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginRight: 5,
            color: colors.primary,
          }}
        >
          {raised} ETH
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: colors.primary,
          }}
        >
          raised of Target {target} ETH
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 10,
    width: "80%",
    backgroundColor: "#cccccc",
    borderRadius: 50,
    marginVertical: 10,
  },
  progress: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
    flexDirection: "row",
  },
  innerProgress: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: 50,
  },
});

export default ProgressBar;
