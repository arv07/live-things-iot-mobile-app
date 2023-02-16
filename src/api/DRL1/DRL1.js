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


export async function changeStateRelay(state, idDevice) {
    try {
      //console.log(data.email);
      const result = await Api.post("api/relayEvent/store", {
        state: state,
        id_device: idDevice
      });
      return result.data;
    } catch (error) {
      console.log(error);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }


  export async function getStateRelay(idDevice) {
    try {
      //console.log(data.email);
      const result = await Api.get("api/relay/"+idDevice);
      return result.data;
    } catch (error) {
      console.log(error);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }


  export async function getEvents(idDevice) {
    try {
      //console.log(data.email);
      const result = await Api.get("api/relayEvent/"+idDevice);
      //console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }



  export async function changeStateMovementSensor(state, idDevice) {
    try {
      //console.log(data.email);
      const result = await Api.post("api/movement/update/"+idDevice, {
        state: state,
      });
      return result.data;
    } catch (error) {
      console.log(error);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }


  export async function getStateMovementSensor(idDevice) {
    try {
      //console.log(data.email);
      const result = await Api.get("api/movement/"+idDevice);
      //console.log(result);
      return result.data;
    } catch (error) {
      console.log(error);
      /* if (error.message == "Network Error") {
          alert(error.message);
        }
        else{
          return error.response;
        } */
    }
  }