import React, {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import {device, Loader} from "../Components";

const Message = styled.div<{ type: string }>`
  position: fixed;
  top: 2rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 100;
  max-width: 30rem;
  border-radius: 5px;
  background-color: ${props => props.type === 'error' ? 'rgb(200, 50, 100)' : 'green'};

  p {
    font-size: 1.5rem;
    font-weight: 500;
    color: #ECEFF1;
    padding: 2rem;
  }

  div {
    width: 100%;
    height: 5px;
    margin-bottom: auto;
    background-color: orange;
    animation: ${props => props.type && 'timer 2.8s linear'};
  }

  @keyframes timer {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }

@media${device.tablet} {
  top: unset;
  bottom: 2rem;
  right: 1rem;
}
`;

interface IProps {
    children: ReactNode,
    isLoading: boolean,
    message?: IMessage | null
}

export interface IMessage {
    type: 'error' | 'success',
    message: string
}

export const WithLoading = (props: IProps) => {
    const [message, setMessage] = useState<IMessage | null>(null);

    useEffect(() => {
        if (props.message) {
            setMessage(props.message);

            setTimeout(() => {
                setMessage(null);
            }, 3000);
        }
    }, [props.message]);

    return (
        <>
            {message && <Message type={props.message!.type}>
                <div/>
                <p>{message.message}</p></Message>}
            {props.isLoading && <Loader/>}
            {props.children}
        </>
    )
};