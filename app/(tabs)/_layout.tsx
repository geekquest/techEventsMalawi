import useThemeMode from "@/hooks/useThemeMode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { EventRegister } from "react-native-event-listeners";

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
          headerShown: false,
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
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
