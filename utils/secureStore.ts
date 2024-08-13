import * as SecureStore from 'expo-secure-store';

export async function saveToSecureStore(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
}

export async function deleteFromSecureStore(key: string) {
    await SecureStore.deleteItemAsync(key)
}

export async function getFromSecureStore(key: string) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}
