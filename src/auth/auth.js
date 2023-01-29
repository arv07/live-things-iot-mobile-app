import axios from "axios";
import { API_HOST } from "../utils/constants";
import { getAuthToken } from "./keyStorage";

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
};

let to = "";

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


export async function createUser(data) {
  try {
    console.log(data.email);
    const result = await Api.post("api/userMobile/create", {
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    });
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

export async function login(data) {
  try {
    //console.log("Linea 41 ------------------");
    //console.log(data.email);
    const result = await Api.post("api/userMobile/login", {
      email: data.email,
      password: data.password,
    });
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

export async function userIsAuthenticated() {
  try {
    //Api.defaults.withCredentials = true;
    //console.log(Api.defaults);
    //console.log("Linea 41 ------------------");
    //console.log(data.email);
    //const result = await Api.get("api/userMobile/infouser", { headers: {Authorization : `Bearer 13|G3SH3DcrvQi8zHca2zm2umJcRaOy9oNthW8bYv9C`} });
    const result = await Api.get("api/user/isAuthenticated");
    return result;
  } catch (error) {
    return error.response;
    console.log(error.response.status);
    /* if (error.message == "Network Error") {
        alert(error.message);
      }
      else{
        return error.response;
      } */
  }
}
