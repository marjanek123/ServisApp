import React,{Component} from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
// import IsLoading from "../common/IsLoading";
import { Text } from "react-native";
import { connect } from "react-redux";
const Stack = createNativeStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};


export const NoAuthNav = () => {
    return(
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    )
}


