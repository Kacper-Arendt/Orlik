import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button<MenuIProps>`
  grid-area: burger;
  justify-self: end;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  
  padding-right: 5%;
  height: 3.5rem;
  background: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  div {
    width: 3.5rem;
    height: .35rem;
    border-radius: 10px;
    transition: all .35s linear;
    transform-origin: 1px;
    background-color: black;

    :first-child {
      transform: ${(props: MenuIProps) => props.isOpen ? 'rotate(45deg) ' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${(props: MenuIProps) => props.isOpen ? '0' : '1'};
    }

    :nth-child(3) {
      transform: ${(props: MenuIProps) => props.isOpen ? 'rotate(-45deg) ' : 'rotate(0)'};
    }
  }
}
`;

export interface MenuIProps {
    isOpen: boolean,
    setIsOpen?: () => void,
}

export const Burger = (props: MenuIProps) => {
    return (
        <StyledBurger isOpen={props.isOpen} onClick={props.setIsOpen}>
            <div/>
            <div/>
            <div/>
        </StyledBurger>
    )
}