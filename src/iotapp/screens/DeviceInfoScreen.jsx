import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Card2 from "../../components/cards/Card2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import ItemList2 from "../../components/itemList/ItemList2";
import ItemList3 from "../../components/itemList/ItemList3";
//import Clipboard from "@react-native-clipboard/clipboard";
import * as Clipboard from 'expo-clipboard';


export default function DeviceInfoScreen({ route, navigation }) {
  //const navigation = useNavigation();
  const { device } = route.params;
  const [showModalUpdateDevice, setShowModalUpdateDevice] = useState(false);
  console.log("Linea 7 DeviceInfoScreen");
  console.log(device);

  const handleCopyToClipBoard = async () => {
    await Clipboard.setStringAsync(device.device_token);
    alert("Token Copiado");
  }

  return (
    <>
      <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2 mt-2">
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.aligment}
          scrollEnabled={true}
        >
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
          <ItemList3 title={"Token dispositivo"} value={device.device_token} onPress={handleCopyToClipBoard}/>
          {/* <View className="absolute bottom-0 left-36 flex justify-center items-center w-full">
            <TouchableOpacity
              //onPress={formik.handleSubmit}
              title="Registrarse"
              className="flex justify-center items-center bg-yellow-primary font-fw-thin text-xl w-20 h-14"
            >
              <Text className="text-center text-xs font-light">
                Copiar
              </Text>
            </TouchableOpacity>
          </View> */}

          <View className="absolute top-5 left-32 flex justify-center items-center w-full">
            <TouchableOpacity
              //onPress={formik.handleSubmit}
              onPress={() => navigation.navigate('DevicesNavigator', {screen: 'UpdateDeviceModal', params: {device: device}})}
              title="Registrarse"
              className="bg-green-primary font-fw-thin text-xl rounded-full"
            >
              <Text className="text-center py-3 px-3 text-xs font-light text-white-primary">
                Editar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View className={`absolute top-32 w-full h-72 bg-red-primary ${showModalUpdateDevice ? 'flex' : 'hidden'}`}><Text onPress={() => setShowModalUpdateDevice(false)}>Cerrar</Text></View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //alignItems: 'center'
  },

  aligment: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    width: "100%",
  },
});
