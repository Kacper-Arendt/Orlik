import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {FaRegSun} from "react-icons/fa";
import {
    WithLoading,
    useGetDoc,
    FirebasePath,
    useAppDispatch,
    useAppSelector,
    IUser,
    logout,
    device, firebaseSignOut, UserImage,
} from "../../Components";
import {Edit} from "./Edit";
import {BgcArray} from "./BackgroundPicker";
import {WrapperStyles} from "../../reusable/Css";

const Wrapper = styled.div`
  ${WrapperStyles};
 

  button {
    margin: auto 0 4rem;
    padding: 1rem 2rem;
    background-color: red;
    border: 0;
    border-radius: 3px;
    color: #fff;
  }

@media${device.tablet} {
  margin-top: 12rem;
}
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
  gap: 2rem;

  width: 100%;
  min-height: 20rem;
  padding: 4rem 1rem;

  p {
    font-size: 2rem;
    color: #fff;
  }

@media${device.tablet} {
  width: 35rem;
  align-self: start;
  padding-left: 3rem;

  p {
    font-size: 2.5rem;
  }
}
`;

const EditIcon = styled(FaRegSun)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
@media${device.tablet} {
  font-size: 3rem;
}
`;

export const UserProfile = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state);
    const {setSearch, state} = useGetDoc<IUser>({path: FirebasePath.users, id: user.id});
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setSearch(true);
    }, [setSearch, edit]);

    useEffect(() => {
        if (user && !state.response) {
            setSearch(true);
        }
    }, [setSearch, state.response, user]);

    const editHandler = () => {
        if (state.response) {
            return <Edit data={state.response} handleOpen={() => setEdit(!edit)}/>
        }
    }

    const logoutHandler = async () => {
        try {
            await firebaseSignOut();
            dispatch(logout());
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <WithLoading isLoading={state.loading} error={state.message}>
            {edit && editHandler()}
            <Wrapper>
                <Profile  style={{
                    background: `${BgcArray[state.response ? state.response.backgroundColor : 0].fallback} 
                    ${BgcArray[state.response ? state.response.backgroundColor : 0].bgc}`
                }}>
                    <EditIcon onClick={() => setEdit(true)}/>
                    <UserImage photo={state.response?.photo}/>
                    <p>{state.response?.name}</p>
                </Profile>
                <button onClick={logoutHandler}>Logout</button>
            </Wrapper>
        </WithLoading>
    )
}