import React from 'react';
import styled, {createGlobalStyle} from "styled-components";
import {HashRouter, Route, Routes} from "react-router-dom";
import {Urls, Nav, device, PrivateRoute} from "./components/Components";
import {
    AddFacility,
    Auth,
    EditFacility,
    Facilities,
    UserProfile,
    FacilitiesList,
    EditList,
    EditPanel
} from "./components/Routes";

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

  :root {
    --max-width: 100rem;
    --color-submit: #168039;
    --color-reset: #D90B1C;
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
                    <Route path={Urls.auth}>
                        <Route index element={<Auth/>}/>
                        <Route path={Urls.profile} element={<PrivateRoute children={<UserProfile/>}/>}/>
                    </Route>
                    <Route path={Urls.facilities} element={<PrivateRoute children={<Facilities/>}/>}>
                        <Route index element={<PrivateRoute children={<FacilitiesList/>}/>}/>
                        <Route path={Urls.addFacility} element={<PrivateRoute children={<AddFacility/>}/>}/>
                        <Route path={Urls.edit} element={<PrivateRoute children={<EditFacility/>}/>}>
                            <Route index element={<PrivateRoute children={<EditList/>}/>}/>
                            <Route path=':id' element={<PrivateRoute children={<EditPanel/>}/>}/>
                        </Route>
                    </Route>
                </Routes>
            </HashRouter>
        </Wrapper>
    );
}

export default App;
