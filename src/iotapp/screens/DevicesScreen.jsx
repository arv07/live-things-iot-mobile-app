import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import Header1 from "../../components/header/Header1";
import Card1 from "../../components/cards/Card1";
import { SocketContext } from "../../service/socket";
import { getDevices } from "../../api/devices/devices";

export default function DevicesScreen({ navigation }) {
  const socket = useContext(SocketContext);
  const token = "fc876a548aa28a97c160cbb10c509e32b5c50a00651c70b39394f3831300";
  const [deviceData, setDeviceData] = useState([]);
  const [devicesConnected, setDevicesConnected] = useState();
  const connectToSocket = () => {
    socket.auth = { token, userName: "Android" };
    socket.connect();
  };

  useEffect(() => {
    console.log("useEffect DevicesScreen");
    handleGetDevices();
    connectToSocket();

    socket.on("connect", () => {
      console.log("Socket ID: " + socket.id);
      //const token = localStorage.getItem("token");
      /* setTimeout(function () {
        getSocketConnections();
      }, 3000); */
    });

    socket.on("DEVICE:newConnection", (data) => {
      console.log("Linea 39");
      console.log(data);
      setDevicesConnected([data.device]);
    });

  }, []);

  const handleGetDevices = async () => {
    const result = await getDevices();
    result.data != ""
      ? setDeviceData(result.data.data)
      : setDeviceData([{ name: "no data" }]);
    //console.log(result.data);
  };


  const getConnected = () => {
    /* console.log(devicesConnected);
    console.log(deviceData); */

    const filtro = deviceData.filter((d) => {
      if(d.id_device == devicesConnected[0].id_device)
      {
        d.connected = true;
      }
      else{
        d.connected = false;
      }

      return d;
    });

    console.log(filtro);
  }

  return (
    <>
      <Header1 />
      {/* <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2" > */}
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.aligment}
        scrollEnabled={true}
      >
        {deviceData != "" ? (
          deviceData.map((d) => {
            return (
              <Card1
                key={d.id_device}
                name={d.name}
                reference={d.reference}
                idDevice={d.id_device}
              />
            );
          })
        ) : (
          <Text>Cargando...</Text>
        )}

        {/* <Button onPress={connectToSocket} title="Conectar" /> */}
        <Button onPress={getConnected} title="Conectados" />
      </ScrollView>
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
    //backgroundColor: 'red'
  },
});
