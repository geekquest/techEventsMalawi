import React, { useEffect, useState } from "react";
import { Text, BackHandler, Alert } from "react-native";
import { Tabs, useFocusEffect } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ticket from "react-native-vector-icons/Fontisto";
import { EventRegister } from "react-native-event-listeners";
import useThemeMode from "@/hooks/useThemeMode";

const TabsLayout = () => {
  const uiState = useThemeMode();
  const [tabColor, setTabColor] = useState("white");

  useEffect(() => {
    const updateTabColor = (themeMode: "light" | "dark") => {
      setTabColor(themeMode === "dark" ? "white" : "black");
    };

    updateTabColor(uiState);

    const listener = EventRegister.addEventListener(
      "theme-changed",
      (themeMode: "light" | "dark") => {
        updateTabColor(themeMode);
      }
    );

    return () => {
      if (typeof listener === "string") {
        EventRegister.removeEventListener(listener);
      }
    };
  }, [uiState]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: tabColor,
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              color={
                focused ? (uiState === "dark" ? "black" : "white") : "grey"
              }
              size={focused ? 25 : 20}
            />
          ),
          headerShown: false,
        }}
        name="home/index"
      />
      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Ticket
              name="ticket"
              color={
                focused ? (uiState === "dark" ? "black" : "white") : "grey"
              }
              size={focused ? 25 : 20}
            />
          ),
          headerTitle: () => (
            <Text className="text-secondary-0 font-medium">Tickets</Text>
          ),
          headerStyle: {
            height: 70,
          },
        }}
        name="tickets/index"
      />
      <Tabs.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="settings"
              color={
                focused ? (uiState === "dark" ? "black" : "white") : "grey"
              }
              size={focused ? 25 : 20}
            />
          ),
          headerTitle: () => (
            <Text className="text-secondary-0 font-medium">Settings</Text>
          ),
          headerStyle: {
            height: 70,
          },
        }}
        name="settings/index"
      />
    </Tabs>
  );
};

export default TabsLayout;
