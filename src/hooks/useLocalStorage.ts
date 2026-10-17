import { useState, type Dispatch, type SetStateAction } from "react";

export default function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
    // Lazy initializer - it executes this function once
    // when it is first called in useState render
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            // if there is an item, parse to JSON
            // if not, use the initial value
            // JSON.parse can't know the stored shape; this trusts it to be a T
            return item ? (JSON.parse(item) as T) : initialValue;
        } catch (err) {
            // error in access to localStorage (browser related)
            console.warn(`useLocalStorage: ${key} not read`, err);
            return initialValue;
        }
    });

    // wrap useState's setter
    // updates state and writes to localStorage
    const setValue = (value: SetStateAction<T>) => {
        try {
            // if the value is a function,
            // first pass it to Function
            // and continue with the returned value
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (err) {
            console.warn(`useLocalStorage: ${key} couldn't write`, err);
        }
    }

    return [storedValue, setValue];
}
