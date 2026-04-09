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
import { SafeAreaView } from 'react-native-safe-area-context'

const { width } = Dimensions.get("window");

const sampleAttendance = [
  { id: "1", subject: "Data Structures", percentage: 85, color: "#f28b82" },
  { id: "2", subject: "Java", percentage: 72, color: "#aecbfa" },
  { id: "3", subject: "Web Tech", percentage: 95, color: "#ccff90" },
];

const sampleAssignments = [
  {
    id: "a1",
    subject: "Java Programming",
    title: "OOP Concepts Assignment",
    dueDate: "Nov 25",
  },
  {
    id: "a2",
    subject: "Data Structures",
    title: "Linked List Questions",
    dueDate: "Nov 28",
  },
  {
    id: "a3",
    subject: "AI",
    title: "Search Algorithms Worksheet",
    dueDate: "Dec 1",
  },
];

const sampleEvents = [
  { id: "e1", title: "Coding Hackathon", date: "Dec 2", place: "Auditorium" },
  { id: "e2", title: "Cultural Fest", date: "Dec 10", place: "Grounds" },
];

const sampleNotes = [
  { id: "note1", subject: "Java - OOP Concepts", uploadedBy: "Prof. Sharma" },
  { id: "note2", subject: "DS - Sorting Algorithms", uploadedBy: "Prof. Gupta" },
];

const QuickAction = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={styles.quickIconWrapper}>
      <Ionicons name={icon} size={22} color="#E53935" />
    </View>
    <Text style={styles.quickLabel}>{label}</Text>
  </TouchableOpacity>
);

const AttendanceCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.attCard} onPress={onPress}>
    <View style={styles.attTopRow}>
      <Text style={styles.attSubject}>{item.subject}</Text>
      <Text style={styles.attPercent}>{item.percentage}%</Text>
    </View>

    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${item.percentage}%`, backgroundColor: item.color }]} />
    </View>
  </TouchableOpacity>
);

const AssignmentCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.assignCard} onPress={onPress} activeOpacity={0.9}>
    <Text style={styles.assignSubject}>{item.subject}</Text>

    <Text style={styles.assignTitle} numberOfLines={2}>
      {item.title}
    </Text>

    <View style={styles.assignDueRow}>
      <Ionicons name="time-outline" size={16} color="#E53935" />
      <Text style={styles.assignDue}>Due: {item.dueDate}</Text>
    </View>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // fetch data or refresh state here
    setTimeout(() => {
      setRefreshing(false);
    }, 900);
  }, []);

  const renderAttendance = ({ item }) => (
    <AttendanceCard item={item} onPress={() => navigation.navigate("Attendance", { subjectId: item.id })} />
  );

  const renderNote = ({ item }) => (
    <TouchableOpacity
      style={styles.noteCard}
      onPress={() => navigation.navigate("Notes", { noteId: item.id })}
    >
      <Text style={styles.noteSubject}>{item.subject}</Text>
      <Text style={styles.noteBy}>by {item.uploadedBy}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#E53935" />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greet}>Hello,</Text>
            <Text style={styles.username}>Bhawna</Text>
          </View>

          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image source={require("../../assets/avatar.png")} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        {/* Attendance Row */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Attendance</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Attendance")}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={sampleAttendance}
            horizontal
            keyExtractor={(i) => i.id}
            renderItem={renderAttendance}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          />
        </View>

        {/* Assignments Due */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Assignments Due</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Assignments")}>
              <Text style={styles.viewAll}>All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 8 }}
          >
            {sampleAssignments.map((a) => (
              <AssignmentCard key={a.id} item={a} onPress={() => navigation.navigate("Assignments", { id: a.id })} />
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickGrid}>
            <QuickAction icon="folder-open-outline" label="Study Material" onPress={() => navigation.navigate("Notes")} />
            <QuickAction icon="document-text-outline" label="Attendance" onPress={() => navigation.navigate("Attendance")} />
            <QuickAction icon="book-outline" label="Notes" onPress={() => navigation.navigate("Notes")} />
            <QuickAction icon="calendar-outline" label="Timetable" onPress={() => navigation.navigate("Timetable")} />
          </View>
        </View>

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Events")}>
              <Text style={styles.viewAll}>All</Text>
            </TouchableOpacity>
          </View>

          {sampleEvents.map((ev) => (
            <View key={ev.id} style={styles.eventRow}>
              <View style={styles.eventDate}>
                <Text style={styles.eventDateText}>{ev.date.split(" ")[0]}</Text>
              </View>
              <View style={styles.eventBody}>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventPlace}>{ev.place}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recent Notes */}
        <View style={[styles.section, { marginBottom: 40 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Notes</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
              <Text style={styles.viewAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={sampleNotes}
            keyExtractor={(i) => i.id}
            renderItem={renderNote}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  greet: {
    color: "#666",
    fontSize: 14,
  },

  username: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },

  avatarWrapper: {
    width: 54,
    height: 54,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },

  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  section: {
    marginBottom: 18,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  viewAll: {
    color: "#E53935",
    fontSize: 14,
    fontWeight: "600",
  },

  attCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    width: Math.min(300, width * 0.7),
    marginRight: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  attTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  attSubject: {
    fontSize: 16,
    fontWeight: "700",
  },

  attPercent: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
  },

  progressBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 8,
  },

  assignCard: {
    width: Math.min(300, width * 0.75),
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    marginVertical: 8,
  },

  assignSubject: {
    fontSize: 13,
    fontWeight: "700",
    color: "#E53935",
    marginBottom: 4,
  },

  assignTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },

  assignDueRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  assignDue: {
    marginLeft: 6,
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },

  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    justifyContent: "space-between",
  },

  quickAction: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
  },

  quickIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  quickLabel: {
    fontSize: 14,
    fontWeight: "600",
  },

  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    //marginBottom: 10,
    elevation: 2,
  },

  eventDate: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: "#fff6f6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#fdecea",
  },

  eventDateText: {
    fontSize: 13,
    color: "#E53935",
    fontWeight: "700",
  },

  eventBody: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },

  eventPlace: {
    fontSize: 13,
    color: "#777",
  },

  noteCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },

  noteSubject: {
    fontSize: 15,
    fontWeight: "700",
  },

  noteBy: {
    fontSize: 13,
    color: "#777",
    marginTop: 6,
  },
});
