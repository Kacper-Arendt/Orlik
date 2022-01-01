import {useEffect, useReducer, useState} from "react";
import {FirebasePath, getFirebaseDoc, firebaseReducer, initState, IResponse} from "../../Components";

export interface IConfig {
        path: FirebasePath,
        id: string
}

export const useGetDoc = <T>(props: IConfig): IResponse<T> => {
    const [search, setSearch] = useState(false);
    const [state, dispatch] = useReducer(firebaseReducer, initState);

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
