export interface IState<T> {
    message: string,
    loading: boolean,
    response: T | null,
}

export const initState = {
    loading: false,
    response: null,
    message: '',
}
 export interface IResponse<T> {
     state: IState<T>,
     setSearch: (val: boolean) => void,
     clearData: () => void
 }

export const firebaseReducer = <T>(state: IState<T>, action: any) => {
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