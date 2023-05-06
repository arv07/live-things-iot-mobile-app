import { View, Text, Image, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import DeviceTB1Screen from "../screens/DeviceTB1Screen";
import DeviceTBI1nfoScreen from "../screens/DeviceTB1InfoScreen";

export default function TB1Navigation({ route }) {
  const Tab = createBottomTabNavigator();
  const { device } = route.params;
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#001D3D" }, //blue dark
          tabBarActiveTintColor: "#001D3D", //yellow
          tabBarInactiveTintColor: "#FFFFFF", //white
          tabBarActiveBackgroundColor: "#FFC300",
        }}
      >
        <Tab.Screen
          name="DeviceTB1Screen"
          component={DeviceTB1Screen}
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
            device: device,
          }}
        />

        <Tab.Screen
          name="DeviceTBI1nfoScreen"
          component={DeviceTBI1nfoScreen}
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
            device: device,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
