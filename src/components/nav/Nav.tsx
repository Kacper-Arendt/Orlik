import React, {useState} from "react";
import styled from "styled-components";
import {Burger} from "./Burger";
import {Link} from "react-router-dom";
import {device} from "../../model/Media";
import {Urls} from "../../model/Urls";
import {useAppSelector} from "../../redux/Hooks";
import {Profile} from "./Profile";

const StyledNav = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  width: 100vw;
  max-width: var(--max-width);

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content;
  grid-template-areas: 
      'logo burger';
  padding-top: 1.5rem;
  z-index: 50;

  h1 {
    grid-area: logo;
    padding-left: 10%;
    font-size: 2.5em;
  }

@media${device.tablet} {
  grid-template-columns: repeat(2, min-content);
  justify-content: space-between;

  left: 50%;
  transform: translateX(-50%);
}
`;
const Menu = styled.nav<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  row-gap: 2rem;

  width: 75%;
  transform: ${props => props.isOpen ? 'translateX(35%)' : 'translateX(165%)'};
  padding: 6.5rem 0 3rem;
  transition: transform 0.3s ease-in-out;
  z-index: 10;
  background: rgba(0, 0, 0, .75);

@media${device.tablet} {
  grid-area: burger;
  position: static;

  flex-direction: row;
  justify-content: end;
  column-gap: 2rem;
  width: 100%;
  padding: 0 2rem 1rem 4rem;
  transform: translateX(0);
  background: none;
}
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #eee;

  white-space: nowrap;
  font-size: 2.3rem;
  font-weight: 500;

@media${device.tablet} {
  font-size: 1.6rem;
  font-weight: 400;
  color: #333;
}
`;

export const Nav = () => {
    const {user} = useAppSelector(state => state);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenuHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <StyledNav>
            <h1>Orlik</h1>
            <Burger isOpen={isOpen} setIsOpen={toggleMenuHandler}/>
            <Menu isOpen={isOpen} onClick={toggleMenuHandler}>
                {user.id ?
                    <StyledLink to={`${Urls.auth}/${Urls.profile}`}>
                        <Profile name={user.name} photo={user.photo}/>
                    </StyledLink>
                    :
                    <StyledLink to={Urls.auth}>Auth</StyledLink>
                }
            </Menu>
        </StyledNav>
    )
}