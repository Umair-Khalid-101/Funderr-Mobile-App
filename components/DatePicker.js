import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MyDatePicker = ({ setDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowCalendar(false);
    setDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 30,
          }}
        >
          <Text
            style={{
              fontSize: 24,
              color: "#242F9B",
            }}
          >
            {selectedDate}
          </Text>
          <MaterialCommunityIcons
            name="calendar"
            size={32}
            color="#242F9B"
            style={{
              marginRight: 50,
            }}
          />
        </View>
      </TouchableOpacity>
      {showCalendar && (
        <View style={styles.calendarModal}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                disableTouchEvent: true,
                selectedDotColor: "orange",
              },
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  calendarModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default MyDatePicker;
