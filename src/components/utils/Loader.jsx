import { View, Text, Image } from "react-native";
import React from "react";

export default function Loader() {
  return (
    <>
    
        <Image
          source={require("../../assets/img/spinner.gif")}
          style={{ width: 50, height: 50, resizeMode: "center" }}
        />
     
    </>
  );
}
