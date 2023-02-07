import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormNotification from "../../../../components/utils/FormNotification";
import Loader from "../../../../components/utils/Loader";
import { createDevice } from "../../../../api/devices/devices";
import { useNavigation } from "@react-navigation/native";
import { getDevices } from "../../../../api/devices/devices";

export default function CreateDeviceModal({ route }) {
  const navigation = useNavigation();
  const [deviceData, setDeviceData] = useState([]);
  const [stateApi, setStateApi] = useState({
    isSending: false,
    status: "",
    message: "a",
    levelNotification: "",
  });
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formData) => {
      handleCreateDevice(formData);
      //console.log(formData);
    },
  });

  const handleCreateDevice = async (formData) => {
    setStateApi({ ...stateApi, isSending: true });
    const result = await createDevice(formData);
    console.log(result.data);
    if (result.data.state == "ok") {
      setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });
      handleGetDevices();
    } else {
      //handleGetDevices();
      setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });
    }
  };

  const handleGetDevices = async () => {
    const result = await getDevices();
    //console.log(result.data);
    result.data != ""
      ? setDeviceData(result.data.data)
      : setDeviceData([{ name: "no data" }]);

    //Go back to screen and return new data
    navigation.navigate("DevicesScreen", {
      devices: result.data.data,
    });
    //console.log(result.data);
  };

  const handleChange = () => {
    navigation.navigate("DevicesScreen", {
      post: {
        name: "DevicesScreen",
        params: { post: "postText" },
        merge: true,
      },
    });
  };

  return (
    <ScrollView
    contentContainerStyle={styles.container}
        style={styles.aligment}
        scrollEnabled={true}
    >
      <View className="bg-gray-light-primary w-full h-auto flex flex-col items-center justify-start mt-10">
        <View className=" flex flex-col justify-items-start  w-full items-center justify-start ">
          <TextInput
            placeholder="Nombre"
            className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
            autoCapitalize="none"
            value={formik.values.name}
            onChangeText={(text) => formik.setFieldValue("name", text)}
          />
          <TextInput
            placeholder="Descripción (opcional)"
            className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
            autoCapitalize="none"
            value={formik.values.description}
            onChangeText={(text) => formik.setFieldValue("description", text)}
          />
          <TextInput
            placeholder="Ubicación (opcional)"
            className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
            autoCapitalize="none"
            value={formik.values.location}
            onChangeText={(text) => formik.setFieldValue("location", text)}
          />
          <TextInput
            placeholder="Codigo interno dispositivo"
            className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
            autoCapitalize="none"
            value={formik.values.internal_code}
            onChangeText={(text) => formik.setFieldValue("internal_code", text)}
          />

          <Text>
            {formik.errors.name}
            {"\n"}
            {formik.errors.internal_code}
          </Text>

          {stateApi.isSending == true ? <Loader /> : ""}
          {stateApi.message != "" ? (
            <FormNotification
              message={stateApi.message}
              levelNotification={stateApi.levelNotification}
            />
          ) : (
            ""
          )}
          <View className="flex justify-center items-center w-full">
            <TouchableOpacity
              onPress={formik.handleSubmit}
              title="Registrarse"
              className="bg-yellow-primary w-11/12  h-14 my-5 rounded-md font-fw-thin text-xl "
            >
              <Text className="text-center py-3 text-xl">Agregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function validationSchema() {
  return {
    name: Yup.string().required("nombre es obligatorio"),
    internal_code: Yup.string().required("codigo interno bligatorio"),
  };
}

function initialValues() {
  return {
    name: "",
    description: "",
    location: "",
    internal_code: "",
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  aligment: {
    paddingTop: 1,
    paddingLeft: 5,
    paddingRight: 5,
    //marginBottom: 5,
    //backgroundColor: "#001D3D",
  },
});
