import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getItem<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);

    if (jsonValue !== null) {
      return JSON.parse(jsonValue) as T;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.warn(`Error reading AsyncStorage key '${key}':`, error);
    return null;
  }
}

export async function setItem<T>(key: string, value: T) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.warn(`Error setting AsyncStorage key '${key}':`, error);
  }
}

export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing AsyncStorage key '${key}':`, error);
  }
}
