import { View, Text, Image, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import DevicesDRL1Screen from "../screens/DeviceDRL1Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import EventsScreen from "../screens/EventsScreen";
import DeviceDRL1InfoScreen from "../screens/DeviceDRL1InfoScreen";
import UpdateDeviceModal from "../../components/modal/UpdateDeviceModal";

export default function DRL1Navigation({ route }) {
  const Tab = createBottomTabNavigator();
  const { device } = route.params;
  useEffect(() => {
    //console.log(route.params.name);
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#001D3D"}, //blue dark
          tabBarActiveTintColor: "#001D3D", //yellow
          tabBarInactiveTintColor: "#FFFFFF", //white
          tabBarActiveBackgroundColor: "#FFC300",
        }}
      >
        <Tab.Screen
          name="DeviceDRL1Screen"
          component={DevicesDRL1Screen}
          options={{
            title: "Switch",
            tabBarLabelPosition: "below-icon",
            tabBarIcon: () => (
              <Image
                source={require("../../../../assets/icons/light-bulb-blue.png")}
                style={{ width: 40, height: 40, resizeMode: "center" }}
              />
            ),
            //tabBarBadge: 'hola',
            //tabBarBadgeStyle: {backgroundColor: '#9b59b6'},
            headerShown: false,
          }}
          initialParams={{
            device: device
          }}
        />
        <Tab.Screen
          name="EventsScreen"
          component={EventsScreen}
          options={{
            title: "Eventos",
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require("../../../../assets/icons/event-blue.png")}
                style={{ width: 40, height: 40, resizeMode: "center" }}
              />
            ),
          }}
          initialParams={{
            device: device
          }}
        />
        <Tab.Screen
          name="DeviceInfoScreen"
          component={DeviceDRL1InfoScreen}
          options={{
            title: "Dispositivo",
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require("../../../../assets/icons/info-device-blue.png")}
                style={{ width: 40, height: 40, resizeMode: "center" }}
              />
            ),
          }}
          initialParams={{
            device: device
          }}
        />
        {/* Hidden Screen */}
        <Tab.Screen
            name="UpdateDeviceModal"
            component={UpdateDeviceModal}
            options={{
                title: 'Actualizar Dispositivo',
                tabBarButton: () => null,
                headerStyle: {backgroundColor: '#F1F5F9'}
           
            }}
            
      
      
        />
      </Tab.Navigator>
      <StatusBar barStyle="light-content" backgroundColor="#001D3D" />
    </>
  );
}
