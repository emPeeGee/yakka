import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: do I need these funcs ?
export async function getItem<T>(key: string): T {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log('Done.');
}

export async function setItem<T>(key: string, value: T) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // save error
  }

  console.log('Done.');
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
  }

  console.log('Done.');
}
