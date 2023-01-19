import { View, Text } from 'react-native'
import {useEffect, useState} from 'react'
import { SocketContext } from '../service/socket';

export const useSocket = () => {
    const socket = useContext(SocketContext);
    const [stateSocket, setStateSocket] = useState(false);
  
    useEffect(() => {
  
      socket.on("connect", () => {
        console.log("Socket ID: " + socket.id);
        const token = localStorage.getItem("token");
        setTimeout(function () {
          setStateSocket(true);
          console.log("Connectado");
          //getSocketConnections();
        }, 3000);
      });
  
    }, []);
  
    return {
      stateSocket
    }
  };