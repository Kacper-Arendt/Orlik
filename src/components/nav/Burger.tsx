import React from "react";
import styled from "styled-components";
import {device} from "../../model/Media";

const StyledBurger = styled.button<MenuIProps>`
  grid-area: burger;
  justify-self: end;
  position: relative;

  border: none;
  margin-right: 10%;
  transition: all .3s ease-in-out;
  transform: ${(props: MenuIProps) => props.isOpen && 'rotate(45deg)'};
  z-index: 11;
  background: transparent;

  :before {
    content: "";
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);

    width: 50px;
    height: 50px;
    border: 3px solid transparent;
    transition: all .3s ease-in-out;
    border-radius: 100%;
    border-color: ${(props: MenuIProps) => props.isOpen && '#ecf0f1'};
  }

  div {
    height: 4px;
    margin: 6px auto;
    transition: all .3s ease-in-out;
    background-color: black;

    width: ${(props: MenuIProps) => props.isOpen ? '30px' : '30px'};

    :first-child {
      transform: ${(props: MenuIProps) => props.isOpen && 'translateY(10px)'};
    }

    :nth-child(2) {
      opacity: ${(props: MenuIProps) => props.isOpen ? '0' : '1'};
    }

    :nth-child(3) {
      transform: ${(props: MenuIProps) => props.isOpen && 'translateY(-10px) rotate(90deg)'};
    }
  }
}

@media${device.tablet}{
  display: none;
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