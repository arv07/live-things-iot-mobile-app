import { View, Text, Button } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DevicesScreen from "../screens/DevicesScreen";
import DevicesDRL1Screen from "../screens/DeviceDRL1Screen";
import { getDevices } from "../../api/devices/devices";

export default function DevicesNavigator() {
  const Stack = createNativeStackNavigator();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [deviceData, setDeviceData] = useState([]);

  const handleNavBar = () => {
    isNavBarOpen ? setIsNavBarOpen(false) : setIsNavBarOpen(true);
  };

  useEffect(() => {
    handleGetDevices();
  }, []);

  const handleGetDevices = async () => {
    const result = await getDevices();
    //console.log(result.data);
    result.data != ""
      ? setDeviceData(result.data.data)
      : setDeviceData([{ name: "no data" }]);
    //console.log(result.data);
  };
  if(deviceData.length != 0)
  return (
    <>
    
      <Stack.Navigator>
        <Stack.Screen
          name="DevicesScreen"
          component={DevicesScreen}
          options={{
            title: "Dispositivos",
            headerShown: false, //
            headerRight: () => (
              <Button onPress={handleNavBar} title="Info" color="#fff" />
            )
          }}
          initialParams={{data: deviceData}}
        />
        <Stack.Screen
          name="DeviceDRL1Screen"
          component={DevicesDRL1Screen}
          options={{ title: "DRL1" }}
        />
      </Stack.Navigator>
    </>
  );
}
