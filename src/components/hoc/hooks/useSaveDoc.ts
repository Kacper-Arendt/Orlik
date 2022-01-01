import {useReducer, useState} from "react";
import useDeepCompareEffect from "use-deep-compare-effect";
import {FirebasePath, firebaseReducer, initState, IState, updateDocument} from "../../Components";

interface IResponse<T> {
    state: IState<T>,
    setSearch: (val: boolean) => void,
    clearData: () => void
}

interface ISaveDoc<T> {
    path: FirebasePath,
    id: string,
    data: T,
    version: number
}

export const useSaveDoc = <T, R>(props: ISaveDoc<T>): IResponse<R> => {
    const [search, setSearch] = useState(false);
    const [state, dispatch] = useReducer(firebaseReducer, initState);

    const clearData = () => {
        dispatch({type: 'CLEAR_STATE'});
    };

    useDeepCompareEffect(() => {
        const fetchData = async () => {
            try {
                if (search && props.id && props.path) {
                    dispatch({type: 'FETCH_INIT'});
                    const response = await updateDocument(props.path, props.id, props.data, props.version);
                    response && dispatch({type: 'FETCH_SUCCESS', payload: response});
                }
            } catch (err: any) {
                dispatch({type: 'FETCH_FAILURE'});
            }
        };
        fetchData();
    }, [search, props]);

    return {setSearch, state, clearData};
};
