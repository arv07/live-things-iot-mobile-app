import axios from "axios";
import { API_HOST } from "../../utils/constants";
import { getAuthToken } from "../../auth/keyStorage";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

let Api = axios.create({
  baseURL: API_HOST,

});

Api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken('AUTH_TOKEN');
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export async function getFingerprintUsers(idDevice) {
    try {
      //console.log(data.email);
      const result = await Api.get("api/fingeprintUser/"+idDevice);
      return result.data;
    } catch (error) {
      console.log(error);
      alert(error.message);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }


  export async function changeStateFingerprintUser(state, idDevice, idFingerprintUser) {
    try {
      console.log(state);
      console.log(idDevice);
      console.log(idFingerprintUser);
      const result = await Api.post("api/fingeprintUser/changeState", {
        state: state,
        id_device: idDevice,
        id_fingerprint_user: idFingerprintUser
      });
      return result.data;
    } catch (error) {
      console.log(error);
      alert(error.message);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }



  export async function createFingerprintUser(fingerprintUserData, fingerprintUserName, idDevice) {
    try {
      console.log(fingerprintUserData);
      const result = await Api.post("api/fingeprintUser/store", {
        name: fingerprintUserName,
        fingerprint_code: fingerprintUserData.fingerprintCode,
        id_device: idDevice

      });
      return result;
    } catch (error) {
      console.log(error);
      alert(error.message);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }