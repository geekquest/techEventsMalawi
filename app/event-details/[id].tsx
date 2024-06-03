import { Box } from "@/components/ui/box";
import { useNavigation, useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";

const EventDetails = () => {
  const {
    id,
    description,
    title,
    startTime,
    endTime,
    dateNum,
    dateDay,
    image,
    location,
    month,
  } = useLocalSearchParams<{
    id: string;
    description: string;
    title: string;
    startTime: string;
    endTime: string;
    dateNum: string;
    dateDay: string;
    image: string;
    location: string;
    month: string;
  }>();

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Text className="text-secondary-0 font-medium">
          {title || "event title"}
        </Text>
      ),
    });
  }, [navigation, title]);

  return (
    <Box className="flex-1 bg-primary-950">
      <Text>Event Details: {id}</Text>
    </Box>
  );
};

export default EventDetails;
