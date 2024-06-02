import { Tabs } from "expo-router";
import React from "react";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen options={{}} name="index" />
      <Tabs.Screen name="settings/index" />
    </Tabs>
  );
};

export default TabsLayout;
