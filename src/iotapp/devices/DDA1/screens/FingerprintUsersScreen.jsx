import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import ItemListSwitch1 from "../../../../components/itemList/ItemListSwitch1";
import {
  getFingerprintUsers,
  changeStateFingerprintUser,
} from "../../../../api/DDA1/DDA1";
import FloatingButton from "../../../../components/buttons/FloatingButton";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function FingerprintUsersScreen({ route }) {
    const navigation = useNavigation();
  const { device } = route.params;
  //const [isEnabled, setIsEnabled] = useState(false);
  const [usersData, setUsersData] = useState([]);

  const toggleSwitch = async (idFingerprintUser, fingerprintUserState) => {
    let value = fingerprintUserState ? "INACTIVE" : "ACTIVE";
    //Change state in data to update switch button
    const userDataUpdated = usersData.map((data) => {
      if (data.id_fingerprint_user == idFingerprintUser) {
        data.state = value;
      }
      return data;
    });
    setUsersData(userDataUpdated);

    const result = await changeStateFingerprintUser(
      value,
      device.id_device,
      idFingerprintUser
    );

    if (result.state == "ok") {
    } else {
      //If error return to the first state
      const userDataUpdated = usersData.map((data) => {
        if (data.id_fingerprint_user == idFingerprintUser) {
          data.state = fingerprintUserState;
        }
        return data;
      });
      console.log(userDataUpdated);
      setUsersData(userDataUpdated);
    }
  };

  useEffect(() => {
    handleGetFingerprintUsers();
  }, []);

  const handleGetFingerprintUsers = async () => {
    const result = await getFingerprintUsers(device.id_device);
    setUsersData(result.data);
    //console.log(result.data);
  };

  const getState = () => {
    console.log(isEnabled);
  };

  const handleScreenAddUser = () => {
    navigation.navigate('AddFingerprintUser',  {device: device});
  }

  return (
    <>
      {/* <Button title="Usuarios" onPress={handleGetFingerprintUsers} />
      <Button title="Estado.." onPress={getState} />
      <Button title="Estado.." onPress={getState} /> */}
      <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2">
        <ScrollView
          contentContainerStyle={styles.container}
          style={styles.aligment}
          scrollEnabled={true}
        >
          {usersData != "" ? (
            usersData.map((data) => {
              return (
                <ItemListSwitch1
                  key={data.id_fingerprint_user}
                  isEnabled={data.state == "ACTIVE" ? true : false}
                  toggleSwitch={toggleSwitch}
                  name={data.name}
                  idFingerprintUser={data.id_fingerprint_user}
                />
              );
            })
          ) : (
            <Text>Cargando</Text>
          )}
        </ScrollView>
      </View>
      {/* <View className="absolute bottom-2 left-4 ">
        <TouchableOpacity
        className="flex justify-center items-center w-20 h-10 bg-green-primary rounded-md"
        >
            <Text className="text-white-primary">Eliminar</Text>
        </TouchableOpacity>
      </View> */}
      <View className="absolute bottom-2 right-4 ">
        <FloatingButton onPress={handleScreenAddUser}/>
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
    marginBottom: 35,
    width: "100%",
    //backgroundColor: 'red'
  },
});
