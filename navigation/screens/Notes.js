import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

const Notes = () => {
  const notesData = [
    { subject: "Software Engineering", faculty: "Faculty Name" },
    { subject: "Java", faculty: "Faculty Name" },
    { subject: "Artificial Intelligence", faculty: "Faculty Name" },
    { subject: "C++", faculty: "Faculty Name" },
    { subject: "Discrete Mathematics", faculty: "Faculty Name" },
    { subject: "HTML", faculty: "Faculty Name" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.content}>
          <Text style={styles.heading}>Notes</Text>

          {notesData.map((item, index) => (
            <TouchableOpacity key={index} style={styles.noteCard}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.faculty}>{item.faculty}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // ⭐ THIS handles child layout for ScrollView (required)
  scrollContent: {
    paddingBottom: 20,
  },

  content: {
    padding: 16,
  },

  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  noteCard: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  subject: {
    fontSize: 18,
    fontWeight: "600",
  },

  faculty: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
});
