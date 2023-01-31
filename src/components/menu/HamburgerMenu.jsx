import { View, Text } from "react-native";
import React from "react";

export default function HamburgerMenu() {
  return (
    <>
      <View className="flex flex-col justify-center w-12 h-11 ml-3  rounded-md my-1">
        <View className="border-t-2 border-gray-light-primary my-1 mx-2 rounded-sm"></View>
        <View className="border-t-2 border-gray-light-primary my-1 mx-2 rounded-sm"></View>
        <View className="border-t-2 border-gray-light-primary my-1 mx-2 rounded-sm"></View>
      </View>
    </>
  );
}
