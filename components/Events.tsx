import React, { useEffect, useState } from "react";
import { fetchEvents } from "../slices/eventsSlice";
import Event from "../models/events.models";
import { checkImageURL } from "../utils";
import { router } from "expo-router";
import { Box } from "./ui/box";
import {
  ImageBackground,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import type { RootState } from "../store";
import { FlashList } from "@shopify/flash-list";
import { EventItem } from "@/interfaces";
import { EventRegister } from "react-native-event-listeners";
import { fetchThreeEvents } from "@/slices/threeEventsSlice";

const Events = () => {
  const { events, loading, error } = useSelector(
    (state: RootState) => state.events
  );
  const dispatch: AppDispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [eventName, setEventName] = useState("recommended");

  useEffect(() => {
    const listener = EventRegister.addEventListener(
      "set-tab-name",
      (eventName: "recommended" | "upcoming") => {
        setEventName(eventName);
        switch (eventName) {
          case "recommended":
            dispatch(fetchEvents()).finally(() => setRefreshing(false));
            break;
          case "upcoming":
            dispatch(fetchThreeEvents()).finally(() => setRefreshing(false));
            break;
          default:
            dispatch(fetchEvents()).finally(() => setRefreshing(false));
        }
      }
    );
    return () => {
      if (typeof listener === "string") {
        EventRegister.removeEventListener(listener);
      }
    };
  }, [events, dispatch, eventName]);

  const onRefresh = () => {
    setRefreshing(true);
    switch (eventName) {
      case "recommended":
        dispatch(fetchEvents()).finally(() => setRefreshing(false));
        break;
      case "upcoming":
        dispatch(fetchThreeEvents()).finally(() => setRefreshing(false));
        break;
      default:
        dispatch(fetchEvents()).finally(() => setRefreshing(false));
    }
  };

  const renderItem = ({ item }: { item: EventItem }) => {
    const event = new Event(item);
    const imageURL = `https://techeventsmw.com/storage/${event.image}`;

    const getDayFromDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.getDate();
    };

    const getMonthFromDate = (dateString: string) => {
      const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date(dateString);
      return months[date.getMonth()];
    };

    const removeSecondsFromTime = (timeString: string) => {
      const [hour, minute] = timeString.split(":");
      return `${hour}:${minute}`;
    };

    const getDayOfWeek = (dateString: string | number | Date) => {
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const date = new Date(dateString);
      return daysOfWeek[date.getDay()];
    };

    const dayString = getDayOfWeek(event.date);
    const day = getDayFromDate(event.date.toISOString());
    const month = getMonthFromDate(event.date.toISOString());
    const timeHour = removeSecondsFromTime(event.time);

    return (
      <Box className="mx-4 bg-transparent">
        <Box
          className="mb-3 h-[200px] rounded-3xl bg-gray-500 "
          style={{ overflow: "hidden" }}
        >
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/event-details/[id]",
                params: {
                  id: event.id,
                  title: event.topic,
                  description: event.message,
                  startTime: event.timeTo,
                  dateDay: dayString,
                  dateNum: day,
                  image: imageURL,
                  location: event.venue,
                  month: month,
                },
              })
            }
          >
            <ImageBackground
              className="flex-col justify-between"
              style={{ width: "100%", height: "100%" }}
              source={{
                uri: checkImageURL(imageURL)
                  ? imageURL
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg/640px-Atari_Computer_Program_Cassette_Joystick_Sketchpad_TX_9032.jpg",
              }}
            >
              <View className="flex-row justify-end w-full p-3">
                <View className="flex-col items-center justify-center h-[40px] w-[40px] bg-white rounded-full">
                  <Text
                    style={{ lineHeight: 12 }}
                    className="text-[12px] font-light"
                  >
                    {day}
                  </Text>
                  <Text style={{ lineHeight: 12 }} className="font-bold">
                    {month}
                  </Text>
                </View>
              </View>
              <View className="p-3 bg-blue-400/80 rounded-b-lg h-[60px]">
                <Text className="font-semibold">{event.topic}</Text>
                <Text className="text-xs">
                  {event.venue} • {timeHour}{" "}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  };

  return (
    <Box className="h-[100%] w-full">
      {loading && !refreshing ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          estimatedItemSize={50}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </Box>
  );
};

export default Events;
