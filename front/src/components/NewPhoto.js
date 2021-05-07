import React, { useState } from 'react';
import { Typography, Button, TextField } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import noccocoinsService from '../services/noccocoins';

const NewPhoto = () => {
  const [takeNewPicture, setTakeNewPicture] = useState(false);
  const [message, setMessage] = useState();
  const [images, setImages] = React.useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    let loggedUserJSON = window.localStorage.getItem('nocccoinUser');
    const user = JSON.parse(loggedUserJSON);
    const userId = user._id;
    console.log(imageList);
    const imageData = imageList[0].dataURL?.split(',')[1];
    noccocoinsService.mineCoin(userId, imageData);
  };

  return takeNewPicture ? (
    <ImageUploading multiple value={images} onChange={onChange}>
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div>
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image.dataURL} alt="" width="100" />
              <div>
                <Button onClick={() => onImageUpdate(index)}>Päivitä</Button>
                <Button
                  onClick={() => onImageRemove(index)}
                  variant="outlined"
                  style={{ marginLeft: '16px' }}
                >
                  Poista
                </Button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '16px' }}>
            {imageList.length === 0 && (
              <Button
                variant={'outlined'}
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Klikkaa tai pudota tähän liite
              </Button>
            )}
          </div>
        </div>
      )}
    </ImageUploading>
  ) : (
    <>
      <Typography>Tähän tulee selitykset</Typography>
      <Button onClick={() => setTakeNewPicture(true)}>Ota uusi kuva</Button>
    </>
  );
};

export default NewPhoto;
