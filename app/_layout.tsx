// RootLayout.tsx or index.tsx
import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { Text, useColorScheme } from "react-native";
import { GluestackUIStyledProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";
import { Provider } from "react-redux";
import store from "@/redux/store";

const RootLayout = () => {
  const [uiState, setUiState] = useState<"light" | "dark">("light");

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("colorMode");
      if (stringValue !== null) {
        const value = stringValue === "true";
        setUiState(value ? "dark" : "light");
      }
    } catch (e) {
      setUiState("light");
    }
  };

  useEffect(() => {
    getData();
    const listener = EventRegister.addEventListener(
      "theme-changed",
      (themeMode: "light" | "dark") => {
        setUiState(themeMode);
      }
    );
    return () => {
      if (typeof listener === "string") {
        EventRegister.removeEventListener(listener);
      }
    };
  }, []);

  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GluestackUIStyledProvider config={config}>
        <GluestackUIProvider mode={uiState}>
          <ThemeProvider
            value={colorScheme === uiState ? DarkTheme : DefaultTheme}
          >
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                }}
                name="event-details/[id]"
              />
              <Stack.Screen
                options={{
                  headerShadowVisible: false,
                  headerTitle: () => (
                    <Text className=" text-secondary-0 font-medium">
                      Search
                    </Text>
                  ),
                }}
                name="search/index"
              />
            </Stack>
          </ThemeProvider>
        </GluestackUIProvider>
      </GluestackUIStyledProvider>
    </Provider>
  );
};

export default RootLayout;
