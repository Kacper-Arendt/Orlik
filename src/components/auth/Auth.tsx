import React, {useState} from "react";
import styled from "styled-components";
import {WithLoading} from "../hoc/WithLoading";
import {Register} from "./Register";
import {Login} from "./Login";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  row-gap: 5rem;

  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 60rem;
  transition: 2s all;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 35rem;
  padding: 5rem 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  border-radius: .5rem;

`;

const Card = styled.div<{ active: boolean }>`
  position: absolute;
  left: calc(50% - 7.5rem);
  width: 15rem;
  height: 85%;

  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${props => props.active ? 'translateX(calc(-100% - 7.5rem))' : 'translateX(calc(100% + 7.5rem))'};
  transition: all .65s;

  border-radius: .5rem;
  font-size: 2rem;
  color: #fff;
  background-color: #BDD684;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;

  :hover {
    transform: ${props => props.active ? 'translateX(calc(-100% - 9rem))' : 'translateX(calc(100% + 9rem))'};
  }

  :active {
    transform: ${props => props.active ? 'translateX(calc(-100% - 7.5rem))' : 'translateX(calc(100% + 7.5rem))'};
  }
`;

export interface IProps {
    setLoading: (val: boolean) => void
    setError: (val: string) => void
}

export const Auth = () => {
    const [login, setLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    return (
        <WithLoading isLoading={loading} error={error}>
            <Wrapper>
                <Box>
                    {login ?
                        <>
                            <Card active={login} onClick={() => setLogin(false)}>
                                <p>Register</p>
                            </Card>
                            <Container>
                                <Login
                                    setLoading={(val: boolean) => setLoading(val)}
                                    setError={(val: string) => setError(val)}
                                />
                            </Container>
                        </>
                        :
                        <>
                            <Card active={login} onClick={() => setLogin(true)}>
                                <p>Login</p>
                            </Card>
                            <Container>
                                <Register
                                    setLoading={(val: boolean) => setLoading(val)}
                                    setError={(val: string) => setError(val)}
                                />
                            </Container>
                        </>
                    }
                </Box>
            </Wrapper>
        </WithLoading>
    )
}