import { useEffect, useState } from 'react';

const useHasFinished = (isHappening: boolean): boolean => {
  const [hasFinished, setHasFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isHappening) setHasStarted(true);
    if (hasStarted && !isHappening) setHasFinished(true);
  }, [hasStarted, isHappening, setHasStarted, setHasFinished]);

  return hasFinished;
};

export default useHasFinished;
