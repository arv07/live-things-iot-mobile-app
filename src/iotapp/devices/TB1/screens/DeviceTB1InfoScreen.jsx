import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Card2 from "../../../../components/cards/Card2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import DeviceInfo from "../../components/DeviceInfo";

export default function DeviceTBI1nfoScreen({ route, navigation }) {
  const { device } = route.params;

  return (
    <>
      <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2 mt-2">
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.aligment}
          scrollEnabled={true}
        >
          <DeviceInfo device={device} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //alignItems: 'center'
  },

  aligment: {
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 5,
    width: "100%",
  },
});