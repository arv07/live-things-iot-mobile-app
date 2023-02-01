import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DeviceInfo from "../../components/DeviceInfo";

export default function DeviceDDA1InfoScreen({ route }) {
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
          <View>
            <Text>Nuevos datos</Text>
          </View>
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
