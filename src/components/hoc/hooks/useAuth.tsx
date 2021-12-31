import {useEffect, useState} from "react";
import {useAppDispatch, checkIsAuth, useAppSelector, getUserDocument, login} from "../../Components";

export const useAuth = () => {
    const {user} = useAppSelector(state => state);
    const dispatch = useAppDispatch();
    const [logged, setLogged] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const isAuthHandler = async () => {
            await checkIsAuth(user => {
                if (user) {
                    setLogged(true);
                    setUserId(user.uid);
                } else setLogged(false)
            });
        }
        isAuthHandler();

    }, []);

    useEffect(() => {
        const addUser = async (id: string) => {
            const userDoc = await getUserDocument(id);
            if (userDoc) {
                dispatch(login(userDoc));
            }
        }

        if (userId && !user.id) {
           addUser(userId);
        }
    }, [userId, user, dispatch]);

    return logged;
}
