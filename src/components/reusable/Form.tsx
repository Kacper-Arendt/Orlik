import React, {ReactNode} from "react";
import styled from "styled-components";
import {device} from "../../model/Media";
const imgUrl = 'https://ik.imagekit.io/kacper/Orlik/Vecteezy-UEFA-Character-R031821_Wp0M6I-md.jpg?updatedAt=1640806620837'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;
  height: 100%;
  font-size: 1.6rem;

  h2 {
    font-size: 1.2em;
  }

  label {
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
    font-size: .7em;
  }

  input {
    width: 18rem;
    outline: none;
    border: 1px solid black;
    border-radius: 3px;
    padding: .5rem;
  }

  button {
    padding: .7rem 2rem;
    border: 1px solid #13aa52;
    border-radius: 5px;

    margin-top: auto;
    box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
    outline: none;
    font-size: .9em;
    color: #fff;
    background-color: #13aa52;
    cursor: pointer;

    :hover {
      box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
    }
  }

  img {
    height: 7rem;
  }

@media${device.tablet} {
  font-size: 2.2rem;
  
  input{
    width: 20rem;
    padding: .75rem;
  }
  
  button{
    padding: 1rem 3rem;
  }
  
  img{
    height: 20rem;
  }
}
`;

interface IProps {
    header: string,
    children: ReactNode,
    onSubmit: (e: React.SyntheticEvent) => void
}

export const Form = (props: IProps) => {
    return (
        <StyledForm onSubmit={props.onSubmit}>
            <img src={imgUrl} alt="Football players"/>
            <h2>{props.header}</h2>
            {props.children}
            <button type='submit'>Submit</button>
        </StyledForm>
    )
}
