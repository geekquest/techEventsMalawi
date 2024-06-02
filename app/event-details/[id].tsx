import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

const EventDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>Event Details: {id}</Text>
    </View>
  );
};

export default EventDetails;
