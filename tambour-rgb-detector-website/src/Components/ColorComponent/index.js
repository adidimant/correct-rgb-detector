import React from 'react'
import { FaBars } from 'react-icons/fa';

import styled from 'styled-components';

export const ColorsContainer = styled.nav`

    background: #fff;
    border: solid, #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px)
    {
        transition: 0.8s all ease;
    } 
`;

export const ColorContainer = styled.nav`

    background: #fff;
    height: 80px;
    width: 100px;
    border: solid, #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;

    @media screen and (max-width: 960px)
    {
        transition: 0.8s all ease;
    } 
`;

const getColor = (props) => (
    `rgb(${props.rgb.red}, ${props.rgb.green}, ${props.rgb.blue})`
);

let style = {
    color: "rgb(255, 0, 0)",
    backgroundColor: "rgb(255, 255, 0)"
}

export const GenerateColor = styled.nav`

    height: 100px;
    width: 100px;
    border: solid, #000;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    color: ${props => getColor(props)};
    backgroundColor: ${props => getColor(props)};

    @media screen and (max-width: 960px)
    {
        transition: 0.8s all ease;
    } 
`;



const ColorComponent = (props) => {
    const { rgb, tambourColor, propability } = props;
    return (
        <>
            <ColorContainer>
                <GenerateColor></GenerateColor>
                קוד הצבע: {tambourColor}
                הערכת תאימות: {propability}
            </ColorContainer>
        </>
    )
}

export default ColorComponent;
