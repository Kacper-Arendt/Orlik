import React, {useState} from "react";
import styled from "styled-components";
import {Form, generateUserDocument, registerUserWithEmailAndPassword, Urls, WithLoading} from "../Components";
import {ChooseGender} from "./ChooseGender";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 5rem;

  width: 100%;
  height: 100%;
`;

const initVal = {
    email: '',
    password: '',
    name: '',
    age: 0,
    gender: 'male'
}

export const Register = () => {
    const [data, setData] = useState(initVal)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoading(true)
            const registerUser = await registerUserWithEmailAndPassword(data.email, data.password);
            if (registerUser.user) {
                await generateUserDocument(
                    registerUser.user.uid,
                    data.email,
                    registerUser.user.metadata.creationTime!,
                    data.name,
                    data.age,
                    data.gender
                );
                setData(initVal);
            }
        } catch (e) {
            setError('Coś poszło nie tak');
        } finally {
            setLoading(false);
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <WithLoading isLoading={loading} error={error}>
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
                            required
                        />
                    </label>
                    <label>
                        Name
                        <input
                            name='name'
                            type="text"
                            defaultValue={data.name}
                            onChange={onChangeHandler}
                            minLength={3}
                            required
                        />
                    </label>
                    <label>
                        Age
                        <input
                            name='age'
                            type="number"
                            onChange={onChangeHandler}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            name='password'
                            type="password"
                            minLength={6}
                            defaultValue={data.password}
                            onChange={onChangeHandler}
                            required
                        />
                    </label>
                    <ChooseGender setGender={(val)=> setData({...data, gender: val})} gender={data.gender} />
                </Form>
            </Wrapper>
        </WithLoading>
    )
}