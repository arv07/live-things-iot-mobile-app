import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, {useEffect, useState} from "react";
import ItemList2 from "../../../components/itemList/ItemList2";
import ItemList3 from "../../../components/itemList/ItemList3";
import { useNavigation } from "@react-navigation/core";
import * as Clipboard from "expo-clipboard";
import { deleteDevice } from "../../../api/devices/devices";

export default function DeviceInfo({ device }) {
  const navigation = useNavigation();
  const [redirect, setRedirect] = useState();
  const handleCopyToClipBoard = async () => {
    await Clipboard.setStringAsync(device.device_token);
    alert("Token Copiado");
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 100);
    setRedirect(random);
    //console.log("Numero random");
    //console.log(random);
  }, [])
  

  const handleDialogDeleteDevice = () => {
    Alert.alert(
      "Eliminar dispositivo?",
      "Esta seguro de eliminar este dispositivo? Todos los datos se perderan",
      [
        // The "Yes" button
        {
          text: "Si",

          onPress: () => {
            handleDeleteDevice();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  const handleDeleteDevice = async () => {
    const result = await deleteDevice(device.id_device);
    if (result.data.state == "ok") {
      alert("Se ha eliminado el dispositivo");
      navigation.navigate("DevicesNavigator", {
        action: redirect,
      })
      
    }
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
      <TouchableOpacity
        onPress={handleDialogDeleteDevice}
        className="flex justify-center items-center w-full h-10 bg-red-primary"
      >
        <Text className="text-white-primary">Eliminar dispositivo</Text>
      </TouchableOpacity>

      <View className="absolute top-5 left-32 flex justify-center items-center w-full">
        <TouchableOpacity
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
