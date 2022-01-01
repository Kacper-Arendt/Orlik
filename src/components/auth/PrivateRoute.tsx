import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth, Urls} from "../Components";

export const PrivateRoute = (props: { children: JSX.Element }) => {
    const logged = useAuth();

    return logged ? props.children : <Navigate to={Urls.auth}/>
};
