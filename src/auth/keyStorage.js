import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeAuthToken(key, value) {
    try {
      console.log(key);
      await AsyncStorage.setItem('AUTH_TOKEN', value)
    } catch (e) {
      // saving error
    }
  }

  export async function getAuthToken(key) {
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


  