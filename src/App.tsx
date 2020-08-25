import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import settings from 'settings';
import GlobalStyles from 'styles/GlobalStyle';
import theme from 'styles/theme';
import Rudder from 'views/Rudder';

const client = new ApolloClient({
  uri: `${settings.API_URL}/graphql`,
  cache: new InMemoryCache(),
});

const App: React.FunctionComponent = () => (
  <Auth0Provider
    clientId={settings.AUTH_CLIENT}
    domain={settings.AUTH_DOMAIN}
    redirectUri={settings.AUTH_REDIRECT}
  >
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Rudder />
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  </Auth0Provider>
);

export default App;
