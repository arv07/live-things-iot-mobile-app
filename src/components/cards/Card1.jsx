import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, Route } from "@react-navigation/native"; // <-- new code

export default function Card1({ isConnected, device }) {
  const navigation = useNavigation(); // <-- new code
  console.log("Linea 7:");
  //console.log(infoDevice);
  /* const event = () => {
        console.log("presionado");
        navigation.navigate('DeviceDRL1Screen', {
          name: name,
          idDevice: idDevice
        });
    } */
  const event = (reference) => {
    console.log("presionado");
    console.log(reference);
    navigation.navigate(`${reference}Navigation`, {
      device: device
    });
  };

  return (
    <>
      <TouchableOpacity
        className="relative w-full h-36 bg-yellow-primary  shadow-md shadow-green-primary rounded-md mt-2"
        onPress={() => event(device.reference)}
      >
        <View className="flex flex-row items-center py-10 ml-5">
          <Image
            source={require("../../assets/img/light-icon-black.png")}
            style={{ width: 40, height: 40, resizeMode: "center" }}
          />
          <View>
            <Text className="text-2xl font-fw-regular">{device.name}</Text>
            <Text>{device.reference}</Text>
          </View>
        </View>
        <View
          className={`absolute top-5 right-3  w-5 h-5 rounded-xl ${
            isConnected ? "bg-green-primary" : "bg-gray-light-primary/80"
          }`}
        ></View>

        <Text className="absolute bottom-0 right-0  mx-2 py-2">
          {isConnected ? "Conectado" : "Desconectado"}
        </Text>
      </TouchableOpacity>
    </>
  );
}
