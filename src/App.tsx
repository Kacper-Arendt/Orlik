import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Urls, Nav, device, PrivateRoute} from "./components/Components";
import {Auth, UserProfile} from "./components/Routes";

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
    
  @media${device.laptop} {
    font-size: 71.25%;
  } @media${device.laptopL} {
    font-size: 81.25%;
  }
  }

  body {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
    letter-spacing: 1.5px;
  }
  
  :root{
    --max-width: 100rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

function App() {
    return (
        <Wrapper>
            <GlobalStyle/>
            <HashRouter>
                <Nav/>
                <Routes>
                    <Route path={Urls.auth} >
                        <Route index element={<Auth/>}/>
                        <Route path={Urls.profile} element={<PrivateRoute children={<UserProfile/>} />}/>
                    </Route>
                </Routes>
            </HashRouter>
        </Wrapper>
    );
}

export default App;
