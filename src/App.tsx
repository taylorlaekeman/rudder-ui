import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Auth0Provider } from '@auth0/auth0-react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import useAuth from 'hooks/useAuth';
import settings from 'settings';
import GlobalStyles from 'styles/GlobalStyle';
import theme from 'styles/theme';
import Rudder from 'views/Rudder';

const App: FunctionComponent = () => (
  <Auth0Provider
    audience={settings.AUTH_AUDIENCE}
    clientId={settings.AUTH_CLIENT}
    domain={settings.AUTH_DOMAIN}
    redirectUri={settings.AUTH_REDIRECT}
  >
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthenticatedApp />
    </ThemeProvider>
  </Auth0Provider>
);

const AuthenticatedApp: FunctionComponent = () => {
  const [token, setToken] = useState('');
  const { isAuthenticated, saveToken } = useAuth();

  useEffect(() => {
    if (isAuthenticated) saveToken(setToken);
    else setToken('');
  }, [isAuthenticated, saveToken, setToken]);

  if (!isAuthenticated || !token)
    return (
      <Router>
        <Rudder />
      </Router>
    );

  const client = getClient(token);

  return (
    <ApolloProvider client={client}>
      <Router>
        <Rudder isAuthenticated token={token} />
      </Router>
    </ApolloProvider>
  );
};

const getClient = (token: string) => {
  return new ApolloClient({
    link: getAuthLink(token).concat(httpLink),
    cache: new InMemoryCache(),
  });
};

const getAuthLink = (token: string) =>
  setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

const httpLink = createHttpLink({
  uri: `${settings.API_URL}/graphql`,
});

export default App;
