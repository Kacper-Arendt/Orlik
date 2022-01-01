import React from "react";
import styled from "styled-components";
import {UserImage} from "../reusable/UserImage";
import {device} from "../../model/Media";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 2rem;
  
  @media${device.tablet}{
    p{
      display: none;
    }
  }
`;

interface IProps {
    photo?: string
    name: string,
}

export const Profile = (props: IProps) => {
    return (
        <Wrapper>
               <UserImage size='4rem' photo={props.photo} />
                <p>{props.name}</p>
        </Wrapper>
    )
}