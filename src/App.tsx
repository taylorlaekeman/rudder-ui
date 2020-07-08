import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import 'App.css';
import logo from 'logo.svg';
import store from 'state';
import theme from 'styles/theme';

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              {'Edit '}
              <code>src/App.tsx</code>
              {' and save to reload.'}
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
