import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import { Box } from "@/components/ui/box";
import { router } from "expo-router";
import { Center } from "@/components/ui/center";

export default function Page() {
  return (
    <Center className="flex-1 bg-primary-800">
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
        title={"Button"}
      />
      <StatusBar style="auto" />
    </Center>
  );
}
