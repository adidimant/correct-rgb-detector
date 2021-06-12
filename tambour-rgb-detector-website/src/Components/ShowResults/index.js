import React, { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import styled from 'styled-components';
import ColorComponent from '../ColorComponent';
import {
    ImageFormContainer,
    FormTitle,
} from '../ImageForm/ImageFormElements';
import Button from '@material-ui/core/Button';
import { FaBars } from 'react-icons/fa';

const button = {
    '&:hover': {
        textDecoration: 'underline',
        color: '#DDDDDD',
        borderColor: '#DDDDDD'
    },
    '&:active': {
        textDecoration: 'underline',
        color: '#BBBBBB',
        borderColor: '#BBBBBB'
    },
    textDecoration: 'none',
    textTransform: 'uppercase',
    fontFamily: 'Roboto',
    fontWeight: '400',
    color: '#FFFFFF',
    textAlign: 'center',
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-color: #000;
  border-radius: 2px;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

const ShowResults = (props) => {
    const { closestColors } = props

    return (
        <>
            <ImageFormContainer>
                <div className="container">
                    <Container>
                        {() => {
                            if (_.isEmpty(closestColors)) {
                                return <React.Fragment>
                                </React.Fragment>
                            } else {
                                { JSON.stringify(closestColors) }
                                debugger
                                _.forEach(closestColors, color => {
                                    return <ColorComponent tambourColor={color.tambourColor} rgb={color.rgb} probability={color.probability} ></ColorComponent>
                                })
                            }
                        }}
                    </Container>
                </div>
            </ImageFormContainer>
        </>
    )
}
export default ShowResults
