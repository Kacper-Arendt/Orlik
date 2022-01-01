import React, {useState} from "react";
import styled from "styled-components";
import {WithLoading, useAuth, Register, Login, Urls} from "../Components";
import {device} from "../../model/Media";
import {Link} from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  
  a{
    margin-top: 8rem;
    align-self: start;
    font-size: 2rem;
    text-decoration: none;
  }
`;

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  height: 40rem;
  transition: 2s all;

@media${device.tablet} {
  height: 60rem;
}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 25rem;
  padding: 2rem 0;
  z-index: 1;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  border-radius: .5rem;

@media${device.tablet} {
  width: 35rem;
}
`;

const Card = styled.div<{ active: boolean }>`
  position: absolute;
  left: calc(50% - 7.5rem);
  width: 15rem;
  height: 85%;

  display: flex;
  align-items: start;
  justify-content: center;
  padding: 1rem;
  transform: ${props => props.active ? 'translate(-5rem, 25%)' : 'translate(-5rem, -25%)'};
  transition: all .65s;

  border-radius: .5rem;
  font-size: 2rem;
  color: #fff;
  background-color: #BDD684;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  
  p{
    margin-top: ${props => props.active && 'auto'};
  }

@media${device.tablet} {
  align-items: center;
  transform: ${props => props.active ? 'translateX(calc(-100% - 7.5rem))' : 'translateX(calc(100% + 7.5rem))'};
  p{
    margin-top: 0;
  }
}

  @media (hover: hover) and (pointer: fine) and ${device.tablet} {
    :hover {
      transform: ${props => props.active ? 'translateX(calc(-100% - 9rem))' : 'translateX(calc(100% + 9rem))'};
    }

    :active {
      transform: ${props => props.active ? 'translateX(calc(-100% - 7.5rem))' : 'translateX(calc(100% + 7.5rem))'};
    }
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
    const logged = useAuth();

    return (
        <WithLoading isLoading={loading} error={error}>
            <Wrapper>
                {logged ? <Link to={Urls.profile}>Redirect to profile</Link> :
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
                }
            </Wrapper>
        </WithLoading>
    )
}