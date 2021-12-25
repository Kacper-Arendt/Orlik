import React from "react";
import styled from "styled-components";

const Spinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  z-index: 100;

  div {
    display: inline-block;
    width: 80px;
    height: 80px;

    :after {
      content: " ";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid var(--color-primary);
      border-color: var(--color-primary) transparent;
      animation: lds-dual-ring .7s linear infinite;
    }
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Loader = () => {
    return (
        <Spinner>
            <div/>
        </Spinner>
    )
}