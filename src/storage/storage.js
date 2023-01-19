import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value) {
    try {
      console.log(key);
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      // saving error
    }
  }

  export async function getData(key) {
    try {
      //'AUTH_TOKEN'
      console.log(key);
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
  }
