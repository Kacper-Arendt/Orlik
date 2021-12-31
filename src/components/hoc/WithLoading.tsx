import React, {ReactNode, useEffect, useState} from "react";
import styled from "styled-components";
import { Loader } from "../Components";

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 100;
  width: 100%;
  height: 6rem;
  background-color: rgb(200, 50, 100);

  p {
    font-size: 1.5rem;
    font-weight: bold;
  }
;
`;

interface IProps {
    children: ReactNode,
    isLoading: boolean,
    error: string,
}

export const WithLoading = (props: IProps) => {
    const [error, setError] = useState<string>('');

    useEffect(() => {
        setError(props.error);

        setTimeout(() => {
            setError('');
        }, 5000);
    }, [props.error])

    return (
        <>
            {error.length > 1 && <Popup><p>{error}</p></Popup>}
            {props.isLoading && <Loader/>}
            {props.children}
        </>
    )
};