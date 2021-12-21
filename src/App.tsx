import React from 'react';
import {createGlobalStyle} from "styled-components";
import {BrowserRouter, Routes} from "react-router-dom";
import {Nav} from "./components/nav/Nav";

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  html {
    box-sizing: border-box;
    font-size: 62.5%;
    width: 100%;
    height: 100%;
  }
  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    letter-spacing: 1.5px;
  }
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <BrowserRouter>
                <Nav />
                <Routes>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
