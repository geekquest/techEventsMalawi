import React from "react";
import { Box } from "./ui/box";
import { TouchableWithoutFeedback } from "react-native";
import Animated from "react-native-reanimated";
import { AddIcon, Icon } from "./ui/icon";
import MoreIcons from "react-native-vector-icons/AntDesign";

const AnimatedFab = () => {
  return (
    <Box>
      <TouchableWithoutFeedback>
        <Animated.View>
          <MoreIcons name={"form"} color={"#000000"} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View>
          <MoreIcons name={"form"} color={"#000000"} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback>
        <Animated.View>
          <Icon as={AddIcon} className="text-typography-0 w-4 h-4" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </Box>
  );
};

export default AnimatedFab;
