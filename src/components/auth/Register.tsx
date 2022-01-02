import React, {useState} from "react";
import {
    Form,
    generateUserDocument,
    registerUserWithEmailAndPassword,
    useField,
    ChooseGender,
} from "../Components";
import { IProps } from "./Auth";

const initVal = {
    email: '',
    password: '',
    name: '',
}

export const Register = (props: IProps) => {
    const {fields, reset, handleChange} = useField(initVal);
    const [gender, setGender] = useState('male');

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            props.setLoading(true);
            const registerUser = await registerUserWithEmailAndPassword(fields.email, fields.password);
            if (registerUser.user) {
                await generateUserDocument(
                    registerUser.user.uid,
                    fields.email,
                    registerUser.user.metadata.creationTime!,
                    fields.name,
                    gender,
                );
                reset();
            }
        } catch (e) {
            props.setError('Something went wrong, Try Again');
        } finally {
            props.setLoading(false);
        }
    }

    return (
            <>
                <Form
                    header='Sign Up'
                    onSubmit={onSubmitHandler}
                >
                    <label>
                        E-mail
                        <input
                            name='email'
                            type="email"
                            value={fields.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Name
                        <input
                            name='name'
                            type="text"
                            value={fields.name}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={14}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <input
                            name='password'
                            type="password"
                            minLength={6}
                            value={fields.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <ChooseGender
                        gender={gender}
                        setGender={(val) => setGender(val)}
                    />
                </Form>
            </>
    )
}