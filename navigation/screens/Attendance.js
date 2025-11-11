import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from "react-native-svg-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { G, Text as SVGText } from "react-native-svg";

const attendanceData = [
  { subject: "Subject", faculty: "Faculty Name", percentage: 85, color: "#f28b82" },
  { subject: "Subject", faculty: "Faculty Name", percentage: 60, color: "#aecbfa" },
  { subject: "Subject", faculty: "Faculty Name", percentage: 95, color: "#fff475" },
  { subject: "Subject", faculty: "Faculty Name", percentage: 78, color: "#ccff90" },
];


const Attendance = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>
          <Ionicons name="pie-chart-outline" size={24} /> Attendance
        </Text>
        {attendanceData.map((item, index) => {
          const pieData = [
            {
              key: 1,
              value: item.percentage,
              svg: { fill: item.color },
            },
            {
              key: 2,
              value: 100 - item.percentage,
              svg: { fill: "#e0e0e0" },
            },
          ];

          return (
            <View key={index} style={styles.card}>
              <View style={styles.chartContainer}>
                <PieChart
                  style={{ height: 160, width: 160 }}
                  data={pieData}
                  outerRadius="100%"
                >
                  <Labels percentage={item.percentage} />
                </PieChart>
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
    </SafeAreaView>
  );
};

const Labels = ({ percentage }) => (
  <G>
    <SVGText
      x="37%"
      y="40%"
      alignmentBaseline="middle"
      textAnchor="middle"
      fontSize={20}
      fontWeight="bold"
      fill="#333"
    >
      {`${percentage}%`}
    </SVGText>
  </G>
);

export default Attendance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 32,
    paddingTop: 0,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    width: "100%",
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
    fontWeight: "bold",
    fontSize: 16,
  },
  facultyText: {
    marginLeft: 8,
    fontSize: 15,
    color: "#555",
  },
});
