import "../global.css";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useEffect, useState } from "react";
import { Box } from "@/components/ui/box";

export default function Page() {
  const [uiState, setUiState] = useState<"light" | "dark">("light");

  useEffect(() => {
    setUiState("light");
    // Get Ui State from AsyncStorage
  }, []);
  return (
    <GluestackUIProvider mode={uiState}>
      <View className="flex-1 bg-primary-500 items-center justify-center">
        <Box>
          <Text className="text-typography-100">
            Open up App.tsx to start working on your app!
          </Text>
          <Text className="text-typography-100"></Text>
        </Box>
        <StatusBar style="auto" />
      </View>
    </GluestackUIProvider>
  );
}
