import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  width: 18rem;
  overflow-x: auto;
`;

 const Background = styled.div<{ fallback: string, bgc: string, chosen: boolean }>`
  flex: 0 0 auto;
  width: 60%;
  height: 6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  border: ${props => props.chosen && '2px solid orange'};
  color: ${props => props.chosen ? '#000' : '#fff'};
  font-size: 2rem;
  background: ${props => props.fallback};
  background: ${props => props.bgc};
`;

export const BgcArray = [
    {
        id: 0,
        fallback: '#aa4b6b',
        bgc: 'linear-gradient(to right, #aa4b6b, #6b6b83, #3b8d99)'
    },
    {
        id: 1,
        fallback: '#bdc3c7',
        bgc: 'linear-gradient(to right, #bdc3c7, #2c3e50)'
    },
    {
        id: 2,
        fallback: '#0f2027',
        bgc: ' linear-gradient(to right, #0f2027, #203a43, #2c5364)'
    },
    {
        id: 3,
        fallback: '#f12711',
        bgc: 'linear-gradient(to right, #f12711, #f5af19)'
    },
    {
        id: 4,
        fallback: '#333333',
        bgc: 'linear-gradient(to right, #333333, #dd1818)'
    },
    {
        id: 5,
        fallback: '#06beb6',
        bgc: 'linear-gradient(to right, #06beb6, #48b1bf)'
    },
    {
        id: 6,
        fallback: '#41295a',
        bgc: 'linear-gradient(to right, #41295a, #2f0743)'
    }, {
        id: 7,
        fallback: '#feac5e',
        bgc: 'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)'
    },
    {
        id: 8,
        fallback: '#ff0099',
        bgc: 'linear-gradient(to right, #ff0099, #493240)'
    },
]

interface IProps {
    bgcId: number
    chooseBgc: (val: number) => void
}

export const BackgroundPicker = (props: IProps) => {
    const colorPicker = (el: number) => {
        props.chooseBgc(el);
    }

    return (
        <>
            <Wrapper>
                {BgcArray.map(el => {
                    return <Background
                        key={el.id}
                        fallback={el.fallback}
                        bgc={el.bgc}
                        chosen={el.id === props.bgcId}
                        onClick={()=> colorPicker(el.id)}
                    >
                        {el.id}
                    </Background>
                })}
                <div/>
            </Wrapper>
        </>
    )
}