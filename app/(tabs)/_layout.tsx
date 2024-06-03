import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { EventRegister } from "react-native-event-listeners";

const TabsLayout = () => {
  const [uiState, setUiState] = useState<"light" | "dark">("light");
  const [tabColor, setTabColor] = useState("white");

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("colorMode");
      if (stringValue !== null) {
        const value = stringValue === "true";
        setUiState(value ? "dark" : "light");
        setTabColor(value ? "white" : "black");
      }
    } catch (e) {
      setUiState("light");
      setTabColor("white");
    }
  };

  useEffect(() => {
    getData();
    const listener = EventRegister.addEventListener(
      "theme-changed",
      (themeMode: "light" | "dark") => {
        setUiState(themeMode);
        setTabColor(themeMode === "dark" ? "black" : "white");
      }
    );

    return () => {
      if (typeof listener === "string") {
        EventRegister.removeEventListener(listener);
      }
    };
  }, []);

  useEffect(() => {
    setTabColor(uiState === "dark" ? "white" : "black");
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
