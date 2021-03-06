import React from "react";
import {
    Form,
    useField,
    loginWithEmailAndPassword,
    getUserDocument,
    useAppDispatch,
    login,
    Urls,
} from "../Components";
import {IProps} from "./Auth";
import {useNavigate} from "react-router-dom";

const initVal = {
    email: '',
    password: '',
}

export const Login = (props: IProps) => {
    const dispatch = useAppDispatch();
    const {fields, handleChange} = useField(initVal);
    const navigate = useNavigate();

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            props.setLoading(true);
            const request = await loginWithEmailAndPassword(fields.email, fields.password);

            if (request._tokenResponse.localId) {
                const userDoc = await getUserDocument(request._tokenResponse.localId);
                props.setMessage({type: 'success', message: 'Success'});
                if (userDoc) {
                    dispatch(login(userDoc));
                    navigate(Urls.profile);
                }
            }
        } catch (e) {
            props.setLoading(false);
            props.setMessage({type: 'error', message: 'Something went wrong, Try Again'});
        }
    };

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
                        value={fields.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        name='password'
                        value={fields.password}
                        onChange={handleChange}
                    />
                </label>
            </Form>
        </>
    )
}

