import React, {useState} from "react";
import {Form} from "../reusable/Form";
import {IProps} from "./Auth";
import {useField} from "../hoc/hooks/useField";

const initVal = {
    email: '',
    password: '',
}

export const Login = (props: IProps) => {
    const {fields, handleChange} = useField(initVal);

    const onSubmitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            props.setLoading(true);
            console.log(fields)
        }catch (e){
            props.setError('Coś poszło nie tak')
        }finally {
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

