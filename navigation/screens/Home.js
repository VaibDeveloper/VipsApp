import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const PRIMARY = "#E53935";

const sampleAttendance = [
  { id: "1", subject: "Data Structures", percentage: 85, color: "#f28b82" },
  { id: "2", subject: "Java", percentage: 72, color: "#aecbfa" },
  { id: "3", subject: "Web Tech", percentage: 95, color: "#ccff90" },
];

const sampleAssignments = [
  { id: "a1", subject: "Java", title: "OOP Concepts", dueDate: "Nov 25" },
  { id: "a2", subject: "DS", title: "Linked List", dueDate: "Nov 28" },
];

const QuickAction = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickItem} onPress={onPress}>
    <View style={styles.quickIcon}>
      <Ionicons name={icon} size={20} color="#fff" />
    </View>
    <Text style={styles.quickText}>{label}</Text>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={PRIMARY} />}
      >

        {/* 🔥 HEADER */}
        <View style={styles.headerCard}>
          <View>
            <Text style={styles.greet}>Welcome back 👋</Text>
            <Text style={styles.username}>Vaibhav</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image source={require("../../assets/avatar.png")} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {/* 🔥 TODAY SUMMARY */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Ionicons name="analytics-outline" size={20} color={PRIMARY} />
            <Text style={styles.summaryText}>Attendance 88%</Text>
          </View>

          <View style={styles.summaryItem}>
            <Ionicons name="alert-circle-outline" size={20} color={PRIMARY} />
            <Text style={styles.summaryText}>3 Assignments Due</Text>
          </View>
        </View>

        {/* 🔥 QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickGrid}>
            <QuickAction icon="calendar-outline" label="Timetable" onPress={() => navigation.navigate("Timetable")} />
            <QuickAction icon="document-text-outline" label="Attendance" onPress={() => navigation.navigate("Attendance")} />
            <QuickAction icon="clipboard-outline" label="Assignments" onPress={() => navigation.navigate("Assignments")} />
            <QuickAction icon="book-outline" label="Notes" onPress={() => navigation.navigate("Notes")} />
          </View>
        </View>

        {/* 🔥 ATTENDANCE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>

          <FlatList
            data={sampleAttendance}
            horizontal
            keyExtractor={(i) => i.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.attCard}>
                <Text style={styles.attSubject}>{item.subject}</Text>
                <Text style={styles.attPercent}>{item.percentage}%</Text>

                <View style={styles.progressBg}>
                  <View style={[styles.progressFill, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
                </View>
              </View>
            )}
          />
        </View>

        {/* 🔥 ASSIGNMENTS */}
        <View style={[styles.section, { marginBottom: 40 }]}>
          <Text style={styles.sectionTitle}>Assignments</Text>

          {sampleAssignments.map((a) => (
            <View key={a.id} style={styles.assignCard}>
              <Text style={styles.assignTitle}>{a.title}</Text>
              <Text style={styles.assignSub}>{a.subject}</Text>
              <Text style={styles.assignDue}>Due: {a.dueDate}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },
  container: { padding: 16 },

  headerCard: {
    backgroundColor: PRIMARY,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  greet: { color: "#fff", opacity: 0.8 },
  username: { color: "#fff", fontSize: 20, fontWeight: "bold" },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },

  summaryCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  summaryText: {
    marginLeft: 8,
    fontWeight: "600",
  },

  section: { marginBottom: 18 },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },

  quickGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },

  quickItem: {
    alignItems: "center",
    width: "23%",
  },

  quickIcon: {
    backgroundColor: PRIMARY,
    padding: 12,
    borderRadius: 50,
  },

  quickText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
  },

  attCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    width: width * 0.6,
  },

  attSubject: { fontWeight: "bold" },
  attPercent: { marginTop: 6 },

  progressBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginTop: 10,
  },

  progressFill: {
    height: "100%",
    borderRadius: 10,
  },

  assignCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
  },

  assignTitle: { fontWeight: "bold" },
  assignSub: { color: "#666", marginTop: 4 },
  assignDue: { color: PRIMARY, marginTop: 6 },
});