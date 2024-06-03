import "../global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

const RootLayout = () => {
  const [uiState, setUiState] = useState<"light" | "dark">("light");

  useEffect(() => {
    setUiState("light");
    // Get Ui State from AsyncStorage
  }, []);
  const colorScheme = useColorScheme();
  return (
    <GluestackUIProvider mode={uiState}>
      <ThemeProvider
        value={colorScheme === `${uiState}` ? DarkTheme : DefaultTheme}
      >
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="event-details/[id]" />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
};

export default RootLayout;
