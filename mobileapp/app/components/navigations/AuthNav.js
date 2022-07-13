import React ,{Component} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ChatScreenList from "../screens/ChatScreenList";
import { ChatNav } from "./ChatNav";
import { CalendarNav } from "./CalendarNav";
import Clients from "../screens/Clients";
import Works from "../screens/Works";
// import { newMessage } from "../actions/chat";
import Calendar from "../screens/Calendar";

const Tab = createBottomTabNavigator();

export const AuthNav = (pop) => {
    // console.log(pop)
    return (
      <Tab.Navigator>
        <Tab.Screen name="Serwis" component={HomeScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Czat" component={ChatNav} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Kalendarz" component={Calendar} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="calendar-month" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Klienci" component={Clients} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-hard-hat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen name="Naprawy" component={Works} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wrench" color={color} size={size} />
          ),
        }}
      />
      </Tab.Navigator>
  );
};



