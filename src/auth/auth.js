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
    const token = await getAuthToken("AUTH_TOKEN");
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
    console.log(data);
    const result = await Api.post("api/userMobile/create", {
      name: data.name,
      last_name: data.lastname,
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
    if (error.response) {
      console.log("auth.js line  64");
    }
    

    /* if (error.message == "Network Error") {
        alert(error.message);
      }
      else{
        return error.response;
      } */
  }
}

export async function logout() {
  try {
    //const result = await Api.get("api/userMobile/infouser", { headers: {Authorization : `Bearer 13|G3SH3DcrvQi8zHca2zm2umJcRaOy9oNthW8bYv9C`} });
    const result = await Api.get("api/user/logout");
    //console.log(result);
    if (result.status == 200) {
      return result;
    } else {
      throw new InternalError("error en consulta: " + result.status);
    }
  } catch (error) {
    if (error.response) {
      let result = {};
      console.log("auth.sj Linea 87");
      console.log(error.message);
      
      return { result: { data: "error" } };
    }
    else{
      alert(error);
    }

  }
}


export async function userIsAuthenticated() {
  try {
    //const result = await Api.get("api/userMobile/infouser", { headers: {Authorization : `Bearer 13|G3SH3DcrvQi8zHca2zm2umJcRaOy9oNthW8bYv9C`} });
    const result = await Api.get("api/user/isAuthenticated");
    //console.log(result);
    if (result.status == 200) {
      return result;
    } else {
      throw new InternalError("error en consulta: " + result.status);
    }
  } catch (error) {
    if (error.response) {
      let result = {};
      console.log("auth.sj Linea 87");
      console.log(error.message);
      
      return { result: { data: "error" } };
    }
    else{
      alert(error);
    }

    //return error.response;

    //console.log(error.response.status);
    /* if (error.message == "Network Error") {
        alert(error.message);
      }
      else{
        return error.response;
      } */
  }
}



export async function getAuthenticatedUser() {
  try {
    //const result = await Api.get("api/userMobile/infouser", { headers: {Authorization : `Bearer 13|G3SH3DcrvQi8zHca2zm2umJcRaOy9oNthW8bYv9C`} });
    const result = await Api.get("api/user/getAuthenticatedUser");
    //console.log(result);
    if (result.status == 200) {
      return result;
    } else {
      throw new InternalError("error en consulta: " + result.status);
    }
  } catch (error) {
    if (error.response) {
      let result = {};
      console.log("auth.sj Linea 87");
      console.log(error.message);
      
      return { result: { data: "error" } };
    }
    else{
      alert(error);
    }

  }
}
