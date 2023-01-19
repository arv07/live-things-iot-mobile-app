import { View, Text } from 'react-native'
import React from 'react'

export default function FormNotification({ message = "", levelNotification = 1}) {
    if (levelNotification == 1) {
        return (
          <View className="bg-green-secundary/40 w-4/5 rounded-md">
            <Text className="px-3 py-3 text-green-primary">
              <Text className="text-green-primary font-semibold">OK: </Text>
              {message}
            </Text>
          </View>
        );
      } else if (levelNotification == 2) {
        return (
          <View className="bg-red-primary/40 w-4/5 rounded-md">
          <Text className="px-3 py-3 text-green-primary">
            <Text className="text-green-primary font-semibold">Error: </Text>
            {message}
          </Text>
        </View>
        )
        
      }
}