import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigator from "./BottomNavigator";
import Header from "../component/Header";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="HomeTabs"
          component={BottomNavigator}
          options={{
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
