import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeDataStorage(key, value) {
  try {
    //console.log(key);
    //const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
}

export async function getDataStorage(key) {
  try {
    //'AUTH_TOKEN'
    //console.log(key);
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
}

export async function storeJSONDataStorage(key, value) {
  try {
    //console.log(key);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
}

export async function getJSONDataStorage(key) {
  try {
    //'AUTH_TOKEN'
    //console.log(key);
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
  }
}
