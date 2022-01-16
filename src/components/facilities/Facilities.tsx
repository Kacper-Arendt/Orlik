import React from "react";
import styled from "styled-components";
import {BsListOl, BsPencil, BsPlusLg} from "react-icons/bs";
import {Outlet, useNavigate} from "react-router-dom";
import {WrapperStyles} from "../reusable/Css";
import {Urls} from "../Components";

const Wrapper = styled.div`
  ${WrapperStyles};
  margin-bottom: 1rem;
`;

const Nav = styled.div`
  align-self: start;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem 3rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 12rem;
  height: 5rem;
  border-radius: 50px;
  background-color: #eee;
  font-size: 1.2rem;


  p {
    font-weight: 500;
    white-space: nowrap;
  }

  svg {
    color: green;
    font-size: 1.5em;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Facilities = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Nav>
                <NavItem onClick={() => navigate(Urls.facilities)}>
                    <p>All </p>
                    <BsListOl/>
                </NavItem>
                <NavItem onClick={() => navigate(Urls.addFacility)}>
                    <p> Add </p>
                    <BsPlusLg/>
                </NavItem>
                <NavItem onClick={() => navigate(Urls.edit)}>
                    <p> Edit </p>
                    <BsPencil/>
                </NavItem>
            </Nav>
            <Content>
                <Outlet/>
            </Content>
        </Wrapper>
    )
}