import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ItemList2 from "../../../components/itemList/ItemList2";
import ItemList3 from "../../../components/itemList/ItemList3";
import { useNavigation } from "@react-navigation/core";
import * as Clipboard from "expo-clipboard";

export default function DeviceInfo({ device }) {
  const navigation = useNavigation();
  const handleCopyToClipBoard = async () => {
    await Clipboard.setStringAsync(device.device_token);
    alert("Token Copiado");
  };

  return (
    <>
      <ItemList2 title={"Nombre"} value={device.name} />
      <ItemList2
        title={"Descripción"}
        value={device.description != null ? device.description : "--"}
      />
      <ItemList2
        title={"Ubicación"}
        value={device.location != null ? device.location : "--"}
      />
      <ItemList2 title={"Referencia"} value={device.reference} />
      <ItemList2 title={"Creación"} value={device.created_at} />
      <ItemList2 title={"Versión"} value={device.version} />
      <ItemList2 title={"Codigo Interno"} value={device.internal_code} />
      <ItemList3
        title={"Token dispositivo"}
        value={device.device_token}
        onPress={handleCopyToClipBoard}
      />
      <View className="absolute top-5 left-32 flex justify-center items-center w-full">
        <TouchableOpacity
          //onPress={formik.handleSubmit}
          onPress={() =>
            navigation.navigate("DevicesNavigator", {
              screen: "UpdateDeviceModal",
              params: { device: device },
            })
          }
          title="Registrarse"
          className="bg-green-primary font-fw-thin text-xl rounded-full"
        >
          <Text className="text-center py-3 px-3 text-xs font-light text-white-primary">
            Editar
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
