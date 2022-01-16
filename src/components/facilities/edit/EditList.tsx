import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    Spinner,
    FacilityMiniature,
    IFacility,
    getCollectionWithFilter,
    useLoading,
    WithLoading,
    useAppSelector,
    FirebasePath
} from "../../Components";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
`;

export const EditList = () => {
    const {message, loading, setLoading, setMessage} = useLoading();
    const {user} = useAppSelector(state => state);
    const [facilities, setFacilities] = useState<Array<IFacility>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user.id) return;

                setLoading(true);
                const data = await getCollectionWithFilter(FirebasePath.facilities, 'ownerId', '==', user.id);
                if (data) {
                    const arr: Array<IFacility> = []
                    data.forEach(el => {
                        arr.push(el)
                    })
                    setFacilities(arr);
                }
            } catch (e) {
                setMessage({type: 'error', message: `Can't load facilities, Try Again`});
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user.id, setMessage, setLoading]);

    return (
        <WithLoading message={message}>
            <Wrapper>
                {loading ?
                    <Spinner/>
                    :
                    <>
                        {facilities.length >= 1 ?
                            facilities.map(el => {
                                return (<FacilityMiniature
                                    key={el.id}
                                    id={el.id}
                                    name={el.name}
                                    city={el.city}
                                    street={el.street}
                                    streetNumber={el.streetNumber}
                                />)
                            })
                            :
                            <p>Facilities not found</p>
                        }
                    </>
                }
            </Wrapper>
        </WithLoading>
    )
}