import React, {useState} from "react";
import styled from "styled-components";
import {Burger} from "./Burger";
import {Link} from "react-router-dom";

const StyledNav = styled.header`
  position: sticky;
  left: 0;
  right: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content min-content;
  grid-template-areas: 
      'logo burger'
      'menu menu';
  padding-top: 1rem;

  h1 {
    grid-area: logo;
    padding-left: 5%;
    font-size: 2.5em;
  }
`;
const Menu = styled.nav<{ isOpen: boolean }>`
  grid-area: menu;
  position: fixed;
  top: 5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 1rem;

  width: 100%;
  height: ${props => props.isOpen ? '10rem' : 0};
  border-bottom: 1px solid black;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: opacity .75s, visibility .75s, height .35s;

  background-color: #fff;
`;

const StyledLink = styled(Link)<{isOpen: boolean}>`
  display: ${props => props.isOpen ? 'block' : 'none'};
  text-decoration: none;
  color: black;
  white-space: nowrap;
  font-size: 1.5em;
`;

export const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledNav>
            <h1>Orlik</h1>
            <Burger isOpen={isOpen} setIsOpen={toggleMenuHandler}/>
            <Menu isOpen={isOpen}>
                <StyledLink isOpen={isOpen} to='/'>Sign In</StyledLink>
                <StyledLink isOpen={isOpen} to='/'>Sign Up</StyledLink>
                <StyledLink isOpen={isOpen} to='/'>Facilities</StyledLink>
            </Menu>
        </StyledNav>
    )
}