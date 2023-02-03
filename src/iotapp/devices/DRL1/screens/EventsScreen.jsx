import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import ItemList1 from "../../../../components/itemList/ItemList1";
import { getEvents } from "../../../../api/DRL1/DRL1";

export default function EventsScreen({ route }) {
  const { device } = route.params;
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    handleGetEvents();
  }, []);

  const handleGetEvents = async () => {
    const result = await getEvents(device.id_device);
    result.data.length != 0 ? setEventData(result.data) : setEventData([{id_relay_event: 1, state: 0, created_at: 'Sin eventos'}]);
    
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
                  key={event.id_relay_event}
                  state={event.state == 0 ? "Apagado" : "Prendido"}
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
