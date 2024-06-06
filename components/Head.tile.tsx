import React, { useEffect, useState } from "react";
import { Box } from "./ui/box";
import { Avatar, AvatarBadge, AvatarFallbackText } from "./ui/avatar";
import { Icon, SearchIcon } from "./ui/icon";
import { Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import * as Location from "expo-location";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import LocationPin from "react-native-vector-icons/Entypo";

const fetchAddress = async (
  latitude: string,
  longitude: string
): Promise<string | null> => {
  const url = `http://nominatim.openstreetmap.org/reverse?format=xml&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
  try {
    const response = await axios.get(url);
    const parser = new XMLParser();
    const jsonObj = parser.parse(response.data);
    const address = jsonObj.reversegeocode.addressparts;
    const addressString = `${address.state}, ${address.country}`;
    return addressString;
  } catch (error) {
    return "The Moon";
  }
};

const HeadTile = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setAddress("The Moon");
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const lat = location.coords.latitude.toString();
      const lon = location.coords.longitude.toString();

      const fetchedAddress = await fetchAddress(lat, lon);
      setAddress(fetchedAddress);
      setLoading(false);
    })();
  }, []);

  return (
    <Box className="h-[70px] px-3 mb-2 w-full flex-row items-end">
      <Box className="flex-row w-full items-center justify-between">
        <Avatar className="bg-secondary-0 h-10 w-10 ml-2">
          <AvatarFallbackText className=" text-typography-950 text-xs">
            u
          </AvatarFallbackText>
          <AvatarBadge />
        </Avatar>
        <Box className="flex-row items-center">
          <LocationPin name="location-pin" size={15} />
          <Text className="text-typography-0 text-xs">
            {loading ? "Loading..." : address || "The Moon"}
          </Text>
        </Box>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/search",
            });
          }}
          className="items-center justify-center rounded-full h-[35px] w-[35px]"
        >
          <Icon as={SearchIcon} className="text-typography-0 h-6 w-6" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default HeadTile;
