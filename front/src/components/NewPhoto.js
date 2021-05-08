import React, { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import noccocoinsService from '../services/noccocoins';

const NewPhoto = () => {
  const [takeNewPicture, setTakeNewPicture] = useState(false);

  const onChange = imageList => {
    // data for submit
    let loggedUserJSON = window.localStorage.getItem('nocccoinUser');
    const user = JSON.parse(loggedUserJSON);
    const userId = user._id;
    console.log(imageList);
    const imageData = imageList[0].dataURL?.split(',')[1];
    noccocoinsService.mineCoin(userId, imageData);
  };

  return takeNewPicture ? (
    <ImageUploading onChange={onChange}>
      {({ imageList, onImageUpload, isDragging, dragProps }) => (
        // write your building UI
        <div style={{ marginTop: '16px' }}>
          {imageList.length === 0 && (
            <Button
              variant={'outlined'}
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or drop image here
            </Button>
          )}
        </div>
      )}
    </ImageUploading>
  ) : (
    <>
      <Typography>In order to mine a new Nocccoin, you need to:</Typography>
      <Typography>1. Open your Nocco</Typography>
      <Typography>
        2. Open the latest Noccchain picture on another other screen from here
      </Typography>
      <Typography>
        3. Take a photo with your open Nocco and the latest Nocchain.
      </Typography>
      <Button onClick={() => setTakeNewPicture(true)}>Take the picture</Button>
    </>
  );
};

export default NewPhoto;
