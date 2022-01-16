import React from "react";
import styled from "styled-components";
import {device} from "../../model/Media";
import {BsGeoAlt} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

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
      cursor: pointer;
    }

    :nth-of-type(2) {
      font-size: 1rem;
    }
  }

  svg {
    font-size: 1.3em;
  }

  div {
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

@media${device.mobileM} {
  width: 20rem;
  height: 25rem;
}
`;

interface IFacility {
    id: string,
    name: string,
    city: string,
    street: string,
    streetNumber: string,
}

export const FacilityMiniature = (props: IFacility) => {
    const navigate = useNavigate();

    return (
        <>
            <Facility key={props.id}>
                <div>
                    <img
                        src="https://ik.imagekit.io/kacper/Orlik/football-pitch_aQeNLi9k-.png?updatedAt=1641589258711"
                        alt="Object"
                    />
                </div>
                <p onClick={() => navigate(props.id)}>{props.name}</p>
                <p><BsGeoAlt/>{props.city}, {props.street} {props.streetNumber}</p>
            </Facility>
        </>
    )
}