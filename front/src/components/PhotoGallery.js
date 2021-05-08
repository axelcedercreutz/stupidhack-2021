import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import nocccoinsService from '../services/noccocoins';

const PhotoGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    getAllImages();
    console.log(images);
  }, [images]);

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

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography>Photogallery of all them Nocccoins</Typography>
      {images.map(image => {
        return (
          <Card>
            <CardContent>
              <img src={image} />
            </CardContent>
          </Card>
        );
      })}
    </div>
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
