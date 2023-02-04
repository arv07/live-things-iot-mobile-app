import { View, Text, Button, StatusBar, TouchableOpacity, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import DevicesScreen from "../screens/DevicesScreen";
import DevicesDRL1Screen from "../devices/DRL1/screens/DeviceDRL1Screen";
import { getDevices } from "../../api/devices/devices";
import CreateDeviceModal from "../devices/components/modal/CreateDeviceModal";
import HamburgerMenu from "../../components/menu/HamburgerMenu";
import DRL1Navigation from "../devices/DRL1/navigation/DRL1Navigation";
import UpdateDeviceModal from "../devices/components/modal/UpdateDeviceModal";
import DDA1Navigation from "../devices/DDA1/navigation/DDA1Navigation";
import DropdownMenu from "../../components/menu/DropdownMenu";
import NavBar1 from "../../components/nav/NavBar1";
import { getAuthenticatedUser } from "../../auth/auth";

export default function DevicesNavigator({ route }) {
  //const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  //console.log("Param Action:");
  //console.log(route.params?.action);
  const Stack = createStackNavigator();
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [deviceData, setDeviceData] = useState([]);
  const [userData, setUserData] = useState({name: '-', last_name: '-'});
  //console.log("Devices Navigator ----------------");

  const handleNavBar = () => {
    isNavBarOpen ? setIsNavBarOpen(false) : setIsNavBarOpen(true);
  };

  useEffect(() => {
    console.log("Use Effect Devices Navigator");
    handleGetDevices();
    handleGetAuthenticatedUser();
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
    console.log(result.data.length == 0);
    result.data != ""
      ? setDeviceData(result.data.data)
      : setDeviceData([{ name: "no data", reference: 'No data' }]);
    //console.log(result.data);
  };

  const handleGetAuthenticatedUser = async () => {
    const result = await getAuthenticatedUser();
    setUserData(result.data.data);
  }

  if (deviceData.length != 0)
    return (
      <>
        <Stack.Navigator initialRouteName="DevicesScreen">
          <Stack.Group>
            <Stack.Screen
              name="DevicesScreen"
              component={DevicesScreen}
              options={{
                title: "",
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
            <Stack.Screen
              name="DDA1Navigation"
              component={DDA1Navigation}
              options={{
                title: "DDA1",
                //headerShown: false,
              }}
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

        <NavBar1
        isNavBarOpen={isNavBarOpen}
        handleNavBar={handleNavBar}
        userData={userData}
        />
        {/* <View
          className={`top-20 right-0 bg-green-secundary w-11/12 h-52 ${
            isNavBarOpen ? "absolute" : "hidden"
          }`}
        ></View> */}

      </>
    );
}
