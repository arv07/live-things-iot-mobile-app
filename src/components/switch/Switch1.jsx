import { View, Text } from "react-native";
import React from "react";

export default function Switch1({isEnabled}) {
  return (
    <>
      <View className="flex items-center justify-center bg-green-primary/10 w-44 h-44 rounded-full mb-5">
        <View
          className={`flex items-center justify-center  w-32 h-32 rounded-full ${
            isEnabled ? "bg-yellow-primary" : "bg-green-primary"
          }`}
        >
          <Text
            className={`text-2xl font-thin ${
              isEnabled ? "text-green-primary" : "text-yellow-primary"
            }`}
          >
            {isEnabled ? "ON" : "OFF"}
          </Text>
        </View>
      </View>
    </>
  );
}
