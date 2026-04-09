import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const Analytics = ({ user }) => {
  // 📊 Attendance Data
  const attendanceData = {
    labels: ["DS", "Java", "Web", "AI"],
    datasets: [
      {
        data: [85, 72, 90, 65],
      },
    ],
  };

  // 🥧 Assignment Data
  const assignmentData = [
    {
      name: "Completed",
      population: 60,
      color: "#4CAF50",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "Pending",
      population: 40,
      color: "#E53935",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* 🔥 Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>
            Insights for {user?.name || "Faculty"}
          </Text>
        </View>

        {/* 📊 Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="people" size={24} color="#E53935" />
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color="#E53935" />
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Assignments</Text>
          </View>
        </View>

        {/* 📊 Attendance Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Subject Attendance</Text>

          <BarChart
            data={attendanceData}
            width={screenWidth - 32}
            height={220}
            yAxisSuffix="%"
            chartConfig={{
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(229,57,53, ${opacity})`,
              labelColor: () => "#333",
              barPercentage: 0.6,
            }}
            style={styles.chart}
          />
        </View>

        {/* 🥧 Pie Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Assignment Status</Text>

          <PieChart
            data={assignmentData}
            width={screenWidth - 32}
            height={200}
            chartConfig={{
              color: () => "#000",
            }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"15"}
            absolute
          />
        </View>

        {/* 📌 Extra Insight Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>

          <View style={styles.insightCard}>
            <Ionicons name="alert-circle" size={20} color="#E53935" />
            <Text style={styles.insightText}>
              35 students have attendance below 75%
            </Text>
          </View>

          <View style={styles.insightCard}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.insightText}>
              Majority assignments are being completed on time
            </Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
    padding: 16,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    color: "#666",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
  },

  statLabel: {
    color: "#666",
    marginTop: 4,
  },

  section: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  chart: {
    borderRadius: 12,
    marginTop: 10,
  },

  insightCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  insightText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "600",
  },
});