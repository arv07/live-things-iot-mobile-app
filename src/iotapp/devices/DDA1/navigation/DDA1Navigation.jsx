import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FingerprintUsersScreen from "../screens/FingerprintUsersScreen";
import EventFingerprintUser from "../screens/EventFingerprintUser";
import DeviceInfoScreen from "../../DRL1/screens/DeviceInfoScreen";
import FloatingButton from "../../../../components/buttons/FloatingButton";
import AddFingerprintUser from "../screens/AddFingerprintUser";

export default function DDA1Navigation({ route }) {
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
          name="FingerprintUsersScreen"
          component={FingerprintUsersScreen}
          options={{
            title: "Usuarios",
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={require("../../../../assets/icons/users-blue.png")}
                style={{ width: 40, height: 40, resizeMode: "center" }}
              />
            ),
          }}
          initialParams={{
            device: device,
          }}
        />

        <Tab.Screen
          name="EventFingerprintUser"
          component={EventFingerprintUser}
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
            device: device,
          }}
        />

        <Tab.Screen
          name="DeviceInfoScreen"
          component={DeviceInfoScreen}
          options={{
            title: "Device",
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

          <Tab.Screen
            name="AddFingerprintUser"
            component={AddFingerprintUser}
            options={{
              title: 'Agregar usuario',
              tabBarButton: () => null,
              headerStyle: {backgroundColor: '#F1F5F9'}
         
          }}
          />

      </Tab.Navigator>
      
      
    </>
  );
}
