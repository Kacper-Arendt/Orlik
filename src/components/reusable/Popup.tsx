import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  
  background-color: rgba(0,0,0, .7);
`;


interface IPopup {
    children: JSX.Element,
}

export const Popup = (props: IPopup) => {
    return (
        <Wrapper>
                {props.children}
        </Wrapper>
    )
}