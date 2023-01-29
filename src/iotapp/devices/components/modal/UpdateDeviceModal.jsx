import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormNotification from "../../../../components/utils/FormNotification";
import Loader from "../../../../components/utils/Loader";
import { useNavigation } from "@react-navigation/native";
import { updateDevice } from "../../../../api/devices/devices";
import { getDevices } from "../../../../api/devices/devices";

export default function UpdateDeviceModal({ route }) {
  const navigation = useNavigation();
  const { device } = route.params;
  //console.log("Update Device Screen");
  //console.log(device);
  const [deviceData, setDeviceData] = useState([]);
  const [stateApi, setStateApi] = useState({
    isSending: false,
    status: "",
    message: "a",
    levelNotification: "",
  });
  const formik = useFormik({
    initialValues: initialValues(device),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formData) => {
      handleUpdateDevice(formData, device.id_device);
      //console.log(formData);
    },
  });

  const handleUpdateDevice = async (formData, idDevice) => {
    setStateApi({ ...stateApi, isSending: true });
    const result = await updateDevice(formData, idDevice);

    if (result.data.state == "ok") {
        handleGetDevices();
    }
    
    setStateApi({
      ...stateApi,
      isSending: false,
      message: result.data.message,
      levelNotification: result.data.levelNotification,
    });
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

  return (
    <>
      <View className="bg-gray-light-primary w-full h-screen flex flex-col items-center justify-start mt-10">
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

          <Text>{formik.errors.name}</Text>

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
              <Text className="text-center py-3 text-xl">Actualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

function validationSchema() {
  return {
    name: Yup.string().required("nombre es obligatorio"),
  };
}

function initialValues(device) {
  return {
    name: device.name,
    description: device.description,
    location: device.location,
  };
}
