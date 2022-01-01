import React from "react";
import {FaUserAlt} from "react-icons/fa";
import styled from "styled-components";
import {device} from "../../model/Media";


const Image = styled.div<{size: string}>`
  img, svg {
    width: ${props => props.size};
    height: ${props => props.size};
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
    width: calc(${props => props.size} * 160%);
    height: calc(${props => props.size} * 160%);
  }
}
`;

interface IUserImageProps {
    photo?: string,
    size?: string
}

export const UserImage = (props: IUserImageProps) => {
    return (
        <>
            <Image size={props.size ? props.size : '7.5rem'}>
                {props.photo ?
                    <img src={props.photo} alt="User"/>
                    :
                    <FaUserAlt/>
                }
            </Image>
        </>
    )
}