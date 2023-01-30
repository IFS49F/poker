import { SetStateAction, useState } from 'react';

export function usePersistentState<T>(
  key: string,
  initialValue: T
): [T, (valueOrCb: SetStateAction<T>) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const loaded = localStorage.getItem(key);
      return loaded ? JSON.parse(loaded) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  });

  function setPersistentValue(valueOrCb: SetStateAction<T>) {
    try {
      const newValue =
        valueOrCb instanceof Function ? valueOrCb(value) : valueOrCb;
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (e) {
      console.error(e);
    }
  }

  return [value, setPersistentValue];
}

export default usePersistentState;
