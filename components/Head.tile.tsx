import React from "react";
import { Box } from "./ui/box";
import { Avatar, AvatarBadge, AvatarFallbackText } from "./ui/avatar";
import { Icon, SearchIcon, SettingsIcon, ShareIcon } from "./ui/icon";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const HeadTile = () => {
  return (
    <Box className="h-[70px] w-full flex-row items-end">
      <Box className="flex-row w-full items-center justify-between">
        <Avatar className="bg-secondary-0 h-10 w-10 ml-2">
          <AvatarFallbackText className=" text-typography-950 text-xs">
            u
          </AvatarFallbackText>
          <AvatarBadge />
        </Avatar>
        <Box className="flex-row items-center">
          <Icon as={ShareIcon} className="text-typography-0 w-4 h-4" />
          <Text className="text-typography-0 text-xs">Lilongwe, Malawi</Text>
        </Box>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/search",
            });
          }}
          className="items-center justify-center rounded-full h-[35px] w-[35px]"
        >
          <Icon as={SearchIcon} className="text-typography-100 h-7 w-7" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HeadTile;
