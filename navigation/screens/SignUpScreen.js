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
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

const PRIMARY = "#E53935";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [password, setPassword] = useState("");
  const [semester, setSemester] = useState("1");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z]+_[0-9]+_[a-zA-Z]+@vipstc\.edu\.in$/;

  const onSignUpPress = async () => {
    // ✅ VALIDATION
    if (!fullName.trim()) return Alert.alert("Validation", "Enter full name");
    if (!/^[0-9]{10}$/.test(mobile)) return Alert.alert("Validation", "Enter valid mobile");
    if (!emailRegex.test(collegeEmail.toLowerCase()))
      return Alert.alert("Invalid Email", "Enter valid VIPS email format");

    try {
      setLoading(true);

      const response = await fetch("http://192.168.1.41:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email: collegeEmail,
          password,
          phone: mobile,
          username: fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created 🎉", [
          {
            text: "Verify OTP",
            onPress: () =>
              navigation.navigate("OtpVerification", { email: collegeEmail }),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Signup failed");
      }

    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>

          {/* 🔥 LOGO */}
          <Image
            source={require("../../assets/vips-logo1.webp")}
            style={styles.logo}
          />

          {/* 🔥 TITLE */}
          <Text style={styles.title}>Create Account</Text>

          {/* 🔥 INPUTS */}
          <TextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />

          <TextInput
            placeholder="Mobile Number"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            style={styles.input}
            maxLength={10}
          />

          <TextInput
            placeholder="College Email"
            value={collegeEmail}
            onChangeText={setCollegeEmail}
            style={styles.input}
            autoCapitalize="none"
          />

          {/* 🔥 SEMESTER */}
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={semester} onValueChange={setSemester}>
              <Picker.Item label="Semester 1" value="1" />
              <Picker.Item label="Semester 2" value="2" />
              <Picker.Item label="Semester 3" value="3" />
              <Picker.Item label="Semester 4" value="4" />
              <Picker.Item label="Semester 5" value="5" />
              <Picker.Item label="Semester 6" value="6" />
            </Picker>
          </View>

          {/* 🔥 BUTTON */}
          <TouchableOpacity style={styles.btn} onPress={onSignUpPress} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Create Account</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },

  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },

  logo: {
    width: 150,
    height: 125,
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
  },

  btn: {
    backgroundColor: PRIMARY,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});