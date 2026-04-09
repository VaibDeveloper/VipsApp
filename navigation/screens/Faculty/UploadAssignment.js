import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const UploadAssignment = () => {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [file, setFile] = useState(null);

  // 📅 Date Picker
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDueDate(selectedDate);
  };

  // 📎 File Picker
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (result.type === "success") {
        setFile(result);
      }
    } catch (error) {
      Alert.alert("Error picking file");
    }
  };

  const handleUpload = () => {
    if (!title || !subject || !dueDate) {
      Alert.alert("Error", "Please fill all required fields");
      return;
    }

    Alert.alert("Success", "Assignment Uploaded Successfully");
  };

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Upload Assignment</Text>
          <Text style={styles.subtitle}>
            Create and assign work to students
          </Text>
        </View>

        <View style={styles.card}>

          {/* Title */}
          <Text style={styles.label}>Assignment Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Subject */}
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Data Structures"
            value={subject}
            onChangeText={setSubject}
          />

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder="Enter details..."
            multiline
            value={description}
            onChangeText={setDescription}
          />

          {/* Date Picker */}
          <Text style={styles.label}>Due Date</Text>
          <TouchableOpacity
            style={styles.datePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar" size={20} color="#E53935" />
            <Text style={styles.dateText}>
              {dueDate
                ? dueDate.toDateString()
                : "Select Due Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate || new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onDateChange}
            />
          )}

          {/* File Picker */}
          <Text style={styles.label}>Attachment</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
            <Ionicons name="cloud-upload" size={30} color="#E53935" />
            <Text style={styles.uploadText}>
              {file ? file.name : "Upload File"}
            </Text>
          </TouchableOpacity>

          {/* Upload Button */}
          <TouchableOpacity style={styles.button} onPress={handleUpload}>
            <Text style={styles.buttonText}>Upload Assignment</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
};

export default UploadAssignment;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },

  container: {
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
    marginTop: 4,
    color: "#666",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: "#fafafa",
  },

  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#fafafa",
  },

  dateText: {
    marginLeft: 10,
    color: "#555",
  },

  uploadBox: {
    height: 100,
    borderWidth: 2,
    borderColor: "#E53935",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
  },

  uploadText: {
    marginTop: 6,
    color: "#E53935",
    fontWeight: "600",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#E53935",
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});