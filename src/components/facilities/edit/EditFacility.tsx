import React from "react";
import styled from "styled-components";
import {Outlet} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const EditFacility = () => {
    return (
        <Wrapper>
            <Outlet/>
        </Wrapper>
    )
}