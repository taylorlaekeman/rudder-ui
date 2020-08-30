import { useEffect, useState } from 'react';

function useDebounce(value: string | number, delay: number): string | number {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return debouncedValue;
}

export default useDebounce;
