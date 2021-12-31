import React from "react";
import {
    Form,
    useField,
    loginWithEmailAndPassword,
    getUserDocument,
    useAppDispatch,
    login,
    Urls,
    useAppSelector
} from "../Components";
import {IProps} from "./Auth";
import {useNavigate} from "react-router-dom";

const initVal = {
    email: '',
    password: '',
}

export const Login = (props: IProps) => {
    const dispatch = useAppDispatch();
    const {fields, handleChange, reset} = useField(initVal);
    const navigate = useNavigate();
    const {user} = useAppSelector(state => state);

    const onSubmitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            props.setLoading(true);
            const request = await loginWithEmailAndPassword(fields.email, fields.password);

            if (request._tokenResponse.localId) {
                const userDoc = await getUserDocument(request._tokenResponse.localId);
                userDoc && dispatch(login(userDoc));
                reset();
            }
        } catch (e) {
            props.setError('Coś poszło nie tak');
        } finally {
            props.setLoading(false);
            if (user.email) {
                navigate(Urls.home);
            }
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

