import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Switch } from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EventRegister } from "react-native-event-listeners";
import { Icon, MoonIcon, SunIcon } from "@/components/ui/icon";

const Page = () => {
  const [isToggled, setIsToggled] = useState(false);

  const storeData = async (value: boolean) => {
    try {
      const stringValue = value ? "true" : "false";
      await AsyncStorage.setItem("colorMode", stringValue);
    } catch (e) {
      setIsToggled(false);
    }
  };

  const getData = async () => {
    try {
      const stringValue = await AsyncStorage.getItem("colorMode");
      if (stringValue !== null) {
        const value = stringValue === "true";
        setIsToggled(value);
      }
    } catch (e) {
      setIsToggled(false);
    }
  };

  const handleToggleChange = (toggleValue: boolean) => {
    setIsToggled(toggleValue);
    storeData(toggleValue);
    EventRegister.emit("theme-changed", toggleValue ? "dark" : "light");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box>
      <Text>Page</Text>
      <HStack className="flex items-center">
        <Switch onToggle={handleToggleChange} value={isToggled} />
        {isToggled ? (
          <Icon as={SunIcon} className="text-typography-0 m-2 w-5 h-5" />
        ) : (
          <Icon as={MoonIcon} className="text-typography-0 m-2 w-5 h-5" />
        )}
      </HStack>
    </Box>
  );
};

export default Page;
