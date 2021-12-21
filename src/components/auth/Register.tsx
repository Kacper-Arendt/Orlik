import React, {useState} from "react";
import styled from "styled-components";
import {Form, Urls} from "../Components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5rem;

  width: 100%;
  height: 100%;
`;

export const Register = () => {
    const [data, setData] = useState<{ password: '', email: string }>({password: '', email: ''})

    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(data)
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Wrapper>
            <Form
                header='Sign Up'
                redirectText='Already registered?'
                redirectUrl={Urls.login}
                onSubmit={onSubmitHandler}
            >
                <label>
                    E-mail
                    <input
                        name='email'
                        type="email"
                        defaultValue={data.email}
                        onChange={onChangeHandler}
                    />
                </label>
                <label>
                    Password
                    <input
                        name='password'
                        type="password"
                        defaultValue={data.password}
                        onChange={onChangeHandler}
                    />
                </label>
            </Form>
        </Wrapper>
    )
}