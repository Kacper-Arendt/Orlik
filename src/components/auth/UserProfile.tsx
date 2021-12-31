import React, {useEffect} from "react";
import styled from "styled-components";
import {FaRegSun, FaUserAlt} from "react-icons/fa";
import {
    WithLoading,
    useFirebase,
    FirebasePath,
    useAppDispatch,
    useAppSelector,
    IUser,
    logout,
    device
} from "../Components";

const Wrapper = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 6rem;
  height: 100%;
  width: 100%;
  max-width: var(--max-width);

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
  gap: 2rem;

  width: 100%;
  min-height: 20rem;
  padding: 4rem 1rem;
  background: #06beb6;
  background: linear-gradient(to right, #06beb6, #48b1bf);

  p {
    font-size: 2rem;
  }

@media${device.tablet} {
  width: 35%;
  align-self: start;
  padding-left: 3rem;

  p {
    font-size: 2.5rem;
  }
}
`;

const Image = styled.div`
  img, svg {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 100%;
    border: 2px solid orange;
    object-fit: cover;
  }

  svg {
    background-color: #eee;
    padding: .5rem;
  }

@media${device.tablet} {
  img, svg {
    width: 12.5rem;
    height: 12.5rem;
  }
}
`;

const EditIcon = styled(FaRegSun)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  cursor: pointer;

  font-size: 2rem;
@media${device.tablet} {
  font-size: 2.5rem;
}
`;

export const UserProfile = () => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state);
    const {setSearch, state} = useFirebase<IUser>({path: FirebasePath.users, id: user.id});

    useEffect(() => {
        setSearch(true);
    }, [setSearch]);

    useEffect(() => {
        if (user && !state.response) {
            setSearch(true);
        }
    }, [setSearch, state.response, user]);

    return (
        <WithLoading isLoading={state.loading} error={state.message}>
            <Wrapper>
                <Profile>
                    <EditIcon/>
                    <Image>
                        {state.response?.photo ?
                            <img src="" alt="User"/>
                            :
                            <FaUserAlt/>
                        }
                    </Image>
                    <p>{state.response?.name}</p>
                </Profile>
                <button onClick={() => dispatch(logout())}>Logout</button>
            </Wrapper>
        </WithLoading>
    )
}