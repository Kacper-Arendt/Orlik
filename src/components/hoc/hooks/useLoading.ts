import {useState} from "react";

export const useLoading = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    return {loading, setLoading, error, setError}
}