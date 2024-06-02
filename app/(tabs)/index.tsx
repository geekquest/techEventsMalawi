import "../../global.css";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { Center } from "@/components/ui/center";

export default function Page() {
  const [uiState, setUiState] = useState<"light" | "dark">("light");

  useEffect(() => {
    setUiState("dark");
    // Get Ui State from AsyncStorage
  }, []);
  return (
    <GluestackUIProvider mode={uiState}>
      <Center className="flex-1 bg-primary-500">
        <Box>
          <Text className="text-typography-100">
            Open up App.tsx to start working on your app!
          </Text>
          <Text className="text-typography-100"></Text>
        </Box>
        <Button
          onPress={() => {
            router.push({
              pathname: "/event-details/[id]",
              params: {
                id: "123",
              },
            });
          }}
          title={uiState === "light" ? "Dark" : "Light"}
        />
        <StatusBar style="auto" />
      </Center>
    </GluestackUIProvider>
  );
}
