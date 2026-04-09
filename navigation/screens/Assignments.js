import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const VIPS_RED = "#E53935";

// 🔥 Sample Assignments
const sampleAssignments = [
  {
    id: "1",
    subject: "Java",
    title: "OOP Concepts Assignment",
    dueDate: "2025-11-25",
    submitted: false,
  },
  {
    id: "2",
    subject: "DS",
    title: "Linked List Questions",
    dueDate: "2025-11-20",
    submitted: true,
  },
];

// 🔧 Check status
const getStatus = (item) => {
  const today = new Date();
  const due = new Date(item.dueDate);

  if (item.submitted) return "submitted";
  if (due < today) return "late";
  return "pending";
};

const Assignments = () => {
  const [assignments, setAssignments] = useState(sampleAssignments);
  const [selected, setSelected] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState(null);

  // 📎 File Picker
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setFile(result);
    }
  };

  // 📤 Submit Assignment
  const submitAssignment = () => {
    if (!file) {
      Alert.alert("Upload Required", "Please upload file first");
      return;
    }

    setAssignments((prev) =>
      prev.map((a) =>
        a.id === selected.id ? { ...a, submitted: true } : a
      )
    );

    setModalVisible(false);
    setFile(null);
    Alert.alert("Success", "Assignment Submitted");
  };

  // 🎯 Card UI
  const renderItem = ({ item }) => {
    const status = getStatus(item);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setSelected(item);
          setModalVisible(true);
        }}
      >
        <View style={styles.topRow}>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text style={[styles.status, styles[status]]}>
            {status.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.bottomRow}>
          <Ionicons name="calendar" size={16} color="#777" />
          <Text style={styles.due}>Due: {item.dueDate}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.safe}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assignments</Text>
        <Text style={styles.sub}>Submit your work</Text>
      </View>

      {/* List */}
      <FlatList
        data={assignments}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
      />

      {/* 🔥 MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>{selected?.title}</Text>
            <Text style={styles.modalSub}>{selected?.subject}</Text>

            <Text style={styles.modalDue}>
              Due: {selected?.dueDate}
            </Text>

            {/* Upload */}
            <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
              <Ionicons name="cloud-upload" size={28} color={VIPS_RED} />
              <Text style={styles.uploadText}>
                {file ? file.name : "Upload File"}
              </Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitBtn}
              onPress={submitAssignment}
            >
              <Text style={styles.submitText}>
                {selected?.submitted ? "Resubmit" : "Turn In"}
              </Text>
            </TouchableOpacity>

            {/* Close */}
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Close
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Assignments;

// 🎨 STYLES
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  sub: {
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    borderRadius: 12,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subject: {
    color: VIPS_RED,
    fontWeight: "700",
  },

  status: {
    fontWeight: "700",
  },

  pending: { color: "#FFA000" },
  late: { color: "#E53935" },
  submitted: { color: "#4CAF50" },

  title: {
    marginTop: 6,
    fontWeight: "600",
    fontSize: 15,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  due: {
    marginLeft: 6,
    color: "#777",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  modalSub: {
    color: "#666",
    marginTop: 4,
  },

  modalDue: {
    marginTop: 8,
    fontWeight: "600",
  },

  uploadBox: {
    marginTop: 20,
    height: 100,
    borderWidth: 2,
    borderColor: VIPS_RED,
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  uploadText: {
    marginTop: 6,
    color: VIPS_RED,
  },

  submitBtn: {
    marginTop: 20,
    backgroundColor: VIPS_RED,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});