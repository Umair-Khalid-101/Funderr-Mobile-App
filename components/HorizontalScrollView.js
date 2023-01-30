import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, Text } from "react-native";

const PillButton = ({ label, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.pillButton, style]}>
    <Text style={styles.pillButtonText}>{label}</Text>
  </TouchableOpacity>
);

const HorizontalScrollView = ({ buttons }) => (
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
    {buttons.map((button, index) => (
      <PillButton key={index} {...button} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  pillButton: {
    backgroundColor: "#242F9B",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginLeft: 4,
    marginRight: 10,
  },
  pillButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default HorizontalScrollView;
