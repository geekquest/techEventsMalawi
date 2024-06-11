import AnimatedFab from "@/components/Animated.fab";
import { Box } from "@/components/ui/box";
import { checkImageURL } from "@/utils";
import { useNavigation, useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

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
        <Text className="text-secondary-0 font-medium">{title || "title"}</Text>
      ),
    });
  }, [navigation, title]);

  return (
    <Box className="flex-1 bg-primary-950">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="h-screen">
          <View className="h-[55%]">
            <ImageBackground
              className="flex-col justify-between w-full h-full"
              source={{
                uri: checkImageURL(image || "")
                  ? image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg/640px-Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg",
              }}
            >
              {/* <LinearGradient
                className="absolute w-screen h-[30%]"
                colors={["white", "transparent"]}
              /> */}
            </ImageBackground>
          </View>
          <View className="h-full px-4 pt-4">
            <View className="pb-4">
              {/* <Text className="text-xl font-bold text-left text-black">
                {title}
              </Text> */}
              <Box className="flex-row items-center">
                <Box className="pt-1">
                  <Icon name="location-on" size={15} color="black" />
                </Box>
                <Text className="text-left text-typography-0">
                  {location ?? "location"}
                </Text>
              </Box>
            </View>
            <View className="flex-row justify-between pb-4">
              <View className="flex-row">
                <View>
                  <Text className="text-xl font-bold">{dateNum ?? "1"}</Text>
                  <Text className="font-medium text-[10px]">
                    {month ?? "January"}
                  </Text>
                </View>
                <View className="pl-6 ">
                  <Text className="text-xl text-typography-0 font-bold">
                    {dateDay ?? "Monday"}
                  </Text>
                  <Text className=" font-medium text-typography-0 text-[10px]">
                    {startTime ?? "00:00"} {"AM" ?? startTime} -{" "}
                    {endTime ?? "00:00"} {"PM" ?? dateDay}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
              // onPress={() => navigation.navigate("Settings")}
              // Display Calendar onPress
              >
                <View className="w-[35px] h-[35px] bg-gray-300 rounded-full items-center justify-center">
                  <Icon name="calendar-today" size={22} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex-row flex-wrap">
              <Text>
                <Text className="text-typography-0 font-bold">
                  About Event:{" "}
                </Text>
                {description ??
                  `Opps, We don't have any description for this event`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Box className="flex-row w-full justify-end absolute bottom-0 p-4">
        <AnimatedFab form_id={id || ""} />
      </Box>
    </Box>
  );
};

export default EventDetails;
