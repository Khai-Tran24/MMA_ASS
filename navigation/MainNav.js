import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainBottomTab from "../components/MainBottomTab";
import Detail from "../screens/detail/Detail";

const Stack = createNativeStackNavigator();

export default function MainNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#F3EDF7",
        },
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarActiveTintColor: "#6750A4",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopColor: "#6750A4",
          borderTopWidth: 1,
        },
      }}
    >
      <Stack.Screen
        name="Tab"
        options={{ headerShown: false }}
        component={MainBottomTab}
      />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
