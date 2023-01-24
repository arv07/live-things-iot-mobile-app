import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import { TailwindProvider } from "tailwind-rn/dist";
import utilities from "./tailwind.config";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/screens/LoginPage";
import SignupPage from "./src/screens/SignupPage";
import DevicesScreen from "./src/iotapp/screens/DevicesScreen";
import DevicesDRL1Screen from "./src/iotapp/screens/DeviceDRL1Screen";
import { SocketContext, socket } from "./src/service/socket";
import DevicesNavigator from "./src/iotapp/navigator/DevicesNavigator";

export default function App() {
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const Stack = createNativeStackNavigator();

  const handleNavBar = () => {
    isNavBarOpen ? setIsNavBarOpen(false) : setIsNavBarOpen(true);
  };

  return (
    <NavigationContainer>
      <SocketContext.Provider value={socket}>
        <Stack.Navigator>
          <Stack.Screen
            name="Signup"
            component={SignupPage}
            options={{ title: "Registro" }}
          />

          <Stack.Screen
            name="LoginScreen"
            component={LoginPage}
            options={{ title: "Overview" }}
          />

          <Stack.Screen
            name="DevicesNavigator"
            component={DevicesNavigator}
            options={{ title: "Overview" }}
          />
        </Stack.Navigator>
        <View
          className={`top-20 right-0 bg-green-secundary w-11/12 h-52 ${
            isNavBarOpen ? "absolute" : "hidden"
          }`}
        ></View>
      </SocketContext.Provider>
    </NavigationContainer>
  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
}); */
