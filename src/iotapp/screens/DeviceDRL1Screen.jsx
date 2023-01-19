import { View, Text, Switch } from 'react-native'
import React, {useState, useContext} from 'react'
import { SocketContext } from '../../service/socket';
import { useNavigation, Route } from '@react-navigation/native'; // <-- new code

export default function DevicesDRL1Screen({route}) {
  const socket = useContext(SocketContext);
  const {name} = route.params;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    console.log(isEnabled);
    let value = isEnabled ? '1' : '0';
    socket.emit("USER:changeStateDRL1", {
      state: value,
      tokenUser: '930d9bf891352d14b3c8863ba1c34e30eaae17fa6ee0173addbed42588c8',
      idDeviceByUser: 1,
    });
    setIsEnabled(previousState => !previousState);
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