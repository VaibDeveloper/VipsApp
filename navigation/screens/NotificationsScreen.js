import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const notifications = [
  {
    id: "1",
    title: "Assignment Due",
    message: "OOP Assignment due tomorrow",
    time: "2h ago",
    type: "assignment",
  },
  {
    id: "2",
    title: "Low Attendance Alert",
    message: "Your Java attendance dropped below 75%",
    time: "5h ago",
    type: "alert",
  },
  {
    id: "3",
    title: "New Notes Uploaded",
    message: "DS Notes uploaded by Prof. Sharma",
    time: "1 day ago",
    type: "notes",
  },
];

const getIcon = (type) => {
  switch (type) {
    case "assignment":
      return "clipboard-outline";
    case "alert":
      return "alert-circle-outline";
    case "notes":
      return "book-outline";
    default:
      return "notifications-outline";
  }
};

const NotificationsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🔔 Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.iconBox}>
              <Ionicons name={getIcon(item.type)} size={22} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    elevation: 3,
    alignItems: "center",
  },

  iconBox: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },

  titleText: {
    fontSize: 15,
    fontWeight: "700",
  },

  message: {
    color: "#555",
    marginTop: 4,
  },

  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
  },
});