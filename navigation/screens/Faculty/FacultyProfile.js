import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const VIPS_RED = "#E53935";
const placeholder = require("../../../assets/avatar.png");

const FacultyProfile = ({ navigation, route }) => {
  const incomingUser = route?.params?.user;

  const [user] = useState({
    name: incomingUser?.name || "Faculty Name",
    email: incomingUser?.email || "faculty@vips.edu",
    role: "Faculty",
    avatar: placeholder,
  });

  const stats = [
    { id: "s1", label: "Subjects", value: "3" },
    { id: "s2", label: "Students", value: "120" },
    { id: "s3", label: "Assignments", value: "5 Active" },
  ];

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  // 🔥 QUICK ACTIONS (FACULTY)
  const quickActions = [
    { icon: "cloud-upload-outline", label: "Upload", screen: "Upload" },
    { icon: "stats-chart-outline", label: "Dashboard", screen: "Dashboard" },
    { icon: "people-outline", label: "Students", screen: "Students" },
    { icon: "book-outline", label: "Notes", screen: "Notes" },
    { icon: "calendar-outline", label: "Timetable", screen: "Timetable" },
    { icon: "log-out-outline", label: "Logout", action: onLogout },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* 🔥 HEADER CARD */}
        <View style={styles.topCard}>
          <View style={styles.avatarRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.role}>{user.role}</Text>
            </View>
          </View>
        </View>

        {/* 🔥 STATS */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.id} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* 🔥 QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.grid}>
            {quickActions.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.gridItem}
                onPress={() =>
                  item.action
                    ? item.action()
                    : navigation.navigate(item.screen)
                }
              >
                <View
                  style={[
                    styles.iconCircle,
                    item.label === "Logout" && { backgroundColor: "#e63946" },
                  ]}
                >
                  <Ionicons name={item.icon} size={22} color="#fff" />
                </View>

                <Text
                  style={[
                    styles.gridText,
                    item.label === "Logout" && { color: "#e63946" },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 🔥 ACCOUNT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.actionList}>
            <TouchableOpacity style={styles.actionRow}>
              <Ionicons name="settings-outline" size={20} color={VIPS_RED} />
              <Text style={styles.actionLabel}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow}>
              <Ionicons name="help-circle-outline" size={20} color={VIPS_RED} />
              <Text style={styles.actionLabel}>Help & Support</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(FacultyProfile);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  container: { padding: 16 },

  topCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    marginBottom: 14,
  },

  avatarRow: { flexDirection: "row", alignItems: "center" },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 14,
  },

  userInfo: { marginLeft: 12 },

  name: { fontSize: 20, fontWeight: "bold" },
  email: { color: "#666", marginTop: 4 },

  role: {
    marginTop: 4,
    color: VIPS_RED,
    fontWeight: "600",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 5,
    alignItems: "center",
  },

  statValue: { fontSize: 18, fontWeight: "bold" },
  statLabel: { fontSize: 12, color: "#666" },

  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "30%",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 12,
    elevation: 3,
  },

  iconCircle: {
    backgroundColor: VIPS_RED,
    padding: 10,
    borderRadius: 50,
  },

  gridText: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "600",
  },

  actionList: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  actionLabel: {
    marginLeft: 10,
    fontWeight: "600",
  },
});