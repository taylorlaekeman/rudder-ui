import { useEffect, useState } from 'react';

export function useDebounce(
  value: string | number,
  delay: number
): string | number {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return debouncedValue;
}

export default {
  useDebounce,
};
