import React from "react";
import BottomNavigator from "./BottomNavigator"; // Student UI
import FacultyNavigator from "./FacultyNavigator";

const RoleNavigator = ({ route }) => {
  const { user } = route.params;

  // Safety check
  if (!user) {
    return <BottomNavigator />;
  }

  if (user.role === "faculty") {
    return <FacultyNavigator user={user} />;
  }

  return <BottomNavigator user={user} />;
};

export default RoleNavigator;