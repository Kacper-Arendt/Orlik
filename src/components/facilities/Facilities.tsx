import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {BsGeoAlt, BsPencil, BsPlusLg} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {WrapperStyles} from "../reusable/Css";
import {WithLoading, FirebasePath, useLoading, getCollection, Urls, IFacility, device} from "../Components";

const Wrapper = styled.div`
  ${WrapperStyles};
  margin-bottom: 1rem;
`;

const Nav = styled.div`
  align-self: start;
  display: flex;
  gap: 2rem;
  padding: 2rem 3rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 12rem;
  height: 5rem;
  border-radius: 50px;
  background-color: #eee;
  font-size: 1.2rem;


  p {
    font-weight: 500;
    white-space: nowrap;
  }

  svg {
    color: green;
    font-size: 1.5em;
  }
`;

const FacilitiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3rem;
  width: 100%;
  padding: 2rem;
`;

const Facility = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 15rem;
  height: 20rem;

  box-shadow: rgba(0, 0, 0, 0.35) 0 5px 15px;
  
  p {
    display: flex;
    align-items: center;
    column-gap: .5rem;
    padding-left: 1rem;
    text-transform: capitalize;

    :first-of-type {
      font-size: 1.5rem;
      font-weight: 700;
    }
    :nth-of-type(2) {
      font-size: 1rem;
    }
  }

  svg {
    font-size: 1.3em;
  }

  div{
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
    border-bottom: 1px solid #888;
    width: 100%;
    height: 45%;
    padding-top: 1rem;

    img {
      width: 8rem;
      height: auto;
      object-fit: contain;
    }
  }
  
  @media${device.mobileM}{
  width: 20rem;
  height: 25rem;
  }
`;

export const Facilities = () => {
    const navigate = useNavigate();
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
        <WithLoading isLoading={loading} message={message}>
            <Wrapper>
                <Nav>
                    <NavItem onClick={() => navigate(Urls.addFacility)}>
                        <p> Add </p>
                        <BsPlusLg/>
                    </NavItem>
                    <NavItem onClick={() => navigate(Urls.edit)}>
                        <p> Edit </p>
                        <BsPencil/>
                    </NavItem>
                </Nav>
                <FacilitiesContainer>
                    {facilities.length >= 1 ?
                        facilities.map(el => {
                            return (
                                <Facility key={el.id}>
                                    <div>
                                        <img
                                            src="https://ik.imagekit.io/kacper/Orlik/football-pitch_aQeNLi9k-.png?updatedAt=1641589258711"
                                            alt=""/>
                                    </div>
                                    <p onClick={() => navigate(el.id)}>{el.name}</p>
                                    <p><BsGeoAlt/>{el.city}, {el.street} {el.streetNumber}</p>
                                </Facility>)
                        })
                        :
                        <p>Nothing found</p>
                    }
                </FacilitiesContainer>
            </Wrapper>
        </WithLoading>
    )
}