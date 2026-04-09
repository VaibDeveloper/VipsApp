import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";   // 👁️ Added

const LoginScreen = ({ navigation }) => {
  const [collegeMail, setCollegeMail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const onLoginPress = async () => {
  try {
    const response = await fetch("http://192.168.1.41:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: collegeMail,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      const user = data.user;

      // ✅ ALWAYS go to HomeTabs
      navigation.replace("HomeTabs", { user });

    } else {
      alert(data.message || "Invalid credentials");
    }

  } catch (error) {
    console.log("LOGIN ERROR:", error);
    alert("Server not reachable");
  }
};

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.top}>
            <Image
              source={require("../../assets/vips-logo1.webp")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.form}>

            {/* Email Input */}
            <TextInput
              placeholder="College Mail"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={collegeMail}
              onChangeText={setCollegeMail}
              style={styles.input}
              textContentType="emailAddress"
            />

            {/* Password with Eye Icon */}
            <View style={styles.passwordWrapper}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                textContentType="password"
              />

              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>
            </View>

            {/* Links */}
            <View style={styles.smallLinksRow}>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.smallLinkText}>Sign Up</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("SetPassword")}>
                <Text style={styles.smallLinkText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginBtn} onPress={onLoginPress}>
              <Text style={styles.loginBtnText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  top: {
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },

  logo: { width: "60%", height: 120 },

  form: {
    width: "87%",
    alignItems: "center",
    paddingTop: 20,
  },

  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#fff",
    marginBottom: 10,
  },

  passwordWrapper: {
    width: "100%",
    position: "relative",
    marginTop: 14,
  },

  eyeIcon: {
    position: "absolute",
    right: 12,
    top: 12,
    padding: 4,
  },

  smallLinksRow: {
    width: "100%",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },

  smallLinkText: {
    color: "#E53935",
    fontSize: 14,
  },

  loginBtn: {
    marginTop: 20,
    width: "100%",
    height: 48,
    backgroundColor: "#E53935",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
