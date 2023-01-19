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


export async function getDevices() {
    try {
      //Api.defaults.withCredentials = true;
      console.log(Api.defaults);
      //console.log("Linea 41 ------------------");
      //console.log(data.email);
      //const result = await Api.get("api/userMobile/infouser", { headers: {Authorization : `Bearer 13|G3SH3DcrvQi8zHca2zm2umJcRaOy9oNthW8bYv9C`} });
      const result = await Api.get("/api/device");
      return result;
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