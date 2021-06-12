import React, { useState, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import Dropzone from 'react-dropzone';
import _ from 'lodash';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { FaBars } from 'react-icons/fa';
import {
    ImageFormContainer,
    FormTitle,
} from './ImageFormElements';

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

//border-color: ${props => getColor(props)};

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const allContainer = {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    display: 'flex',
};

const uploadContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    marginTop: 10,
    width: 200,
    height: 30,
    padding: 4,
    backgroundColor: '#F5FFFA',
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

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

const ImageForm = (props) => {
    const parentProps = { ...props };
    const [image, setImage] = useState([]);
    const { getRootProps, getInputProps, isDragActive,
        isDragAccept, isDragReject } = useDropzone({
            accept: 'image/*',
            onDrop: acceptedFiles => {
                setImage(acceptedFiles[0]);
                parentProps.addImageToParent(acceptedFiles[0]);
            }
        });

    const handleSubmitClick = async () => {
        if (_.isEmpty(image)) {
            return;
        }
        await parentProps.sendToServer();
    };

    return (
        <>
            <ImageFormContainer>
                <div style={allContainer}>
                    <div style={uploadContainer}>
                        <div className="container">
                            <Container {...getRootProps({ className: 'dropzone', isDragActive, isDragAccept, isDragReject })}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                                <em>(Only *.jpeg and *.png images will be accepted)</em>
                            </Container>
                        </div>
                        <FormTitle>בחר או צלם תמונה להעלאה</FormTitle>
                    </div>
                    <Button
                        style={thumb}
                        onClick={() => handleSubmitClick()}>
                        מצא צבע/ים תואמים
                    </Button>
                </div>
            </ImageFormContainer>
        </>
    )
}
export default ImageForm
