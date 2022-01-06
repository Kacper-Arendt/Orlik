import React from "react";
import styled from "styled-components";
import {IoMdAdd} from "react-icons/io";
import {useNavigate} from "react-router-dom";
import {Urls} from "../../model/Urls";

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: start;


  width: 100%;
  max-width: var(--max-width);
  margin-top: 10rem;
  padding: 0 2rem;
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
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
  
  
  p{
    font-weight: 500;
    white-space: nowrap;
  }
  
  svg{
    color: green;
    font-size: 2em;
  }
`;


export const Facilities = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Nav>
                <NavItem onClick={()=> navigate(Urls.addFacility)}>
                    <p> Add Facility</p>
                    <IoMdAdd/>
                </NavItem>
            </Nav>
        </Wrapper>
    )
}