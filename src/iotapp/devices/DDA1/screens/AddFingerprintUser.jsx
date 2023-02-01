import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as Yup from "yup";
import { useFormik } from "formik";
import { SocketContext } from "../../../../service/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useContext } from "react";
import Loader from "../../../../components/utils/Loader";
import FormNotification from "../../../../components/utils/FormNotification";
import { createFingerprintUser } from "../../../../api/DDA1/DDA1";
import { useNavigation } from "@react-navigation/native";

export default function AddFingerprintUser({ route }) {
  const socket = useContext(SocketContext);
  const navigation = useNavigation();
  const { device } = route.params;
  const [stateApi, setStateApi] = useState({
    isSending: false,
    status: "",
    message: "a",
    levelNotification: "",
  });
  const [changeDeviceMode, setChangeDeviceMode] = useState(false);
  const [putFingerprint, setPutFingerprint] = useState({
    showGif: false,
    state: "",
  });
  const [fingerprintId, setFingerprintId] = useState("");
  const [fingerprintUserData, setFingerprintUserData] = useState({
    name: "",
    fingerprintCode: "",
  });
  const [fingerprintUserName, setFingerprintUserName] = useState();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: (formData) => {
      setStateApi({ ...stateApi, isSending: true });
      console.log("Linea 37 formData -----------");
      console.log(formData.name);
      setFingerprintUserData({ ...fingerprintUserData, name: formData.name });
      setFingerprintUserName(formData.name);
      AsyncStorage.getItem("USER_TOKEN").then(
        (value) =>
          socket.emit("USER:getSensorMode", {
            tokenUser: value,
            idDevice: device.id_device,
          })
        //setToken(value));
      );

      //console.log(device);
    },
  });

  useEffect(() => {
    socket.on("USER:getSensorMode_r", (data) => {
      setStateApi({ ...stateApi, isSending: false });
      console.log(data);
      if (data.deviceMode == "ENROLL_ENTRY") {
        console.log(" se debe cambiar");
        setChangeDeviceMode(true);
        AsyncStorage.getItem("USER_TOKEN").then(
          (value) =>
            socket.emit("USER:changeSensorMode", {
              tokenUser: value,
              idDevice: device.id_device,
              deviceMode: "ENROLL_FINGERPRINT",
            })
          //setToken(value));
        );
      } else if (data.deviceMode == "ENROLL_FINGERPRINT") {
        setChangeDeviceMode(false);
        setPutFingerprint({
          showGif: true,
          state:
            "Ponga la huella en el dispositivo para registrar. Espere que termine el proceso",
        });
      }
    });

    socket.on("DEVICE:stateEnrollUser", (data) => {
      console.log("Linea 72 ---");
      console.log(data);
      if (data.state == "PUT_FINGERPRINT") {
        setPutFingerprint({
          showGif: true,
          state:
            "Ponga la huella en el dispositivo para registrar. Espere que termine el proceso",
        });
      } else if (data.state == "REMOVE_FIGNERPRINT") {
        setPutFingerprint({
          showGif: true,
          state: "-- Quite la huella --",
        });
      } else if (data.state == "PUT_FIGNERPRINT_AGAIN") {
        setPutFingerprint({
          showGif: true,
          state: "Ponga la huella nuevamente",
        });
      } else if (data.state == "PRINTS_MATCH") {
        setPutFingerprint({
          showGif: false,
          state: "Las huellas coinciden correctamente",
        });
      } else if (data.state == "FINGERPRINT_SAVE") {
        setPutFingerprint({
          showGif: false,
          state: "Usuario Guardado",
        });
      }
    });

    //When sensor has enrolled the fingerprint, it returns the position. Then it must be store in database
    socket.on("DEVICE:fingerprintToEnroll", (d) => {
      console.log("Linea 111 position in sensor");
      console.log(d);
      //setFingerprintId(d.fingerprintId);
      setFingerprintUserData({
        ...fingerprintUserData,
        fingerprintCode: d.fingerprintId,
      });
      //console.log(data);
      AsyncStorage.getItem("USER_TOKEN").then(
        (value) =>
          socket.emit("USER:changeSensorMode", {
            tokenUser: value,
            idDevice: device.id_device,
            deviceMode: "ENROLL_ENTRY",
          })
        //setToken(value));
      );
    });
  }, []);

  const handleCreateFingerprintUser = async () => {
    setStateApi({ ...stateApi, isSending: true });
    const result = await createFingerprintUser(fingerprintUserData, fingerprintUserName ,device.id_device);
    console.log(result);

    if(result.data.state == 'ok')
    {
        alert("Usuario crado correctamente");
        navigation.navigate('DevicesNavigator', {screen: 'DevicesScreen'});
    }

    setStateApi({
        ...stateApi,
        isSending: false,
        message: result.data.message,
        levelNotification: result.data.levelNotification,
      });

  };

  const test = async () => {};

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

          <Text>{formik.errors.name}</Text>

          {stateApi.isSending == true ? <Loader /> : ""}
          {changeDeviceMode == true ? (
            <Image
              source={require("../../../../assets/gif/changing_sensor_mode.gif")}
              style={{ width: 40, height: 40, resizeMode: "center" }}
            />
          ) : (
            ""
          )}
          {changeDeviceMode == true ? (
            <Text className="text-center">
              Estableciendo conexión con el dispositivo
            </Text>
          ) : (
            ""
          )}
          {changeDeviceMode == true ? (
            <View className="flex justify-center items-center w-full">
              <TouchableOpacity
                onPress={formik.handleSubmit}
                title="Registrarse"
                className="bg-yellow-primary w-11/12  h-14 my-5 rounded-md font-fw-thin text-xl "
              >
                <Text className="text-center py-3 text-xl">
                  Continuar Proceso
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            ""
          )}

          {putFingerprint.showGif == false ? (
            ""
          ) : (
            <>
              <Image
                source={require("../../../../assets/gif/fingerprint-scan.gif")}
                style={{ width: 40, height: 40, resizeMode: "center" }}
              />
              <Text>{putFingerprint.state}</Text>
            </>
          )}

          {putFingerprint.state == "Las huellas coinciden correctamente" ? (
            <>
              <Image
                source={require("../../../../assets/icons/check_ok.png")}
                style={{ width: 40, height: 40, resizeMode: "center" }}
              />
              <Text>{putFingerprint.state}</Text>
              <Text
                /* onClick={() =>
                  handleCreateFingerprintUser(
                    data,
                    fingerprintId,
                    idDeviceByUser
                  )
                } */
                onPress={handleCreateFingerprintUser}
                className="bg-yellow-primary w-40 mx-auto h-14 my-2 rounded-md font-fw-thin text-xl text-center py-3 cursor-pointer"
                /* disabled={
                  putFingerprint.state == "El usuario ha sido creado"
                    ? true
                    : false
                } */
              >
                Finalizar
              </Text>
            </>
          ) : (
            ""
          )}

          {putFingerprint.state == "Error en los datos" ? (
            <Text>Error en los datos</Text>
          ) : (
            ""
          )}

          {putFingerprint.state == "El usuario ha sido creado" ? (
            <Text
              //type="input"
              //onClick={handleFinishProcess}
              className="bg-yellow-primary w-40 mx-auto h-14 my-2 rounded-md font-fw-thin text-xl text-center py-3 cursor-pointer"
            >
              Finalizar
            </Text>
          ) : (
            ""
          )}

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
              <Text className="text-center py-3 text-xl">Continuar</Text>
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

function initialValues() {
  return {
    name: "",
  };
}
