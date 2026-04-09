import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import FacultyDashboard from "./screens/Faculty/FacultyDashboard";
import UploadAssignment from "./screens/Faculty/UploadAssignment";
import Analytics from "./screens/Faculty/Analytics"; // NEW SCREEN

const Tab = createBottomTabNavigator();

const FacultyNavigator = ({ user }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // ✅ REMOVE HEADERS

        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Upload") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#E53935",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard">
        {(props) => <FacultyDashboard {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen name="Upload">
        {(props) => <UploadAssignment {...props} user={user} />}
      </Tab.Screen>

      <Tab.Screen name="Analytics">
        {(props) => <Analytics {...props} user={user} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default FacultyNavigator;
