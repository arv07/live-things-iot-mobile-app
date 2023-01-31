import { View, Text } from "react-native";
import React from "react";

export default function ItemList1({state, date}) {
  return (
    <>
      <View className="flex items-center justify-center w-full h-20 bg-white-primary rounded-md my-1">
        <View className="flex h-20 w-full px-5 justify-center rounded-md bg-white-primary">
          <Text className="text-xl font-light">{state}</Text>
          <Text className="text-xs font-light">{date}</Text>
        </View>
      </View>
    </>
  );
}
