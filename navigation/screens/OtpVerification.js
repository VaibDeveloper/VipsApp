// navigation/screens/OtpVerification.js

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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OtpVerification = ({ route, navigation }) => {
  const { email } = route.params || {};

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next box automatically
      if (index < 3) inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
  if (nativeEvent.key === "Backspace") {
    const newOtp = [...otp];

    if (otp[index] === "") {
      // Move back if current box is already empty
      if (index > 0) {
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs[index - 1].current.focus();
      }
    } else {
      // Clear current box
      newOtp[index] = "";
      setOtp(newOtp);
    }
  }
};

  const onSubmit = () => {
    const code = otp.join("");

    if (code.length < 4) {
      alert("Please enter 4-digit OTP");
      return;
    }

    // Validate OTP here
    alert("OTP Verified Successfully!");
    navigation.navigate("SetPassword", { email });

  };

  const onResend = () => {
    if (timer === 0) {
      setTimer(30);
      alert("OTP Resent!");
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
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Verify OTP</Text>

          <Text style={styles.subText}>OTP has been sent to:</Text>

          <Text style={styles.email}>{email}</Text>

          {/* OTP Boxes */}
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
                editable={true}
                selectTextOnFocus={true}
                autoCorrect={false}
                autoCapitalize="none"
                importantForAutofill="no"
                textContentType="oneTimeCode"
                inputMode="numeric"
              />
            ))}
          </View>

          {/* Submit */}
          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>

          {/* Resend OTP */}
          <TouchableOpacity
            onPress={timer === 0 ? onResend : null}
            style={{ marginTop: 16 }}
          >
            <Text
              style={[
                styles.resendText,
                { color: timer === 0 ? "#E53935" : "#999" },
              ]}
            >
              {timer === 0 ? "Resend OTP" : `Resend OTP in ${timer}s`}
            </Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

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
    color: "#555",
  },

  email: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E53935",
    marginTop: 4,
    marginBottom: 20,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },

  otpBox: {
    width: 55,
    height: 55,
    borderColor: "#E53935",
    borderWidth: 1.5,
    marginHorizontal: 8,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    backgroundColor: "#fff",
  },

  btn: {
    width: "100%",
    height: 48,
    backgroundColor: "#E53935",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  resendText: {
    fontSize: 15,
    fontWeight: "500",
  },
});
