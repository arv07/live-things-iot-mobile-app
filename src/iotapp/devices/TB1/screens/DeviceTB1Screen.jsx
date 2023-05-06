import { View, Text, Button, TouchableOpacity, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../../../service/socket";
import { getDataStorage } from "../../../../storage/storage";

export default function DeviceTB1Screen({ route }) {
  const { device } = route.params;
  const socket = useContext(SocketContext);
  const [degree, setDegree] = useState(45);

  const handleTriggerButton = async () => {
    //console.log(isEnabled);
    //let value = isEnabled ? "0" : "1";
    const token = await getDataStorage("USER_TOKEN");
    socket.emit("USER:triggerButton", {
      state: "Disparar boton",
      tokenUser: token,
      idDevice: device.id_device,
      degrees: degree
    });

    //console.log(result);
    //console.log(token);
  };
  return (
    <>
      <View className="flex-1 items-center h-screen w-full bg-gray-light-primary overflow-hidden pb-2">
        <View className="flex flex-col items-center justify-center w-full h-full">
          <Text>DeviceTB1Screen</Text>
          <TouchableOpacity
            onPress={handleTriggerButton}
            className="flex justify-center items-center w-4/5 h-10 bg-green-primary rounded-md"
          >
            <Text className="text-white-primary">Activar</Text>
          </TouchableOpacity>
          <View className="flex justify-center items-center w-full">
            <TextInput
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              maxLength={3}
              keyboardType="number-pad"
              inputMode="numeric"
              placeholder="Grados"
              autoCapitalize="none"
              value={degree}
              onChangeText={(text) => setDegree(text)}
            />
          </View>
        </View>
      </View>
    </>
  );
}
