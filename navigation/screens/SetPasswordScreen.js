import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const SetPasswordScreen = ({ route, navigation }) => {
  const { email } = route.params || {};

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onSubmit = () => {
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    alert("Password Set Successfully!");
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <Text style={styles.title}>Set Password</Text>

          <Text style={styles.subText}>For: {email}</Text>

          {/* New Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="New Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPass(!showPass)}
            >
              <Ionicons
                name={showPass ? "eye-off" : "eye"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirm}
              value={confirm}
              onChangeText={setConfirm}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowConfirm(!showConfirm)}
            >
              <Ionicons
                name={showConfirm ? "eye-off" : "eye"}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SetPasswordScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },

  scroll: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },

  subText: {
    fontSize: 15,
    color: "#777",
    marginBottom: 30,
  },

  inputWrapper: {
    width: "100%",
    position: "relative",
    marginBottom: 16,
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1.5,
    borderColor: "#E53935",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  eyeBtn: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  btn: {
    width: "100%",
    height: 48,
    backgroundColor: "#E53935",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
