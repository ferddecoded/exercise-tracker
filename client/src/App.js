import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

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
    background-color: #fff;
    color: #333;
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
  <div>
    <GlobalStyle />
    APP
  </div>
);

export default App;
