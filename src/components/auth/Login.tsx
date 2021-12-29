import React from "react";
import {useNavigate} from "react-router-dom";
import {Form, useField, loginWithEmailAndPassword, getUserDocument, Urls} from "../Components";
import {IProps} from "./Auth";

const initVal = {
    email: '',
    password: '',
}

export const Login = (props: IProps) => {
    const {fields, handleChange, reset} = useField(initVal);
    const navigate = useNavigate();

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            props.setLoading(true);
            const login = await loginWithEmailAndPassword(fields);

            if (login._tokenResponse.localId) {
                await getUserDocument(login._tokenResponse.localId);
                reset();
                navigate(Urls.home);
            }
        } catch (e) {
            props.setError('Coś poszło nie tak');
        } finally {
            props.setLoading(false);
        }
    }

    return (
        <>
            <Form
                header='Sign In'
                onSubmit={onSubmitHandler}
            >
                <label>
                    E-mail
                    <input
                        type="email"
                        name='email'
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name='password'
                        onChange={handleChange}
                    />
                </label>
            </Form>
        </>
    )
}

