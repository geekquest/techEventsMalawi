import React, { useState, useRef } from "react";
import { Animated, Text, TouchableWithoutFeedback } from "react-native";
import { AddIcon, Icon } from "./ui/icon";
import MoreIcons from "react-native-vector-icons/AntDesign";
import { Divider } from "./ui/divider";

const AnimatedFab = () => {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  };

  const simpleFormStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
  };
  const advancedFormStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -85],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  const increaseBackgroundSize = {
    width: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [41, 155],
    }),
  };

  return (
    <TouchableWithoutFeedback onPress={toggleMenu}>
      <Animated.View
        style={increaseBackgroundSize}
        className="flex-row h-12 items-center justify-end rounded-full bg-black"
      >
        <TouchableWithoutFeedback
          className="w-16 h-6"
          onPress={() => {
            console.log("clicked");
            toggleMenu();
          }}
        >
          <Animated.View
            style={advancedFormStyle}
            className="absolute rounded-full flex-row items-center w-16 justify-center h-6"
          >
            <Text className="pr-2 text-xs text-typography-950">Advanced</Text>
            <Divider orientation={"vertical"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            console.log("clicked");
            toggleMenu();
          }}
        >
          <Animated.View
            style={simpleFormStyle}
            className="absolute rounded-full flex-row items-center w-16 justify-center h-6"
          >
            <Text className="pr-2 text-xs text-typography-950">Simple</Text>
            <Divider orientation={"vertical"} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={rotation}
          className="rounded-full flex items-center justify-center z-20 h-[42px] w-[42px]"
        >
          {open ? (
            <Icon as={AddIcon} className="text-typography-950 w-5 h-5" />
          ) : (
            <MoreIcons name={"form"} color={"#ffffff"} />
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default AnimatedFab;
