// src/storage/asyncStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores a value in AsyncStorage after converting it to a JSON string.
 * Uses generics to be type-safe.
 * @param key - The key to store the data under.
 * @param value - The value to store.
 */
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data:', e);
  }
};

/**
 * Retrieves a value from AsyncStorage and parses it from a JSON string.
 * Uses generics to be type-safe.
 * @param key - The key of the data to retrieve.
 * @returns The retrieved data, or null if it doesn't exist or an error occurs.
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
  } catch (e) {
    console.error('Error retrieving data:', e);
    return null;
  }
};