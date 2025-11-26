// navigation/screens/SignUpScreen.js
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [collegeEmail, setCollegeEmail] = useState("");
  const [semester, setSemester] = useState("1");

  // pattern: course_enrollmentnumber_name@vipstc.edu.in
  const emailRegex = /^[a-zA-Z]+_[0-9]+_[a-zA-Z]+@vipstc\.edu\.in$/;

  const onSignUpPress = () => {
    // basic validations
    if (!fullName.trim()) {
      Alert.alert("Validation", "Please enter full name");
      return;
    }
    if (!/^[0-9]{10}$/.test(mobile)) {
      Alert.alert("Validation", "Please enter a valid 10-digit mobile number");
      return;
    }
    if (!collegeEmail.trim()) {
      Alert.alert("Validation", "Please enter college email");
      return;
    }
    if (!emailRegex.test(collegeEmail.toLowerCase())) {
      Alert.alert(
        "Invalid Email",
        'College Email must be in the format "course_enrollmentnumber_name@vipstc.edu.in'
      );
      return;
    }

    // TODO: Save user to users.json or call backend
    Alert.alert("Success", "Account created successfully", [
      {
        text: "OK",
        onPress: () =>
          navigation.navigate("OtpVerification", { email: collegeEmail })
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 80}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.top}>
            <Image
              source={require("../../assets/vips-logo1.webp")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.form}>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#999"
              value={fullName}
              onChangeText={setFullName}
              style={styles.input}
            />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
              style={[styles.input, { marginTop: 12 }]}
              maxLength={10}
            />
            <TextInput
              placeholder="College Email Id"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
              value={collegeEmail}
              onChangeText={setCollegeEmail}
              style={[styles.input, { marginTop: 12 }]}
            />
            <View style={[styles.pickerWrapper, { marginTop: 12 }]}>
              <Picker
                selectedValue={semester}
                onValueChange={(val) => setSemester(val)}
                style={styles.picker}
                itemStyle={{ fontSize: 16 }}
              >
                <Picker.Item label="Semester 1" value="1" />
                <Picker.Item label="Semester 2" value="2" />
                <Picker.Item label="Semester 3" value="3" />
                <Picker.Item label="Semester 4" value="4" />
                <Picker.Item label="Semester 5" value="5" />
                <Picker.Item label="Semester 6" value="6" />
              </Picker>
            </View>

            <TouchableOpacity style={styles.signUpBtn} onPress={onSignUpPress}>
              <Text style={styles.signUpBtnText}>Create Account</Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

  // scrollContent handles children layout for ScrollView
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center", // centers logo above inputs
  },

  top: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 8,
  },

  logo: {
    width: 160,
    height: 80,
  },

  form: {
    width: "100%",
    alignItems: "center",
    paddingTop: 6,
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
  },

  pickerWrapper: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E53935",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  picker: {
    width: "100%",
    height: 48,
  },

  signUpBtn: {
    marginTop: 18,
    width: "100%",
    height: 48,
    backgroundColor: "#E53935",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  signUpBtnText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
