import React from "react";
import { io } from "socket.io-client";
import { SOCKET_HOST } from "../utils/constants";


const token = "fdbfce2c1a225fdb311532832b32fabd1c6aa7b51dbdb34b377809b469c9";
export const socket = io(SOCKET_HOST, {
  autoConnect: false,
 
  extraHeaders: {
    //token: token,
    type: "1",
  },
});

export const SocketContext = React.createContext();
