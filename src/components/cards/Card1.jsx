import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, Route } from '@react-navigation/native'; // <-- new code

export default function Card1({name, reference, idDevice}) {
    const navigation = useNavigation(); // <-- new code

    const event = () => {
        console.log("presionado");
        navigation.navigate('DeviceDRL1Screen', {
          name: name
        });
    }
  return (
    <>
      <TouchableOpacity className="relative w-full h-36 bg-yellow-primary  shadow-md rounded-md mt-2" onPress={event}>
        <View className="flex flex-row items-center py-10 ml-5">
          <Image
            source={require("../../assets/img/light-icon-black.png")}
            style={{ width: 40, height: 40, resizeMode: "center" }}
          />
          <View>
            <Text className="text-2xl font-fw-regular" >
              {name}
            </Text>
            <Text>{reference}</Text>
          </View>
        </View>
        <View className="absolute top-5 right-3  w-5 h-5 rounded-xl bg-green-primary">

        </View>
        <Text className="absolute bottom-0 right-0  mx-2 py-2">Conectado</Text>
      </TouchableOpacity>
    </>
  );
}
