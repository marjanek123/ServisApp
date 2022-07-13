import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../screens/LoginScreen";
// import ChatScreenList from "../screens/ChatScreenList";
// import { createStackNavigator } from "@react-navigation/stack";
import Calendar from "../screens/Calendar";
const Stack = createNativeStackNavigator();
import Example from "../screens/example";
import Example2 from "../screens/Example2";

const screenOptionStyle = {
    headerStyle: {
      backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back",
  };
  
export const CalendarNav = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>


        <Stack.Screen name="Kalendarz" component={Calendar} />
        {/* <Stack.Screen name="Wiad" component={ChatScreenMessages} /> */}
    </Stack.Navigator>
  );
};
