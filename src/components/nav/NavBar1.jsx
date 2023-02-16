import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { logout } from "../../auth/auth";
import { useNavigation } from "@react-navigation/core";

export default function NavBar1({ isNavBarOpen, handleNavBar, userData }) {
    const navigation = useNavigation()
    const handleDialogLogout = () => {
        Alert.alert(
          "Cerrar sesión?",
          "Esta seguro de cerrar la sesión",
          [
            // The "Yes" button
            {
              text: "Si",
    
              onPress: () => {
                handleLogout();
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
      };

    const handleLogout = async() => {
        const result = await logout();
        //console.log(result);
        if(result.status == 200)
        {
            alert("Se ha cerrado la sesión");
            navigation.navigate('LoginScreen', {action: 'reset'});
        }   
    }
  return (
    <>
      <View
        className={`top-7 right-0 bg-gray-light-primary w-11/12 h-52 ${
          isNavBarOpen ? "absolute" : "hidden"
        }`}
      >
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => handleNavBar()}
            className="bg-green-primary/20 w-12"
          >
            <Image
              source={require("../../assets/icons/close-blue-dark.png")}
              style={{ width: 48, height: 48, resizeMode: "center" }}
              //className="bg-red-primary"
            />
          </TouchableOpacity>
          <Text className="mx-10 font-bold">{userData.name.toUpperCase()}{" "}{userData.last_name.toUpperCase()}</Text>
        </View>

        <View className="w-full h-full m-5 py-2 px-2">
          <TouchableOpacity
            onPress={() => handleDialogLogout()}
            className="w-full  "
          >
            <Text className="text-green-primary text-xl">Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
