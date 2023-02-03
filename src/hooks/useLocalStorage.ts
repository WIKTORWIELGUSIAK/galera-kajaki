/** @format */

import React, { useState } from "react";

type UseLocalStorageReturnType = [unknown, (value: unknown) => void];

function useLocalStorage(
  key: string,
  initialValue: unknown
): UseLocalStorageReturnType {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
