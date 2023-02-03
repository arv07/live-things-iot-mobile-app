import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SocketContext } from "../../../../service/socket";
import DeviceInfo from "../../components/DeviceInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeviceDDA1InfoScreen({ route }) {
  const { device } = route.params;
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('USER:DeleteAllFingerprintUsers_r', (data) => {
      alert("Se han borrado todos los usuarios: "+ data.message);
    });
  }, [])
  

  const deleteAllFingerprintUsers = () => {
    console.log("Ejecutando metodo");
    AsyncStorage.getItem("USER_TOKEN").then(
      (value) =>
        socket.emit("USER:DeleteAllFingerprintUsers", {
          tokenUser: value,
          idDevice: device.id_device,
        })
    );
    
  };

  const handleDialogDeleteAllFingerprintUsers = () => {
    Alert.alert(
      "Borrar usuarios?",
      "Esta seguro de borrar todos los usuarios del sensor de huellas?",
      [
        // The "Yes" button
        {
          text: "Yes",

          onPress: () => {
            deleteAllFingerprintUsers()
          }
        
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  
  };

  return (
    <>
      <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2 mt-2">
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.aligment}
          scrollEnabled={true}
        >
          <DeviceInfo device={device} />
          <TouchableOpacity
            onPress={handleDialogDeleteAllFingerprintUsers}
            className="flex justify-center items-center w-full h-10 bg-green-primary my-2"
          >
            <Text className="text-white-primary">
              Eliminar todas las huellas
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
