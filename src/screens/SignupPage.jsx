import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUser } from "../auth/auth";
import FormNotification from "../components/utils/FormNotification";
import Loader from "../components/utils/Loader";

export default function SignupPage({ navigation }) {
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
      handleCrateUser(formData);
      //console.log(formData);
    },
  });

  const handleCrateUser = async (formData) => {
    setStateApi({ ...stateApi, isSending: true });
    const result = await createUser(formData);
    console.log(result.data);
    if ((result.data.state = "ok")) {
      setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });
    } else {
      setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });
    }
    /* console.log(result.status);
    console.log(result.data);
    console.log(result.data.access_token); */
  };

  const handleInputOnChange = (text) => {
    //console.log(target);
    //console.warn(target);

    console.log(target);
    //window.webViewBridge.send("console", target);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.aligment}
        scrollEnabled={true}
      >
        <View className=" bg-gray-light-primary w-11/12 h-auto rounded-md max-w-lg ">
          <View></View>
          <Text className="text-4xl text-center py-5">Registro</Text>
          <View className="flex flex-col justify-items-start h-auto w-full items-center justify-start content-center self-center">
            <TextInput
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              placeholder="Nombre"
              autoCapitalize="none"
              value={formik.values.name}
              onChangeText={(text) => formik.setFieldValue("name", text)}
            />
            <TextInput
              placeholder="Apellido"
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              autoCapitalize="none"
              value={formik.values.lastname}
              onChangeText={(text) => formik.setFieldValue("lastname", text)}
            />
            <TextInput
              placeholder="Email"
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              autoCapitalize="none"
              value={formik.values.email}
              onChangeText={(text) => formik.setFieldValue("email", text)}
            />
            <TextInput
              placeholder="Contraseña"
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              secureTextEntry={true}
              autoCapitalize="none"
              value={formik.values.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
            />
            <TextInput
              placeholder="Confirmar Contraseña"
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
            />
            <Text>{formik.errors.name}</Text>
            <Text>{formik.errors.lastname}</Text>
            <Text>{formik.errors.email}</Text>
            <Text>{formik.errors.password}</Text>
            {stateApi.isSending == true ? <Loader /> : ""}
            {stateApi.message != "" ? (
              <FormNotification
                message={stateApi.message}
                levelNotification={stateApi.levelNotification}
              />
            ) : (
              ""
            )}
            <TouchableOpacity
              onPress={formik.handleSubmit}
              title="Registrarse"
              className="bg-yellow-primary w-11/12  h-14 my-5 rounded-md font-fw-thin text-xl "
            >
              <Text className="text-center py-3 text-xl">Registrarse</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-2 justify-center items-center py-3 w-full">
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              className="text-center border-b"
            >
              Ingresar
            </Text>
          </View>
        </View>

        <View className="w-full flex justify-end items-center mt-2  mb-5 ">
          <Text className="text-white-primary mb-3">Desarrollado Por:</Text>
          <Image
            source={require("../assets/img/industriacode2.png")}
            style={{ width: 50, height: 50, resizeMode: "center" }}
          />
        </View>
      </ScrollView>
    </>
  );
}

function validationSchema() {
  return {
    name: Yup.string().required("nombre obligatorio"),
    lastname: Yup.string().required("apellido obligatorio"),
    email: Yup.string().required("email obligatorio"),
    password: Yup.string().required("contraseña bligatorio"),
  };
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  aligment: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    //marginBottom: 5,
    backgroundColor: "#001D3D",
  },
});
