import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import nocccoinsService from '../services/noccocoins';
import { Page } from '../styles';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getAllImages();
  }, []);

  const getAllImages = async () => {
    const getLengthOfNoccchain = await nocccoinsService.getNocccainLength();
    const promises = [];
    for (var i = 0; i < getLengthOfNoccchain; i++) {
      const newImage = nocccoinsService.getNocccainById(i);
      promises.push(newImage);
    }
    const newImages = await promises;
    console.log(newImages);
    setImages(newImages);
  };

  return (
    <Page>
      <Typography variant="h4" component="h2">
        All dem Nocccoins
      </Typography>

      {images.map(image => {
        return (
          <Card>
            <CardContent>
              <img src={image} />
            </CardContent>
          </Card>
        );
      })}
    </Page>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridGap: 32,
  },
});

export default PhotoGallery;
