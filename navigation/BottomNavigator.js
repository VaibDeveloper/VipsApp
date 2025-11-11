import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Assignments from "./screens/Assignments";
import Attendance from "./screens/Attendance";
import Notes from "./screens/Notes";

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Assignments") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Attendance") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Notes") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Bottom.Screen name="Home" component={Home} />
      <Bottom.Screen name="Assignments" component={Assignments} />
      <Bottom.Screen name="Attendance" component={Attendance} />
      <Bottom.Screen name="Notes" component={Notes} />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
