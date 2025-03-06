import AsyncStorage from "@react-native-async-storage/async-storage";

const getAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error(error);
  }
};

const setAsyncStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(error);
  }
};

const removeAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};

const useCustomStorage = () => {
  return {
    getAsyncStorage,
    setAsyncStorage,
    removeAsyncStorage,
  };
};

export default useCustomStorage;
