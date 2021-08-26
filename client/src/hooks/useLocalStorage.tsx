import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const setObserver: { [key: string]: Dispatch<SetStateAction<any>>[] } = {};

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const localValue = localStorage.getItem(key);
  const initValue = localValue ? (JSON.parse(localValue) as T) : initialValue;
  const [value, setValueData] = useState<T>(initValue);

  useEffect(() => {
    // 구독 시작
    if (!setObserver[key]) {
      setObserver[key] = [setValueData];
    } else {
      setObserver[key].push(setValueData);
    }
    // 구독 해제
    return () => {
      setObserver[key].splice(setObserver[key].indexOf(setValueData), 1);
    };
  }, []);

  const setValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setObserver[key].forEach((setValue) => setValue(value));
  };

  return [value, setValue];
}

export default useLocalStorage;
