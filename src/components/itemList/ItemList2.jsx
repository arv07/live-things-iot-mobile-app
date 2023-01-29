import { View, Text } from "react-native";
import React from "react";

export default function ItemList2({ title, value }) {
  return (
    <>
      <View className="flex items-center justify-center w-full h-20 bg-white-primary ">
        <View className="flex h-20 w-full px-5 justify-center rounded-md bg-white-primary">
          <Text className="text-xs font-light">{title}</Text>
          <Text className="text-xl font-light">{value}</Text>
        </View>
      </View>
    </>
  );
}
