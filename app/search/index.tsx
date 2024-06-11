import { Box } from "@/components/ui/box";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import React from "react";
import { Text } from "react-native";

const Search = () => {
  return (
    <Box>
      <Input>
        <InputSlot className="pl-3">
        <InputIcon as={SearchIcon} />
      </InputSlot>
      <InputField placeholder="Search..." />
      </Input>
    </Box>
  );
};

export default Search;
