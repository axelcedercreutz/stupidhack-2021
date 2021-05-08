import React, { useState } from 'react';
import { Typography, Button } from '@material-ui/core';
import ImageUploading from 'react-images-uploading';
import { toast } from 'react-toastify';

import styled from 'styled-components';
import noccocoinsService from '../services/noccocoins';
import useStore from '../store';

const NewPhoto = () => {
  const { userId } = useStore(state => state);
  const { setLatestChainId } = useStore(state => state);

  const updateChainLength = async () => {
    const chainLength = await noccocoinsService.getNocccainLength();
    setLatestChainId(chainLength);
  };

  const onChange = async imageList => {
    updateChainLength();

    if (userId) {
      const imageData = imageList[0].dataURL?.split(',')[1];

      try {
        await noccocoinsService.mineCoin(userId, imageData);
        toast.success('Image added to chain');
        updateChainLength();
      } catch (e) {
        toast.error("Couldn't add image");
      }
    } else {
      toast.error("Couldn't add image");
    }
  };

  return (
    <div>
      <Typography variant="h5" component="h3" align="center" padding="20">
        Submit new Noccc
      </Typography>

      <List>
        <Typography>In order to mine a new Nocccoin, you need to:</Typography>

        <ListItem>1. Open your Nocco</ListItem>
        <ListItem>
          2. Open the latest Noccchain picture on another other screen from here
        </ListItem>
        <ListItem>
          3. Take a photo with your open Nocco and the latest Noccc in the Nocchain.
        </ListItem>
      </List>

      <ImageUploading onChange={onChange}>
        {({ imageList, onImageUpload, isDragging, dragProps }) => (
          // write your building UI
          <div style={{ marginTop: '16px' }}>
            {imageList.length === 0 && (
              <Button
                variant={'outlined'}
                style={
                  isDragging
                    ? { backgroundColor: 'lightgreen', color: 'green' }
                    : undefined
                }
                onClick={onImageUpload}
                {...dragProps}
              >
                Click or Drop image here
              </Button>
            )}
          </div>
        )}
      </ImageUploading>
    </div>
  );
};

const List = styled.div`
  padding: 2rem 0;
`;

const ListItem = styled(Typography)`
  padding: 0.6rem 0;
`;

export default NewPhoto;
