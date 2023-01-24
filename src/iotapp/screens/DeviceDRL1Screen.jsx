import { View, Text, Switch } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'
import { SocketContext } from '../../service/socket';
import { useNavigation, Route } from '@react-navigation/native'; // <-- new code
import { changeStateRelay } from '../../api/DRL1/DRL1';
import { getDataStorage } from '../../storage/storage';
import { getStateRelay } from '../../api/DRL1/DRL1';

export default function DevicesDRL1Screen({route}) {
  const socket = useContext(SocketContext);
  const {name, idDevice} = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = async () => {
    console.log(isEnabled);
    let value = isEnabled ? '0' : '1';
    setIsEnabled(previousState => !previousState);
    const result = await changeStateRelay(value, idDevice);
    console.log(result);
    const token = await getDataStorage('USER_TOKEN');
    console.log(token);
    socket.emit("USER:changeStateDRL1", {
      state: value,
      tokenUser: token,
      idDevice: idDevice,
    });

    
  }


  useEffect(() => {
    console.log(idDevice);
    handleGetStateRelay();

  
  }, [])

  const handleGetStateRelay = async () => {
    const result = await getStateRelay(idDevice);
    if(result.state == 'ok')
    {
      setIsEnabled(result.data.state == 0 ? false : true);
    }
    console.log(result);
  }
  
  
  return (
    <>
    <View className="flex-1 items-center h-full w-full bg-gray-light-primary overflow-hidden pb-2">
      <View className="flex flex-col items-center justify-center w-full h-[calc(100vh-46vh)]">
        <View className="flex items-center justify-center bg-green-primary/10 w-44 h-44 rounded-full mb-5">
          <View className={`flex items-center justify-center  w-32 h-32 rounded-full ${isEnabled ? 'bg-yellow-primary' : 'bg-green-primary'}`}>
            <Text className={`text-2xl font-thin ${isEnabled ? 'text-green-primary' : 'text-yellow-primary'}`}>{isEnabled ? 'ON' : 'OFF'}</Text>
          </View>
        </View>
        <Text>{name}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#FFC301" }}
          thumbColor={isEnabled ? "#bdc3c7" : "#bdc3c7"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
    </>
  )
}