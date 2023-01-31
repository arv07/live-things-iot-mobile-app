import { View, Text, Button, StatusBar, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import DevicesScreen from "../screens/DevicesScreen";
import DevicesDRL1Screen from "../screens/DeviceDRL1Screen";
import { getDevices } from "../../api/devices/devices";
import CreateDeviceModal from "../devices/components/modal/CreateDeviceModal";
import HamburgerMenu from "../../components/menu/HamburgerMenu";
import DRL1Navigation from "../devices/DRL1/navigation/DRL1Navigation";
import UpdateDeviceModal from "../devices/components/modal/UpdateDeviceModal";

export default function DevicesNavigator({ route }) {
  //const Stack = createNativeStackNavigator();
  //const {action} = route.params?;
  const Stack = createStackNavigator();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  console.log("Devices Navigator ----------------");
 

  const handleNavBar = () => {
    isNavBarOpen ? setIsNavBarOpen(false) : setIsNavBarOpen(true);
  };

  useEffect(() => {
    console.log("Use Effect Devices Navigator");
    handleGetDevices();
  }, []);

  useEffect(() => {
    if (route.params?.action) {
      console.log("Use Effect Devices Navigator REFRESCAR");
    }

    console.log(route.params?.action);
    setDeviceData([]);
    handleGetDevices();
  }, [route.params?.action]);

  const handleGetDevices = async () => {
    const result = await getDevices();
    console.log(result.data);
    result.data != ""
      ? setDeviceData(result.data.data)
      : setDeviceData([{ name: "no data" }]);
    //console.log(result.data);
  };
  if (deviceData.length != 0)
    return (
      <>
        <Stack.Navigator initialRouteName="DevicesScreen">
          <Stack.Group>
            <Stack.Screen
              name="DevicesScreen"
              component={DevicesScreen}
              options={{
                title: '',
                headerShown: true, //
                headerTransparent: true,
                headerRight: () => (
                  <TouchableOpacity className="m-2" onPress={handleNavBar}>
                    <HamburgerMenu />
                  </TouchableOpacity>
                ),
              }}
              
              initialParams={{ data: deviceData }}
            />
            {/* <Stack.Screen
              name="DeviceDRL1Screen"
              component={DevicesDRL1Screen}
              options={{ title: "DRL1" }}
            /> */}
            <Stack.Screen
              name="DRL1Navigation"
              component={DRL1Navigation}
              options={{ title: "DRL1" }}
            />
          </Stack.Group>

          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen
              name="CreateDeviceModal"
              component={CreateDeviceModal}
              options={{
                title: "Agregar dispositivo",
              }}
            />
            <Stack.Screen
              name="UpdateDeviceModal"
              component={UpdateDeviceModal}
              options={{
                title: "Actualizar dispositivo",
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
        <View
          className={`top-20 right-0 bg-green-secundary w-11/12 h-52 ${
            isNavBarOpen ? "absolute" : "hidden"
          }`}
        ></View>
      </>
    );
}
