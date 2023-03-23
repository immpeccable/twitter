import React, { useEffect, useState } from "react";

export interface I_DEBOUNCE_VALUE_PROPS {
  value: string;
  delay: number;
}

export default function useDebounceValue({
  value,
  delay,
}: I_DEBOUNCE_VALUE_PROPS) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debounceValue;
}
