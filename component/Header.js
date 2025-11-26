import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import logo from "../assets/vips-logo.png";

const Header = ({navigation}) => {
  const [profileColor, setProfileColor] = useState("#000");
  const [bellColor, setBellColor] = useState("#000");

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            setBellColor(bellColor === "#000" ? "red" : "#000");
            //onBellPress();
          }}
        >
          <Ionicons
            name={
              bellColor === "red" ? "notifications" : "notifications-outline"
            }
            size={30}
            color={bellColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile");
            //onProfilePress();
          }}
        >
          <Ionicons
            name="person-circle-outline"
            size={35}
            color={profileColor}
            style={{ marginLeft: 10}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    elevation: 8, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    fontColor: "black",
  },
  logo: {
    width: 180,
    height: 50,
    resizeMode: "contain",
    transform: [{ translateY: 8 }],
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
