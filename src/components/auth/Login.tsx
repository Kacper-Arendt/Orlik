import React from "react";
import styled from "styled-components";
import {Form} from "../reusable/Form";

export const Login = () => {
    return (
        <Wrapper>
            {/*<Form>*/}
            {/*    <label>*/}
            {/*        E-mail*/}
            {/*        <input type="text"/>*/}
            {/*    </label>*/}
            {/*</Form>*/}
        </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5rem;

  width: 100%;
  height: 100%;
`;