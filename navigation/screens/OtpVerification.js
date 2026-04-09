import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API = "http://192.168.1.41:4000/api/auth";

const OtpVerification = ({ route, navigation }) => {
  const { email } = route.params || {};

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  ////////////////////////////////////////////////////////////
  // ⏱️ TIMER
  ////////////////////////////////////////////////////////////
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  ////////////////////////////////////////////////////////////
  // 🔢 INPUT HANDLING
  ////////////////////////////////////////////////////////////
  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 3) inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    const newOtp = [...otp];

    if (nativeEvent.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current.focus();
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  ////////////////////////////////////////////////////////////
  // 🔥 VERIFY OTP
  ////////////////////////////////////////////////////////////
  const onSubmit = async () => {
    const code = otp.join("");

    if (code.length !== 4) {
      Alert.alert("Error", "Enter 4-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP VERIFIED SUCCESS");

        navigation.reset({
          index: 0,
          routes: [
            {
              name: "SetPassword",
              params: { email },
            },
          ],
        });
      } else {
        Alert.alert("Error", data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("OTP ERROR:", error);
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////
  // 🔁 RESEND OTP (🔥 FIX ADDED)
  ////////////////////////////////////////////////////////////
  const onResend = async () => {
    if (timer !== 0) return;

    try {
      setLoading(true);

      const response = await fetch(`${API}/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert("Success", "OTP Resent 📩");
        setTimer(30);
      } else {
        Alert.alert("Error", "Failed to resend OTP");
      }
    } catch (error) {
      console.log("RESEND ERROR:", error);
      Alert.alert("Error", "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  ////////////////////////////////////////////////////////////
  // UI
  ////////////////////////////////////////////////////////////
  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Verify OTP</Text>
          <Text style={styles.subText}>OTP sent to</Text>
          <Text style={styles.email}>{email}</Text>

          {/* OTP BOXES */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpBox}
              />
            ))}
          </View>

          {/* VERIFY BUTTON */}
          <TouchableOpacity
            style={styles.btn}
            onPress={onSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.btnText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          {/* RESEND */}
          <TouchableOpacity onPress={onResend} style={{ marginTop: 16 }}>
            <Text style={{ color: timer === 0 ? "#E53935" : "#999" }}>
              {timer === 0 ? "Resend OTP" : `Resend in ${timer}s`}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f6f7fb" },

  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  title: { fontSize: 26, fontWeight: "bold" },
  subText: { color: "#666", marginTop: 10 },
  email: { color: "#E53935", fontWeight: "600", marginTop: 4 },

  otpRow: {
    flexDirection: "row",
    marginVertical: 20,
  },

  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#E53935",
    marginHorizontal: 6,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#fff",
  },

  btn: {
    width: "100%",
    backgroundColor: "#E53935",
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