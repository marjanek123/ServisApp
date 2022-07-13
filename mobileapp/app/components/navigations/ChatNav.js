import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "../screens/LoginScreen";
import ChatScreenList from "../screens/ChatScreenList";
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreenMessages from "../screens/ChatScreenMessages";
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
  
export const ChatNav = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Użytkownicy:" component={ChatScreenList} />
        <Stack.Screen name="Wiadomości" component={ChatScreenMessages} />
    </Stack.Navigator>
  );
};
