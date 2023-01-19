import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { storeAuthToken } from "../auth/keyStorage";
import { getAuthToken } from "../auth/keyStorage";
import { useNavigation } from '@react-navigation/native';
import React, {useState, useEffect} from "react";
import FormNotification from "../components/utils/FormNotification";
import Loader from "../components/utils/Loader";
import { login, getUserInfo } from "../auth/auth";
import { test } from "../auth/auth";

export default function LoginPage() {
  const navigation = useNavigation();
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
      handleLogin(formData);
      //console.log(formData);
    },
  });
  
  const handleLogin = async (formData) => {
    //console.log(formData);
    setStateApi({ ...stateApi, isSending: true });
    const result = await login(formData);
    //console.log(result.data);
    if(result.data.state == 'ok')
    {
      await storeAuthToken('AUTH_TOKEN', result.data.access_token);
      setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });
    }
    else{
      setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });
    }

  };

  const getToken = async () => {
    //console.log(await getAuthToken())
    //await test();
    const result = await getUserInfo();
    console.log(result.data);
    if(result.data)
    {
      navigation.navigate('DevicesScreen');
    }
  }

  return (
    <View className="bg-green-primary w-full h-screen flex flex-col items-center justify-center">
      
        <View className=" bg-gray-light-primary w-11/12 h-auto rounded-md max-w-lg ">
          <View></View>
          <Text className="text-4xl text-center py-5">Ingreso</Text>
          <View className="flex flex-col justify-items-start h-auto w-full items-center justify-start content-center self-center">
            <TextInput
              placeholder="email"
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              autoCapitalize="none"
              value={formik.values.email}
              onChangeText={(text) => formik.setFieldValue("email", text)}
            />
            <TextInput
              placeholder="contraseña"
              className="bg-gray-light-secundary h-12 rounded-md w-11/12 px-5 my-2 focus:border-1 focus:border-green-primary/70 focus:outline-none border-2 border-green-primary/40"
              //secureTextEntry={true}
              autoCapitalize="none"
              value={formik.values.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
            />
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
          <Text onPress={getToken}>get token</Text>
          <View className="flex-2 justify-center items-center py-3 w-full">
            <Text
              onPress={() => navigation.navigate("Signup")}
              className="text-center border-b"
            >
              Registrarse
            </Text>
          </View>
        </View>

        <View className="w-full flex justify-end items-center mt-2  mb-5 " >
          <Text className="text-white-primary mb-3">Desarrollado Por:</Text>
        <Image source={require("../assets/img/industriacode2.png")} style={{width:50, height:50, resizeMode: 'center',}}/>
        </View>
      
    </View>
  );
}


function validationSchema() {
  return {
    email: Yup.string().required("email obligatorio"),
    password: Yup.string().required("contraseña bligatorio"),
  };
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}
