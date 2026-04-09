import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const attendanceData = [
  { subject: "Java", faculty: "Dr. Swati Jain", percentage: 85, color: "#f28b82" },
  { subject: "Digital Marketing", faculty: "Dr. Pawan Whig", percentage: 60, color: "#aecbfa" },
  { subject: "Software Engineering", faculty: "Dr. Pooja Thakar", percentage: 95, color: "#fff475" },
  { subject: "DSA", faculty: "Dr. Pooja Saigal", percentage: 78, color: "#ccff90" },
];

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
  propsForLabels: { fontSize: 12 },
};

const Attendance = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollContainer, styles.scrollContent]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headingRow}>
          <Ionicons name="pie-chart-outline" size={24} />
          <Text style={styles.headingText}>Attendance</Text>
        </View>

        {attendanceData.map((item, index) => {
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

          const chartWidth = 300;
          const chartHeight = 180;

          return (
            <View key={index} style={styles.card}>
              <View style={styles.chartContainer}>
                <PieChart
                  data={pieData}
                  width={chartWidth}
                  height={chartHeight}
                  chartConfig={chartConfig}
                  accessor="attendance"
                  backgroundColor="transparent"
                  paddingLeft="70"
                  hasLegend={false}
                />

                <View style={styles.centerLabel}>
                  <Text style={styles.centerLabelText}>{`${item.percentage}%`}</Text>
                </View>
              </View>

              <View style={styles.textContainer}>
                <View style={styles.row}>
                  <Ionicons name="book-outline" size={18} />
                  <Text style={styles.subjectText}>{item.subject}</Text>
                </View>

                <View style={styles.row}>
                  <Ionicons name="person-outline" size={18} />
                  <Text style={styles.facultyText}>{item.faculty}</Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },

  scrollContent: {
    alignItems: "center",
    justifyContent: "flex-start",
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    alignSelf: "flex-start",
    paddingHorizontal: 4,
  },

  headingText: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
  },

  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    width: "100%",
    maxWidth: 640,
  },

  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: 200,
    height: 200,
    //alignSelf: "center",
  },

  centerLabel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  centerLabelText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  textContainer: {
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  subjectText: {
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 16,
  },

  facultyText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#555",
  },
});
