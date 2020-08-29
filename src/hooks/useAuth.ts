import { useAuth0 } from '@auth0/auth0-react';

import settings from 'settings';

const useAuth = (): {
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
    //const token = await getAccessTokenSilently({ audience: 'https://api.rudder.to/api/v2' });
    //const token = await getAccessTokenSilently({ audience: 'https://rudder.us.auth0.com/api/v2' });
    const token = await getAccessTokenSilently();
    console.log(token);
    storeToken(token);
  };

  return {
    isAuthenticated,
    login,
    logout,
    saveToken,
  };
};

export default useAuth;
