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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const VIPS_RED = "#E53935";
const placeholder = require("../../assets/avatar.png");

const Profile = ({ navigation }) => {
  // user state (in real app fetch from backend or context)
  const [user, setUser] = useState({
    name: "Bhawna Verma",
    email: "bca_02629802023_vaibhav@vipstc.edu.in",
    phone: "9876543210",
    avatar: placeholder,
  });

  // modal state for edit
  const [editVisible, setEditVisible] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempPhone, setTempPhone] = useState(user.phone);

  const openEdit = () => {
    setTempName(user.name);
    setTempPhone(user.phone);
    setEditVisible(true);
  };

  const saveEdit = () => {
    setUser((prev) => ({ ...prev, name: tempName.trim() || prev.name, phone: tempPhone.trim() || prev.phone }));
    setEditVisible(false);
    Alert.alert("Saved", "Profile updated");
  };

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // replace with real logout logic
          navigation.replace("Login");
        },
      },
    ]);
  };

  const stats = [
    { id: "s1", label: "Attendance", value: "88%" },
    { id: "s2", label: "Assignments", value: "3 due" },
    { id: "s3", label: "Notes", value: "12" },
  ];

  const actions = [
    { id: "a1", icon: "key-outline", label: "Change Password", onPress: () => navigation.navigate("SetPassword", { email: user.email }) },
    { id: "a2", icon: "settings-outline", label: "Settings", onPress: () => navigation.navigate("Settings") },
    { id: "a3", icon: "help-circle-outline", label: "Help & Support", onPress: () => navigation.navigate("Help") },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* header area */}
        <View style={styles.topCard}>
          <View style={styles.avatarRow}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <Text style={styles.phone}>{user.phone}</Text>
            </View>
          </View>

          <View style={styles.topButtons}>
            <TouchableOpacity style={styles.editBtn} onPress={openEdit}>
              <Ionicons name="create-outline" size={18} color="#fff" />
              <Text style={styles.editBtnText}>Edit Profile</Text>
            </TouchableOpacity>

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

        {/* Quick actions / Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate("Notes")}>
              <Ionicons name="book-outline" size={22} color={VIPS_RED} />
              <Text style={styles.gridText}>Notes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate("Attendance")}>
              <Ionicons name="document-text-outline" size={22} color={VIPS_RED} />
              <Text style={styles.gridText}>Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate("Assignments")}>
              <Ionicons name="clipboard-outline" size={22} color={VIPS_RED} />
              <Text style={styles.gridText}>Assignments</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate("Timetable")}>
              <Ionicons name="calendar-outline" size={22} color={VIPS_RED} />
              <Text style={styles.gridText}>Timetable</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Actions list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.actionList}>
            {actions.map((a) => (
              <TouchableOpacity key={a.id} style={styles.actionRow} onPress={a.onPress}>
                <View style={styles.actionLeft}>
                  <Ionicons name={a.icon} size={20} color={VIPS_RED} />
                </View>
                <Text style={styles.actionLabel}>{a.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#999" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent activity / placeholder */}
        <View style={[styles.section, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityItem}>
            <Ionicons name="document-text-outline" size={18} color="#777" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.activityText}>Uploaded: DS - Sorting Algorithms</Text>
              <Text style={styles.activitySub}>2 days ago</Text>
            </View>
          </View>

          <View style={styles.activityItem}>
            <Ionicons name="checkmark-done-outline" size={18} color="#777" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.activityText}>Marked assignment completed</Text>
              <Text style={styles.activitySub}>3 days ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Edit modal */}
      <Modal visible={editVisible} animationType="slide" transparent>
        <SafeAreaView style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput style={styles.modalInput} value={tempName} onChangeText={setTempName} placeholder="Full name" />
            <TextInput style={styles.modalInput} value={tempPhone} onChangeText={setTempPhone} placeholder="Phone" keyboardType="phone-pad" />

            <View style={styles.modalActions}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: "#eee" }]} onPress={() => setEditVisible(false)}>
                <Text style={{ color: "#333", fontWeight: "700" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: VIPS_RED }]} onPress={saveEdit}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Save</Text>
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
  safe: { flex: 1, backgroundColor: "#fff" },

  container: {
    padding: 16,
    paddingBottom: 32,
  },

  topCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    marginBottom: 14,
  },

  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 86,
    height: 86,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
  },

  userInfo: {
    marginLeft: 12,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
  },

  email: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  phone: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },

  topButtons: {
    marginTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: VIPS_RED,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  editBtnText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  logoutBtnText: {
    color: VIPS_RED,
    marginLeft: 8,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
  },

  gridText: {
    marginTop: 8,
    fontWeight: "600",
  },

  actionList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f6f6f6",
  },

  actionLeft: {
    width: 36,
    alignItems: "center",
  },

  actionLabel: {
    flex: 1,
    marginLeft: 8,
    fontWeight: "600",
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },

  activityText: {
    fontWeight: "600",
  },

  activitySub: {
    color: "#888",
    fontSize: 12,
    marginTop: 6,
  },

  /* Modal styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginTop: 8,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
  },

  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
});
