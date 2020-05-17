import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

import AppContainer from './components/layout/AppContainer';
import Nabvar from './components/layout/Navbar';

import themeObject from './theme';
import Landing from './components/containers/Landing';
import AppWrapper from './components/layout/AppWrapper';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Raleway', sans-serif;
    font-size: 1.5rem;
    line-height: 1.6;
    background-color: ${({ theme }) => theme.darkestGrey};
    color: ${({ theme }) => theme.primaryColor};
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }

  img {
    width: 100%;
  }
`;

const App = () => (
  <ThemeProvider theme={themeObject}>
    <Router>
      <AppContainer>
        <Nabvar />
        <GlobalStyle />
        <Switch>
          <AppWrapper as="main">
            <Route exact path="/" component={Landing} />
          </AppWrapper>
        </Switch>
      </AppContainer>
    </Router>
  </ThemeProvider>
);

export default App;
