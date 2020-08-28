import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import settings from 'settings';

export const useAuth = (): {
  isAuthenticated: boolean;
  login: { (): void };
  logout: { (): void };
  saveToken: { (storeToken: { (token: string): void }): void };
} => {
  const {
    getAccessTokenSilently,
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({ returnTo: settings.AUTH_REDIRECT });
  };

  const saveToken = async (storeToken: { (token: string): void }) => {
    const token = await getAccessTokenSilently();
    storeToken(token);
  };

  return {
    isAuthenticated,
    login,
    logout,
    saveToken,
  };
};

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
  }, [delay, value]);

  return debouncedValue;
}

export default {
  useAuth,
  useDebounce,
};
