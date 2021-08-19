import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const localValue = localStorage.getItem(key);
  const initValue = localValue ? (JSON.parse(localValue) as T) : initialValue;
  const [value, setValueData] = useState<T>(initValue);

  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValueData(value);
  };

  return [value, setValue];
}

export default useLocalStorage;
