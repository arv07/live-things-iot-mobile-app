import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function ItemList3({ title, value, onPress }) {
  return (
    <>
    <View className="flex flex-row items-center justify-start w-full h-20 bg-white-primary ">
      <View className="flex h-20 w-auto px-5 justify-center rounded-md bg-white-primary">
        <Text className="text-xs font-light">{title}</Text>
        <Text className="text-xl font-light">{value}</Text>
      </View>
      
        <TouchableOpacity
        onPress={() => onPress()}
        className="flex justify-center items-center bg-green-primary w-20 h-10 rounded-full">
            <Text className="text-center text-xs font-light text-white-primary">
                Copiar
              </Text>
        </TouchableOpacity>
      
    </View>
  </>
  )
}