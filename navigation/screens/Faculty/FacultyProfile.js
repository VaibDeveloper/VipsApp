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
    { id: "s3", label: "Assignments", value: "5 active" },
  ];

  const actions = [
    {
      id: "a1",
      icon: "cloud-upload-outline",
      label: "Upload Assignment",
      onPress: () => navigation.navigate("Upload"),
    },
    {
      id: "a2",
      icon: "stats-chart-outline",
      label: "View Attendance",
      onPress: () => navigation.navigate("Dashboard"),
    },
    {
      id: "a3",
      icon: "settings-outline",
      label: "Settings",
      onPress: () => Alert.alert("Settings clicked"),
    },
  ];

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => navigation.replace("Login"),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Top Card */}
        <View style={styles.topCard}>
          <View style={styles.avatarRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.role}>{user.role}</Text>
            </View>
          </View>

          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
              <Ionicons name="log-out-outline" size={18} color={VIPS_RED} />
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.id} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faculty Actions</Text>

          {actions.map((a) => (
            <TouchableOpacity
              key={a.id}
              style={styles.actionRow}
              onPress={a.onPress}
            >
              <Ionicons name={a.icon} size={20} color={VIPS_RED} />
              <Text style={styles.actionText}>{a.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#999" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FacultyProfile;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  container: {
    padding: 16,
  },

  topCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    marginBottom: 14,
  },

  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  userInfo: {
    marginLeft: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  email: {
    color: "#666",
    marginTop: 4,
  },

  role: {
    marginTop: 4,
    color: VIPS_RED,
    fontWeight: "600",
  },

  topButtons: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoutBtnText: {
    marginLeft: 6,
    color: VIPS_RED,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  statLabel: {
    marginTop: 4,
    color: "#666",
  },

  section: {
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  actionText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
  },
});