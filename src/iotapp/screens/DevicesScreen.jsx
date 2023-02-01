import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { Component, useContext, useEffect, useState } from "react";
import Header1 from "../../components/header/Header1";
import Card1 from "../../components/cards/Card1";
import { SocketContext } from "../../service/socket";
import { getDevices } from "../../api/devices/devices";
import { getDataStorage } from "../../storage/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function DevicesScreen({ route }) {
  const screenHeight = Dimensions.get("window").height;
  const navigation = useNavigation();
  const socket = useContext(SocketContext);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    console.log("useEffect DevicesScreen");
    console.log("Linea 34:");
    console.log(route.params.data);
    setDeviceData(route.params.data);
    const jsonValue = JSON.stringify(route.params.data);
    AsyncStorage.setItem("DEVICES", jsonValue);

    connectToSocket();

    socket.on("USER:getUsersConnected_r", (data) => {
      console.log("Linea 31:");
      console.log(data.connected.devices);
      handleDevicesConnected(data.connected.devices);
    });

    socket.on("connect", async () => {
      console.log("Socket ID: " + socket.id);
      const result = await getDataStorage("USER_TOKEN");
      setTimeout(function () {
        socket.emit("USER:getUsersConnected", {
          userToken: result,
        });
      }, 3000);
    });

    socket.on("DEVICE:newConnection", (data) => {
      console.log("Linea 79");
      //console.log(data);
      handleDevicesConnected([data.device]);
    });
  }, []);

  //For getting data from the craeteDeviceModal
  useEffect(() => {
    if (route.params?.devices) {
      setDeviceData(route.params?.devices);
      (async () => {
        const jsonValue = JSON.stringify(route.params?.devices);
        await AsyncStorage.setItem("DEVICES", jsonValue);
        const result = await AsyncStorage.getItem("USER_TOKEN");
        socket.emit("USER:getUsersConnected", {
          userToken: result,
        });
      })();
    }
  }, [route.params?.devices]);

  const connectToSocket = async () => {
    const result = await getDataStorage("USER_TOKEN");
    console.log("Linea 92:-----------");
    socket.auth = { token: result, userName: "Android" };
    socket.connect();
  };

  //Compare devices from database against devices connected to socket
  const handleDevicesConnected = (devicesConnected) => {
    console.log("Linea 108:");
    //console.log(deviceData);

    AsyncStorage.getItem("DEVICES").then((value) => {
      const devices = JSON.parse(value);
      console.log("Linea 113:");
      //console.log(devices);
      const devicesConnectedUpdated = devices.map((device) => {
        const connected = devicesConnected.some(
          (d) => d.id_device == device.id_device
        );
        return { ...device, connected };
      });
      console.log("Linea 116");
      //console.log(devicesConnectedUpdated);
      setDeviceData(devicesConnectedUpdated);
    });
  };

  const getConnected = () => {
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
      (value) => {
        console.log(JSON.parse(value));
      }

      //setToken(value));
    );
  };

  return (
    <>
    <StatusBar
    backgroundColor="#ecf0f1"
    />
      <Header1 />
      <TouchableOpacity
        className="absolute top-24 right-4 flex w-10 justify-center items-center bg-yellow-primary rounded-md"
        onPress={getConnected}
      >
        <Image
          source={require("../../assets/img/refresh.png")}
          style={{ width: 40, height: 40, resizeMode: "center" }}
        />
      </TouchableOpacity>
      {/* <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2" > */}
      {/* <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden "> */}
      <ScrollView
        //contentContainerStyle={styles.container}
        contentContainerStyle={{
          backgroundColor: "#F1F5F9",
          //backgroundColor: "#e74c3c",
          //height:   500,
       
        }}
        className=" px-1 mb-2"
        //style={styles.aligment}
        scrollEnabled={true}
      >
        {deviceData != "" ? (
          deviceData.map((d) => {
            return (
              <Card1
                key={d.id_device}
                isConnected={
                  d.hasOwnProperty("connected") ? d.connected : false
                }
                device={d}
              />
            );
          })
        ) : (
          <Text>Cargando...</Text>
        )}

        {/* <Button onPress={connectToSocket} title="Conectar" /> */}
     {/*    <Button onPress={getConnected} title="Conectados" />
        <Button onPress={getState} title="Estado devices" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" />
        <Button onPress={getStorage} title="Get storage" /> */}

        {/* <Button onPress={getDeviceStorage} title="Get device storage" /> */}
      </ScrollView>
      <View className="absolute bottom-5 right-5 w-20 h-20 bg-green-primary rounded-full  shadow-md shadow-green-primary">
        <Text
          className="absolute top-5 right-5 text-5xl text-white-primary px-2"
          onPress={() => navigation.navigate("CreateDeviceModal")}
        >
          +
        </Text>
      </View>

      {/* </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    backgroundColor: "#e67e22",
    //alignItems: 'center'
  },

  aligment: {
    paddingLeft: 5,
    paddingRight: 5,
    //marginBottom: 800,
    //width: "100%",
    //height: "100%",
    //backgroundColor: 'red'
  },
});
