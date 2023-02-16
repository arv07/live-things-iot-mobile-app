import { View, Text, Image, StyleSheet, Button } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { SocketContext } from "../../../../service/socket";
import { useNavigation, Route } from "@react-navigation/native"; // <-- new code
import { changeStateRelay, changeStateMovementSensor, getStateMovementSensor } from "../../../../api/DRL1/DRL1";
import { getDataStorage } from "../../../../storage/storage";
import { getStateRelay } from "../../../../api/DRL1/DRL1";
import { Switch } from "react-native-switch";
import Switch1 from "../../../../components/switch/Switch1";


export default function DevicesDRL1Screen({ route }) {
  const socket = useContext(SocketContext);
  const { device } = route.params;

  const [isEnabled, setIsEnabled] = useState(false);
  const [sensorMovementIsEnabled, setSensorMovementIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    console.log(isEnabled);
    let value = isEnabled ? "0" : "1";
    const token = await getDataStorage("USER_TOKEN");
    socket.emit("USER:changeStateDRL1", {
      state: value,
      tokenUser: token,
      idDevice: device.id_device,
    });
    setIsEnabled((previousState) => !previousState);
    const result = await changeStateRelay(value, device.id_device);
    if (result.state == "error") {
      setIsEnabled((previousState) => !previousState);
    }
    //console.log(result);
    //console.log(token);
  };

  const toggleSwitchMovementSensor = async () => {
    console.log(sensorMovementIsEnabled);
    let value = sensorMovementIsEnabled ? "0" : "1";
    const token = await getDataStorage("USER_TOKEN");
    socket.emit("USER:changeStateSensorMovement", {
      state: value,
      userToken: token,
      idDevice: device.id_device,
    });
    setSensorMovementIsEnabled((previousState) => !previousState);
    const result = await changeStateMovementSensor(value, device.id_device);
    if (result.state == "error") {
      setSensorMovementIsEnabled((previousState) => !previousState);
    }

  };

  useEffect(() => {
    //console.log("Device Screen");
    //console.log(device.id_device);
    //console.log(device.name);
    handleGetStateRelay();
    handleGetStateMovementSensor();

    socket.on("USER:DRL1ActiveByMovementSensor", (data) => {
      data.state == "1" ? setIsEnabled(true) : setIsEnabled(false);
      //setIsEnabled(true);
      console.log("Eventos -------------");
    });

  }, []);

  const handleGetStateRelay = async () => {
    const result = await getStateRelay(device.id_device);
    if (result.state == "ok") {
      setIsEnabled(result.data.state == 0 ? false : true);
    }
    console.log(result.data);
  };

  const handleGetStateMovementSensor = async () => {
    const result = await getStateMovementSensor(device.id_device);
    //console.log(result.data);
    if (result.state == "ok") {
      setSensorMovementIsEnabled(result.data.state == 0 ? false : true);
    }
    //console.log(result);
  }

  const state = () => {
    console.log(isEnabled);
    if(isEnabled)
    {
      setIsEnabled(false);
    }
    else{
      setIsEnabled(true);
    }
  }

  return (
    <>
    {/* <Button
    title="Estado"
    onPress={state}
    /> */}
      <View className="flex-1 items-center h-screen w-full bg-gray-light-primary overflow-hidden pb-2">
        <View className="flex flex-col items-center justify-center w-full h-full">
          <View className="w-full h-[30%] flex items-center justify-center mt-10">
            <Switch
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitchMovementSensor}
              value={sensorMovementIsEnabled}
              barHeight={20}
              circleSize={40}
              activeText={"On"}
              inActiveText={"Off"}
              backgroundActive={"#FFC301"}
              backgroundInactive={"#001D3D"}
              activeTextStyle={{ color: "#001D3D" }}
              renderInsideCircle={() => (
                <View
                  className={`rounded-full ${
                    sensorMovementIsEnabled
                      ? "bg-yellow-primary"
                      : "bg-green-primary/20"
                  }`}
                >
                  <Image
                    //source={require('../../assets/img/light-icon-black.png')}
                    source={require("../../../../assets/icons/movement-sensor.png")}
                    style={{ width: 50, height: 50, resizeMode: "center" }}
                  />
                </View>
              )}
            />
            <Text className="mt-5">Sensor Movimiento</Text>
          </View>
          <View className="flex justify-center items-center w-full h-[80%] ">
            <Switch
              trackColor={{ false: "#767577", true: "#FFC301" }}
              thumbColor={isEnabled ? "#bdc3c7" : "#bdc3c7"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              backgroundActive={"#FFC301"}
              backgroundInactive={"#767577"}
              barHeight={0}
              circleSize={0}
              circleBorderActiveColor={"#FFC301"}
              circleInActiveColor={"#767577"}
              circleBorderInactiveColor={"#767577"}
              circleActiveColor={"#FFC301"}
              renderInsideCircle={() => <Switch1 isEnabled={isEnabled} />}
            />
          </View>
        </View>
      </View>
    </>
  );
}
