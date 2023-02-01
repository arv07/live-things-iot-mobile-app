import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

export default function FloatingButton({onPress}) {
  return (
    <>
      <TouchableOpacity
      onPress={() => onPress()}
      className="flex items-center justify-center w-14 h-14 bg-green-primary rounded-full shadow-lg shadow-green-primary"
      >
        <Text className="text-white-primary">+</Text>
      </TouchableOpacity>
    </>
  );
}
