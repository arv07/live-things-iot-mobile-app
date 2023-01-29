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
import { getDataStorage } from "../../storage/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function DevicesScreen({ route }) {
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [token, setToken] = useState();
  //const [deviceData, setDeviceData] = useState(route.params.data);
  const [deviceData, setDeviceData] = useState([]);
  const [devicesConnected, setDevicesConnected] = useState([]);
  //console.log(route.params);

  useEffect(() => {
    console.log("useEffect DevicesScreen");
    console.log(route.params?.devices);
    if (route.params?.devices) {
      setDeviceData(route.params?.devices);
      
    }
    console.log("Linea 34:");
    console.log(route.params.data);
    setDeviceData(route.params.data);
    const jsonValue = JSON.stringify(route.params.data);
    AsyncStorage.setItem("DEVICES", jsonValue);
    //console.log(route.params.data);
    /* t = handleGetToken(); */
    //handleGetDevices();
    //handleGetToken();
    handleToken();

    connectToSocket();

    socket.on("USER:getUsersConnected_r", (data) => {
      console.log("Linea 31:");
      console.log(data.connected.devices);
      handleDevicesConnected(data.connected.devices);
    });

    socket.on("connect", () => {
      console.log("Socket ID: " + socket.id);
      //const token = localStorage.getItem("token");
      setTimeout(function () {
        //const result = await getDataStorage('USER_TOKEN');
        AsyncStorage.getItem("USER_TOKEN").then(
          (value) =>
            socket.emit("USER:getUsersConnected", {
              userToken: value,
            })
          //setToken(value));
        );
      }, 3000);
    });

    socket.on("DEVICE:newConnection", (data) => {
      console.log("Linea 79");
      console.log(data);
      let filtro = data.device;
      filtro.connected = true;
      handleDevicesConnected([data.device]);
    });
  }, []);

  useEffect(() => {
    
    if (route.params?.devices) {
      setDeviceData(route.params?.devices);
      const jsonValue = JSON.stringify(route.params?.devices);
      AsyncStorage.setItem("DEVICES", jsonValue);
      AsyncStorage.getItem("USER_TOKEN").then(
        (value) =>
          socket.emit("USER:getUsersConnected", {
            userToken: value,
          })
        //setToken(value));
      );
    }
  }, [route.params?.devices])
  

  const handleToken = () =>
    AsyncStorage.getItem("USER_TOKEN").then((value) => setToken(value));

  const connectToSocket = async () => {
    const result = await getDataStorage("USER_TOKEN");
    console.log("Linea 92:-----------");
    //console.log(token);
    socket.auth = { token: result, userName: "Android" };
    socket.connect();
  };

  const handleGetDevices = async () => {
    const result = await getDevices();
    console.log(result.data);
    result.data != ""
      ? setDeviceData(result.data.data)
      : setDeviceData([{ name: "no data" }]);
    //console.log(result.data);
  };

  const handleDevicesConnected = (devicesConnected) => {
    console.log("Linea 108:");
    console.log(deviceData);

    AsyncStorage.getItem("DEVICES").then(
      (value) =>{
        const devices = JSON.parse(value);
        console.log("Linea 113:");
        console.log(devices);
        const list = devices.map((device) => {
          const connected = devicesConnected.some(
            (d) => d.id_device == device.id_device
          );
          return { ...device, connected };
        });
        console.log("Linea 116");
        console.log(list);
        setDeviceData(list);
      }
      
      //setToken(value));
    );
    
    
  };

  const getConnected = () => {
    //console.log(deviceData);
    AsyncStorage.getItem("USER_TOKEN").then(
      (value) =>
        socket.emit("USER:getUsersConnected", {
          userToken: value,
        })
      //setToken(value));
    );
  };

  const getState = () => {
    console.log("Linea 129, deviceData");
    console.log(deviceData);
  };

  const getStorage = async () => {
    const result = await getDataStorage("USER_TOKEN");
    //console.log(result);
    console.log(token);
  };

  const getDeviceStorage = () => {
    AsyncStorage.getItem("DEVICES").then(
      (value) =>{
        console.log(JSON.parse(value));
      }
        
      //setToken(value));
    );
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
                isConnected={
                  d.hasOwnProperty("connected") ? d.connected : false
                }
              />
            );
          })
        ) : (
          <Text>Cargando...</Text>
        )}

        {/* <Button onPress={connectToSocket} title="Conectar" /> */}
        {/* <Button onPress={getConnected} title="Conectados" />
        <Button onPress={getState} title="Estado devices" />
        <Button onPress={getStorage} title="Get storage" />

        <Button onPress={getDeviceStorage} title="Get device storage" /> */}

      </ScrollView>
      <View className="absolute bottom-5 right-5 w-20 h-20 bg-green-primary rounded-full">
        <Text
          className="absolute top-5 right-5 text-5xl text-white-primary px-2"
          onPress={() => navigation.navigate("CreateDeviceModal")}
        >
          +
        </Text>
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
    //backgroundColor: 'red'
  },
});
