import React from "react";
import styled from "styled-components";
import {FaFemale, FaMale} from "react-icons/fa";
import {device} from "../../model/Media";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
@media${device.tablet} {
  justify-content: space-evenly;
}
`;

const Gender = styled.div<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: .75rem;
  border: 1px solid ${props => props.active ? 'orange' : 'grey'};
  border-radius: 5px;

  svg {
    font-size: 2rem;
    color: ${props => props.active ? 'orange' : 'grey'};
  }

@media${device.tablet} {
  svg {
    font-size: 3rem;
  }
}
`;

interface IProps {
    gender: string
    setGender: (val: 'male' | 'female') => void,
}

export const ChooseGender = (props: IProps) => {

    const changeHandler = (val: 'female' | 'male') => {
        props.setGender(val)
    }

    return (
        <Wrapper>
            <Gender onClick={() => changeHandler('male')} active={props.gender === 'male'}>
                <FaMale/>
            </Gender>
            <Gender onClick={() => changeHandler('female')} active={props.gender === "female"}>
                <FaFemale/>
            </Gender>
        </Wrapper>
    )
}