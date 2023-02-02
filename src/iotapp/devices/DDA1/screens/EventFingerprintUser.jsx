import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ItemList1 from "../../../../components/itemList/ItemList1";
import { getFingerprintEntries } from "../../../../api/DDA1/DDA1";

export default function EventFingerprintUser({ route }) {
  const { device } = route.params;
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    handleGetFingerprintEntries();
  }, []);

  const handleGetFingerprintEntries = async () => {
    const result = await getFingerprintEntries(device.id_device);
    setEventData(result.data);
  };
  return (
    <>
      <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2 mt-5">
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.aligment}
          scrollEnabled={true}
        >
          {eventData != "" ? (
            eventData.map((event) => {
              return (
                <ItemList1
                  key={event.id_fingerprint_entry}
                  state={event.name}
                  date={event.created_at}
                />
              );
            })
          ) : (
            <Text>Cargando</Text>
          )}
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
    //backgroundColor: 'red'
  },
});