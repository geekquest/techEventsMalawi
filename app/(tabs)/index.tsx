import { Box } from "@/components/ui/box";
import HeadTile from "@/components/Head.tile";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { EventRegister } from "react-native-event-listeners";
import HeadTileTabs from "@/components/Tabs";
import Events from "@/components/Events";

export default function Page() {
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

  return (
    <Box className="flex-1 bg-primary-950 flex-col items-start">
      <HeadTile />
      <HeadTileTabs />
      <Events />
      <StatusBar style={uiState} />
    </Box>
  );
}
