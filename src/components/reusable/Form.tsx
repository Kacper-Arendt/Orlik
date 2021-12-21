import React, {ReactNode} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

interface IProps {
    header: string,
    redirectText: string,
    redirectUrl: string,
    children: ReactNode,
    onSubmit: (e: React.SyntheticEvent) => void
}


export const Form = (props: IProps) => {
    const navigate = useNavigate();
    return (
        <StyledForm onSubmit={props.onSubmit}>
            <h2>{props.header}</h2>
            {props.children}
            <button type='submit'>Submit</button>
            <p>{props.redirectText}</p> <span onClick={() => navigate(props.redirectUrl)}>Click!</span>
        </StyledForm>
    )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1.5rem;

  h2 {
    font-size: 2.5rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 1.4rem;
  }

  input {
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
    padding: .5rem;
  }

  p {
    white-space: nowrap;
    font-size: 1.6rem;
    color: rgba(0, 0, 0, .5);
  }

  span {
    font-weight: 500;
    color: rgba(0, 0, 0, .75);
  }

  button {
    padding: .75rem 1rem;
    outline: none;
    border-radius: 10px;

    font-size: 1.6rem;
    border: 2px solid forestgreen;
    background-color: transparent;
  }
`;