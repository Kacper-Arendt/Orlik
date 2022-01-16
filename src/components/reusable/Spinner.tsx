import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin: 5rem auto;
    width: 15rem;
    height: 14rem;
    text-align: center;
  z-index: 100;

  div {
    background-color: #000;
    height: 100%;
    width: 6px;
    display: inline-block;
    margin: 0 .2rem;

    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    
    :nth-child(2) {
      -webkit-animation-delay: -1.1s;
      animation-delay: -1.1s;
    }

    :nth-child(3) {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    :nth-child(4) {
      -webkit-animation-delay: -0.9s;
      animation-delay: -0.9s;
    }

    :nth-child(5) {
      -webkit-animation-delay: -0.8s;
      animation-delay: -0.8s;
    }
  }

  @-webkit-keyframes sk-stretchdelay {
    0%, 40%, 100% { -webkit-transform: scaleY(0.4) }
    20% { -webkit-transform: scaleY(1.0) }
  }

  @keyframes sk-stretchdelay {
    0%, 40%, 100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }  20% {
         transform: scaleY(1.0);
         -webkit-transform: scaleY(1.0);
       }
  }
`;

export const Spinner = () => {
    return (
        <Wrapper>
            <div />
            <div />
            <div />
            <div />
            <div />
        </Wrapper>
    )
}
