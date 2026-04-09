import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const VIPS_RED = "#E53935";
const placeholder = require("../../assets/avatar.png");

const Profile = ({ navigation, route }) => {
  const incomingUser = route?.params?.user;

  const [user, setUser] = useState({
    name: incomingUser?.name || "User",
    email: incomingUser?.email || "No Email",
    phone: "9876543210",
    avatar: placeholder,
  });

  const [editVisible, setEditVisible] = useState(false);
  const [tempName, setTempName] = useState(user?.name);
  const [tempPhone, setTempPhone] = useState(user.phone);

  const openEdit = () => {
    setTempName(user?.name);
    setTempPhone(user.phone);
    setEditVisible(true);
  };

  const saveEdit = () => {
    setUser((prev) => ({
      ...prev,
      name: tempName.trim() || prev.name,
      phone: tempPhone.trim() || prev.phone,
    }));
    setEditVisible(false);
    Alert.alert("Saved", "Profile updated");
  };

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: () => navigation.replace("Login") },
    ]);
  };

  const quickActions = [
    { icon: "home-outline", label: "Home", screen: "Home" },
    { icon: "calendar-outline", label: "Timetable", screen: "Timetable" },
    { icon: "document-text-outline", label: "Attendance", screen: "Attendance" },
    { icon: "clipboard-outline", label: "Assignments", screen: "Assignments" },
    { icon: "book-outline", label: "Notes", screen: "Notes" },
    { icon: "log-out-outline", label: "Logout", action: onLogout },
  ];

  const stats = [
    { id: "s1", label: "Attendance", value: "88%" },
    { id: "s2", label: "Assignments", value: "3 due" },
    { id: "s3", label: "Notes", value: "12" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.topCard}>
          <View style={styles.avatarRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user?.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.editBtn} onPress={openEdit}>
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          {stats.map((s) => (
            <View key={s.id} style={styles.statCard}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* QUICK ACTIONS */}
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

        {/* ACCOUNT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <View style={styles.actionList}>
            <TouchableOpacity style={styles.actionRow} onPress={() => navigation.navigate("SetPassword", { email: user.email })}>
              <Ionicons name="key-outline" size={20} color={VIPS_RED} />
              <Text style={styles.actionLabel}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow} onPress={() => navigation.navigate("Settings")}>
              <Ionicons name="settings-outline" size={20} color={VIPS_RED} />
              <Text style={styles.actionLabel}>Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionRow} onPress={() => navigation.navigate("Help")}>
              <Ionicons name="help-circle-outline" size={20} color={VIPS_RED} />
              <Text style={styles.actionLabel}>Help & Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* EDIT MODAL */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput style={styles.modalInput} value={tempName} onChangeText={setTempName} placeholder="Name" />
            <TextInput style={styles.modalInput} value={tempPhone} onChangeText={setTempPhone} placeholder="Phone" />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#eee" }]} onPress={() => setEditVisible(false)}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: VIPS_RED }]} onPress={saveEdit}>
                <Text style={{ color: "#fff" }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default React.memo(Profile);

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
  phone: { color: "#666", marginTop: 2 },

  topButtons: {
    marginTop: 14,
    flexDirection: "row",
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: VIPS_RED,
    padding: 10,
    borderRadius: 10,
  },

  editBtnText: { color: "#fff", marginLeft: 6 },

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

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },

  modalBtn: {
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
});