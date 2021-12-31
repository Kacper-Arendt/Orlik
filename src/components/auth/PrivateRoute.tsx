import React from 'react';
import {Navigate} from 'react-router-dom';
import {useLocation} from "react-router";
import {useAuth} from "../hoc/hooks/useAuth";
import { Urls } from '../Components';

export const PrivateRoute = (props: { children: JSX.Element }) => {
    let location = useLocation();
    const logged = useAuth();

    if (!logged) {
        return <Navigate to={Urls.auth} state={{ from: location }} />;
    }

    return props.children;
};
