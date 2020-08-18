import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
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
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Rudder />
      </ThemeProvider>
    </Router>
  </ApolloProvider>
);

export default App;
