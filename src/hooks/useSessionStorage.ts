import { useState } from "react";

type SetValue<T> = (value: T) => void;
type RemoveValue = () => void;

function useSessionStorage<T>(
  key: string,
  initialValue: T
): [T, SetValue<T>, RemoveValue] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  const setValue: SetValue<T> = (value) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    }
  };

  const removeValue: RemoveValue = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(key);
      setStoredValue(undefined as unknown as T);
    }
  };

  return [storedValue, setValue, removeValue];
}

export default useSessionStorage;
