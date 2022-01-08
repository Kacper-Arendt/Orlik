import {useState} from "react";
import {IMessage} from "../WithLoading";

export const useLoading = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<IMessage | null>(null);

    return {loading, setLoading, setMessage, message}
}