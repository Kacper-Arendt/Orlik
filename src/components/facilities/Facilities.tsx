import React from "react";
import styled from "styled-components";
import {IoMdAdd} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {Urls} from "../../model/Urls";
import {WrapperStyles} from "../reusable/Css";

const Wrapper = styled.div`
  ${WrapperStyles};
`;

const Nav = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
  padding: 2rem 3rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 15rem;
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
    font-size: 2em;
  }
`;


export const Facilities = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Nav>
                <NavItem onClick={() => navigate(Urls.addFacility)}>
                    <p> Add Facility</p>
                    <IoMdAdd/>
                </NavItem>
            </Nav>
        </Wrapper>
    )
}