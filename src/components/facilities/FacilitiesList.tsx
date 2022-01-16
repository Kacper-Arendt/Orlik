import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {
    useLoading,
    IFacility,
    getCollection,
    FirebasePath,
    WithLoading,
    Spinner,
    FacilityMiniature
} from "../Components";

const FacilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
`;

export const FacilitiesList = () => {
    const {loading, setLoading, setMessage, message} = useLoading();
    const [facilities, setFacilities] = useState<Array<IFacility>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getCollection(FirebasePath.facilities);
                if (data) {
                    const arr: Array<IFacility> = []
                    data.forEach(el => {
                        arr.push(el)
                    })
                    setFacilities(arr)
                }
            } catch (e) {
                setMessage({type: 'error', message: `Can't load facilities, Try Again`})
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, [setLoading, setMessage])

    return (
        <WithLoading message={message}>
            <FacilitiesContainer>
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
                                />)})
                            :
                            <p>Facilities not found</p>
                        }
                    </>
                }
            </FacilitiesContainer>
        </WithLoading>
    )
}