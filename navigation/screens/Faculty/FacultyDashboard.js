import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// 🔥 Demo Data
const students = [
  { id: "1", name: "Rahul", percentage: 60 },
  { id: "2", name: "Ankit", percentage: 65 },
  { id: "3", name: "Priya", percentage: 55 },
];

const assignments = [
  { id: "a1", title: "OOP Assignment", subject: "Java", due: "Nov 25" },
  { id: "a2", title: "Linked List", subject: "DS", due: "Nov 28" },
];

const FacultyDashboard = ({ navigation, user }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  // 🔴 Student Card
  const StudentCard = ({ item }) => (
    <View style={styles.attCard}>
      <View style={styles.attTopRow}>
        <Text style={styles.attSubject}>{item.name}</Text>
        <Text style={styles.attPercent}>{item.percentage}%</Text>
      </View>

      <View style={styles.progressBg}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${item.percentage}%`,
              backgroundColor:
                item.percentage < 75 ? "#E53935" : "#4CAF50",
            },
          ]}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >

        {/* 🔥 HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}>Welcome Back 👋</Text>
            <Text style={styles.username}>{user?.name || "Faculty"}</Text>
          </View>
        </View>

        {/* 📊 SUMMARY CARDS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color="#E53935" />
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="alert-circle" size={24} color="#E53935" />
            <Text style={styles.statValue}>35</Text>
            <Text style={styles.statLabel}>Low Attendance</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color="#E53935" />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Assignments</Text>
          </View>
        </View>

        {/* 🔴 LOW ATTENDANCE */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Low Attendance Students</Text>
          </View>

          <FlatList
            data={students}
            horizontal
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <StudentCard item={item} />}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* 📋 ASSIGNMENTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Assignments</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {assignments.map((a) => (
              <View key={a.id} style={styles.assignCard}>
                <Text style={styles.assignSubject}>{a.subject}</Text>
                <Text style={styles.assignTitle}>{a.title}</Text>

                <View style={styles.assignDueRow}>
                  <Ionicons name="time" size={16} color="#E53935" />
                  <Text style={styles.assignDue}>Due: {a.due}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* ⚡ QUICK ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickGrid}>
            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate("Upload")}
            >
              <Ionicons name="cloud-upload" size={22} color="#E53935" />
              <Text style={styles.quickLabel}>Upload</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickAction}
              onPress={() => navigation.navigate("Analytics")}
            >
              <Ionicons name="stats-chart" size={22} color="#E53935" />
              <Text style={styles.quickLabel}>Analytics</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 🎯 INSIGHT CARD */}
        <View style={styles.insightCard}>
          <Ionicons name="bulb" size={22} color="#fff" />
          <Text style={styles.insightText}>
            35 students need attention due to low attendance
          </Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default FacultyDashboard;

// 🎨 STYLES
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  container: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  greet: {
    color: "#666",
    fontSize: 14,
  },

  username: {
    fontSize: 22,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "30%",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  statValue: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    textAlign: "center",
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  attCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: Math.min(280, width * 0.7),
    marginRight: 12,
    elevation: 2,
  },

  attTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  attSubject: {
    fontSize: 16,
    fontWeight: "700",
  },

  attPercent: {
    fontWeight: "700",
  },

  progressBg: {
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
  },

  progressFill: {
    height: "100%",
    borderRadius: 8,
  },

  assignCard: {
    width: Math.min(280, width * 0.75),
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    elevation: 2,
  },

  assignSubject: {
    color: "#E53935",
    fontWeight: "700",
  },

  assignTitle: {
    marginTop: 6,
    fontWeight: "600",
  },

  assignDueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  assignDue: {
    marginLeft: 6,
    color: "#555",
  },

  quickGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  quickAction: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    elevation: 2,
  },

  quickLabel: {
    marginTop: 6,
    fontWeight: "600",
  },

  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E53935",
    padding: 16,
    borderRadius: 12,
  },

  insightText: {
    marginLeft: 10,
    color: "#fff",
    fontWeight: "600",
  },
});