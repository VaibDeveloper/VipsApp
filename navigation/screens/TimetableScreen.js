import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

const timetableData = {
  Monday: [
    { subject: "Maths", time: "9:00 - 10:00", teacher: "Mr. Sharma", room: "101" },
    { subject: "DBMS", time: "10:00 - 11:00", teacher: "Ms. Gupta", room: "202" },
    { subject: "OS", time: "11:00 - 12:00", teacher: "Mr. Khan", room: "103" },
    { subject: "Lunch Break", time: "12:00 - 12:30", type: "break" },
    { subject: "AI", time: "12:30 - 1:30", teacher: "Ms. Singh", room: "204" },
    { subject: "Web Dev", time: "1:30 - 2:30", teacher: "Mr. Mehta", room: "305" },
  ],

  Tuesday: [
    { subject: "AI", time: "9:00 - 10:00", teacher: "Ms. Singh", room: "204" },
    { subject: "Maths", time: "10:00 - 11:00", teacher: "Mr. Sharma", room: "101" },
    { subject: "DBMS", time: "11:00 - 12:00", teacher: "Ms. Gupta", room: "202" },
    { subject: "Lunch Break", time: "12:00 - 12:30", type: "break" },
    { subject: "OS Lab", time: "12:30 - 1:30", teacher: "Mr. Khan", room: "Lab 1" },
    { subject: "Soft Skills", time: "1:30 - 2:30", teacher: "Ms. Verma", room: "Auditorium" },
  ],

  Wednesday: [
    { subject: "Web Dev", time: "9:00 - 10:00", teacher: "Mr. Mehta", room: "305" },
    { subject: "AI", time: "10:00 - 11:00", teacher: "Ms. Singh", room: "204" },
    { subject: "Maths", time: "11:00 - 12:00", teacher: "Mr. Sharma", room: "101" },
    { subject: "Lunch Break", time: "12:00 - 12:30", type: "break" },
    { subject: "DBMS Lab", time: "12:30 - 1:30", teacher: "Ms. Gupta", room: "Lab 2" },
    { subject: "OS", time: "1:30 - 2:30", teacher: "Mr. Khan", room: "103" },
  ],

  Thursday: [
    { subject: "Maths", time: "9:00 - 10:00", teacher: "Mr. Sharma", room: "101" },
    { subject: "OS", time: "10:00 - 11:00", teacher: "Mr. Khan", room: "103" },
    { subject: "AI", time: "11:00 - 12:00", teacher: "Ms. Singh", room: "204" },
    { subject: "Lunch Break", time: "12:00 - 12:30", type: "break" },
    { subject: "Web Dev", time: "12:30 - 1:30", teacher: "Mr. Mehta", room: "305" },
    { subject: "DBMS", time: "1:30 - 2:30", teacher: "Ms. Gupta", room: "202" },
  ],

  Friday: [
    { subject: "AI Lab", time: "9:00 - 10:30", teacher: "Ms. Singh", room: "Lab 3" },
    { subject: "Maths", time: "10:30 - 11:30", teacher: "Mr. Sharma", room: "101" },
    { subject: "OS", time: "11:30 - 12:00", teacher: "Mr. Khan", room: "103" },
    { subject: "Lunch Break", time: "12:00 - 12:30", type: "break" },
    { subject: "Web Dev", time: "12:30 - 1:30", teacher: "Mr. Mehta", room: "305" },
  ],

  Saturday: [
    { subject: "Soft Skills", time: "9:00 - 10:00", teacher: "Ms. Verma", room: "Auditorium" },
    { subject: "Project Work", time: "10:00 - 12:00", teacher: "Faculty", room: "Lab" },
    { subject: "Lunch Break", time: "12:00 - 12:30", type: "break" },
  ],
};

const colors = {
  Maths: "#FF6B6B",
  DBMS: "#4ECDC4",
  OS: "#FFD93D",
  AI: "#6C5CE7",
  "Web Dev": "#00B894",
};

const getCurrentTime = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

const isCurrentClass = (time) => {
  const [start, end] = time.split(" - ");
  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const current = getCurrentTime();
  return current >= toMinutes(start) && current <= toMinutes(end);
};

const TimetableScreen = () => {
  const days = Object.keys(timetableData);
  const [selectedDay, setSelectedDay] = useState("Monday");

  const data = useMemo(() => timetableData[selectedDay], [selectedDay]);

  const renderItem = ({ item }) => {
    if (item.type === "break") {
      return (
        <View style={styles.breakCard}>
          <Text style={styles.breakText}>{item.subject} 🍱</Text>
          <Text style={styles.breakTime}>{item.time}</Text>
        </View>
      );
    }

    const active = isCurrentClass(item.time);

    return (
      <View
        style={[
          styles.card,
          { borderLeftColor: colors[item.subject] || "#ccc" },
          active && styles.activeCard,
        ]}
      >
        <View style={styles.row}>
          <Text style={styles.subject}>{item.subject}</Text>
          {active && <Text style={styles.live}>LIVE</Text>}
        </View>

        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.meta}>
          {item.teacher} • Room {item.room}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Timetable</Text>

      {/* Days UI */}
      <View style={styles.dayContainer}>
        <FlatList
          horizontal
          data={days}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dayBtn,
                selectedDay === item && styles.activeDay,
              ]}
              onPress={() => setSelectedDay(item)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDay === item && styles.activeDayText,
                ]}
              >
                {item.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default TimetableScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f7fb",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
  },

  dayContainer: {
    marginVertical: 15,
    paddingVertical: 8,
  },

  dayBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: "#f1f2f6",
    marginRight: 12,
  },

  activeDay: {
    backgroundColor: "#6C5CE7",
    elevation: 5,
    shadowColor: "#6C5CE7",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  dayText: {
    fontWeight: "600",
    fontSize: 14,
    color: "#444",
  },

  activeDayText: {
    color: "#fff",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    borderLeftWidth: 6,
    elevation: 3,
  },

  activeCard: {
    borderWidth: 1,
    borderColor: "#6C5CE7",
  },

  breakCard: {
    backgroundColor: "#ffeaa7",
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
    alignItems: "center",
  },

  breakText: {
    fontWeight: "bold",
  },

  breakTime: {
    fontSize: 12,
    color: "#555",
  },

  subject: {
    fontSize: 18,
    fontWeight: "bold",
  },

  time: {
    marginTop: 4,
    color: "#555",
  },

  meta: {
    marginTop: 4,
    color: "#888",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  live: {
    color: "#e63946",
    fontWeight: "bold",
  },
});