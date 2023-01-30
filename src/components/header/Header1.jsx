import { View, Text, Image } from "react-native";
import React from "react";

export default function Header1() {
  return (
    <>
      <View className="flex bg-green-primary w-full h-36 rounded-b-lg items-center justify-center">
        <Text className="flex flex-row justify-center  text-4xl text-gray-light-primary font-fw-light mr-10">
          <View className="flex  justify-center items-center bg-yellow-primary rounded-md ">
            <Image
              source={require("../../assets/img/devices-black.png")}
              style={{ width: 40, height: 40, resizeMode: "center" }}
            />
          </View>
          Dipositivos
        </Text>
      </View>
    </>
  );
}
