import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./BottomNavigator";
import Header from "../component/Header";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import OtpVerification from "./screens/OtpVerification";
import SetPasswordScreen from "./screens/SetPasswordScreen";
import Profile from "./screens/Profile.js";
import RoleNavigator from "./RoleNavigator";
import FacultyProfile from "./screens/Faculty/FacultyProfile";
import TimetableScreen from "./screens/TimetableScreen";
import NotificationsScreen from "./screens/NotificationsScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => (
            <Header {...props} user={props.route?.params?.user} />
          ),
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Timetable"
          component={TimetableScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OtpVerification"
          component={OtpVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FacultyProfile"
          component={FacultyProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SetPassword"
          component={SetPasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="HomeTabs"
          component={RoleNavigator}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
