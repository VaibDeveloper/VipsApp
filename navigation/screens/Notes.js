import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Notes = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const notesData = [
    {
      subject: "Software Engineering",
      faculty: "Dr. Pooja Thakur",
      files: [
        { name: "Unit 1 Notes.pdf", type: "pdf" },
        { name: "SDLC.ppt", type: "ppt" },
      ],
    },
    {
      subject: "Java",
      faculty: "Dr. Swati Jain",
      files: [
        { name: "OOP Concepts.pdf", type: "pdf" },
        { name: "Exception Handling.doc", type: "doc" },
      ],
    },
    {
      subject: "Artificial Intelligence",
      faculty: "Dr. Pawan Whig",
      files: [
        { name: "Search Algorithms.pdf", type: "pdf" },
      ],
    },
  ];

  const toggleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  // 📄 File Icon Helper
  const getIcon = (type) => {
    if (type === "pdf") return "document-text";
    if (type === "ppt") return "easel";
    if (type === "doc") return "document";
    return "document-outline";
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Study Material</Text>
          <Text style={styles.subtitle}>Access your notes</Text>
        </View>

        {/* Subjects */}
        {notesData.map((item, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <View key={index} style={styles.card}>

              {/* 🔹 Subject Row */}
              <TouchableOpacity
                style={styles.row}
                onPress={() => toggleExpand(index)}
              >
                <View>
                  <Text style={styles.subject}>{item.subject}</Text>
                  <Text style={styles.faculty}>{item.faculty}</Text>
                </View>

                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>

              {/* 🔥 Expanded Files */}
              {isExpanded && (
                <View style={styles.filesContainer}>
                  {item.files.map((file, i) => (
                    <View key={i} style={styles.fileRow}>

                      <View style={styles.fileLeft}>
                        <Ionicons
                          name={getIcon(file.type)}
                          size={22}
                          color="#E53935"
                        />
                        <Text style={styles.fileName}>{file.name}</Text>
                      </View>

                      <TouchableOpacity>
                        <Ionicons
                          name="download"
                          size={20}
                          color="#333"
                        />
                      </TouchableOpacity>

                    </View>
                  ))}
                </View>
              )}

            </View>
          );
        })}

      </ScrollView>
    </View>
  );
};

export default Notes;

// 🎨 STYLES
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  content: {
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
    color: "#666",
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
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

  filesContainer: {
    marginTop: 12,
  },

  fileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  fileLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  fileName: {
    marginLeft: 10,
    fontWeight: "600",
  },
});