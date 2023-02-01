import { View, Text, Switch } from "react-native";
import React from "react";

export default function ItemListSwitch1({isEnabled, toggleSwitch, name, idFingerprintUser}) {
  //console.log(isEnabled);
  return (
    <>
      <View className="flex flex-row items-center justify-between w-full h-16 bg-white-primary rounded-md my-1 shadow-sm shadow-green-primary">
        <Text className="text-xl font-light ml-5">{name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FFC301" }}
          thumbColor={isEnabled ? "#bdc3c7" : "#bdc3c7"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => toggleSwitch(idFingerprintUser, isEnabled)}
          value={isEnabled}
          style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
          className="mr-5"
        />
      </View>
    </>
  );
}
