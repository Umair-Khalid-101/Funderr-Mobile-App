import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

const categories = [
  "Art",
  "Social",
  "Illustration",
  "Music",
  "Technical",
  "Medical",
];

export default function CategoryPicker({ setCategory }) {
  const [selectedValue, setSelectedValue] = useState(categories[0]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a category:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          setSelectedValue(itemValue);
          setCategory(itemValue);
        }}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: "10%",
  },
  label: {
    color: "#242F9B",
    fontSize: 18,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: "#242F9B",
  },
});
