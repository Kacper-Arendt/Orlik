import {useEffect, useReducer, useState} from "react";
import {FirebasePath, getFirebaseDoc} from "../../Components";

export interface IConfig {
        path: FirebasePath,
        id: string
}

interface IResponse<T> {
    state: IState<T>,
    setSearch: (val: boolean) => void,
    clearData: () => void
}

interface IState<T> {
    message: string,
    loading: boolean,
    response: T | null,
}

const initState = {
    loading: false,
    response: null,
    message: '',
}

const dataFetchReducer = <T>(state: IState<T>, action: any) => {
    switch (action.type) {
        case 'CLEAR_STATE':
            return initState;
        case 'FETCH_INIT':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                response: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                loading: false,
                message: 'Something went wrong, Try again',
            };
        default:
            throw new Error();
    }
};

export const useFirebase = <T>(props: IConfig): IResponse<T> => {
    const [search, setSearch] = useState(false);
    const [state, dispatch] = useReducer(dataFetchReducer, initState);

    const clearData = () => {
        dispatch({type: 'CLEAR_STATE'});
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (search && props.id && props.path) {
                    dispatch({type: 'FETCH_INIT'});
                    const doc = await getFirebaseDoc(props.path, props.id);
                    dispatch({type: 'FETCH_SUCCESS', payload: doc});
                }
            } catch (err: any) {
                dispatch({type: 'FETCH_FAILURE'});
            } finally {
                setSearch(false);
            }
        };
        fetchData();
    }, [search, props.id, props.path]);

    return {setSearch, state, clearData};
};
