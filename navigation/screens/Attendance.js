import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const attendanceData = [
  { subject: "Java", faculty: "Dr. Swati Jain", percentage: 85, color: "#4CAF50" },
  { subject: "Digital Marketing", faculty: "Dr. Pawan Whig", percentage: 60, color: "#E53935" },
  { subject: "Software Engineering", faculty: "Dr. Pooja Thakar", percentage: 95, color: "#4CAF50" },
  { subject: "DSA", faculty: "Dr. Pooja Saigal", percentage: 78, color: "#FFA000" },
];

const Attendance = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // 📊 Overall %
  const avg =
    Math.round(
      attendanceData.reduce((sum, s) => sum + s.percentage, 0) /
        attendanceData.length
    ) || 0;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* 🔥 HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Attendance</Text>
          <Text style={styles.subtitle}>Your performance overview</Text>
        </View>

        {/* 📊 OVERALL CARD */}
        <View style={styles.overallCard}>
          <Text style={styles.overallText}>Overall Attendance</Text>
          <Text style={styles.overallValue}>{avg}%</Text>
        </View>

        {/* 📚 SUBJECT LIST */}
        {attendanceData.map((item, index) => {
          const isExpanded = expandedIndex === index;

          const pieData = [
            {
              name: "Present",
              attendance: item.percentage,
              color: item.color,
              legendFontColor: "#333",
              legendFontSize: 12,
            },
            {
              name: "Absent",
              attendance: 100 - item.percentage,
              color: "#e0e0e0",
              legendFontColor: "#333",
              legendFontSize: 12,
            },
          ];

          return (
            <View key={index} style={styles.card}>
              
              {/* 🔹 HEADER ROW */}
              <TouchableOpacity
                style={styles.row}
                onPress={() => toggleExpand(index)}
              >
                <View>
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.faculty}>{item.faculty}</Text>
                </View>

                <View style={styles.right}>
                  <Text style={[styles.percent, { color: item.color }]}>
                    {item.percentage}%
                  </Text>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#555"
                  />
                </View>
              </TouchableOpacity>

              {/* 🔥 EXPANDED CONTENT */}
              {isExpanded && (
                <View style={styles.expandSection}>

                  {/* Chart */}
                  <PieChart
                    data={pieData}
                    width={screenWidth - 80}
                    height={180}
                    chartConfig={{
                      color: () => "#000",
                    }}
                    accessor="attendance"
                    backgroundColor="transparent"
                    paddingLeft="40"
                    hasLegend={false}
                  />

                  {/* Stats */}
                  <View style={styles.statsRow}>
                    <Text style={styles.stat}>
                      Present: {item.percentage}%
                    </Text>
                    <Text style={styles.stat}>
                      Absent: {100 - item.percentage}%
                    </Text>
                  </View>

                  {/* Status */}
                  <View style={styles.statusBox}>
                    <Text style={styles.statusText}>
                      {item.percentage >= 75
                        ? "✅ Good Attendance"
                        : "⚠️ Low Attendance - Improve"}
                    </Text>
                  </View>

                </View>
              )}

            </View>
          );
        })}

      </ScrollView>
    </View>
  );
};

export default Attendance;

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
    padding: 16,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
  },

  subtitle: {
    color: "#666",
    marginTop: 4,
  },

  overallCard: {
    backgroundColor: "#E53935",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },

  overallText: {
    color: "#fff",
    fontSize: 14,
  },

  overallValue: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    padding: 14,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subject: {
    fontSize: 16,
    fontWeight: "700",
  },

  faculty: {
    color: "#666",
    marginTop: 4,
  },

  right: {
    alignItems: "flex-end",
  },

  percent: {
    fontWeight: "700",
    fontSize: 16,
  },

  expandSection: {
    marginTop: 15,
    alignItems: "center",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },

  stat: {
    fontWeight: "600",
  },

  statusBox: {
    marginTop: 12,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },

  statusText: {
    fontWeight: "600",
  },
});