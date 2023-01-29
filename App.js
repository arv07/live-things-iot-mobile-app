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
import { userIsAuthenticated } from "./src/auth/auth";
import { useNavigation } from "@react-navigation/native";
import Header1 from "./src/components/header/Header1";

export default function App() {
  //const navigation = useNavigation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const Stack = createNativeStackNavigator();

  const handleNavBar = () => {
    isNavBarOpen ? setIsNavBarOpen(false) : setIsNavBarOpen(true);
  };

  useEffect(() => {
    handleUserIsAuthenticated();
  }, []);

  const handleUserIsAuthenticated = async () => {
    const result = await userIsAuthenticated();
    console.log(result.data);
    /* if(result.status == 500)
    {
      setIsAuthenticated(false);
    } */
    if (result.data == 1) {
      setIsAuthenticated(true);
      //navigation.navigate('LoginScreen');
    } else {
      console.log("No autenticado");
      
    }

    setIsLoaded(true);
  };

  if (isLoaded) {
    return (
      <NavigationContainer>
        <SocketContext.Provider value={socket}>
          <Stack.Navigator
            initialRouteName={
              isAuthenticated ? "DevicesNavigator" : "LoginScreen"
            }
          >
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
              screenOptions={{headerStyle: {backgroundColor: 'papayawhip'}}}
              options={{ 
                //title: "Dipositivos",
                headerShown: false 
              }}
            />
          </Stack.Navigator>
          
        </SocketContext.Provider>
      </NavigationContainer>
    );
  } else {
    return(
      <Header1/>
    )
  }
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
}); */
