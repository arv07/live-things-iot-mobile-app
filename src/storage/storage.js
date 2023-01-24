import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeDataStorage(key, value) {
    try {
      //console.log(key);
      //const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }

  export async function getDataStorage(key) {
    try {
      //'AUTH_TOKEN'
      //console.log(key);
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }
    } catch(e) {
      // error reading value
    }
  }
