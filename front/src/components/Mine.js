import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import noccocoinsService from '../services/noccocoins';

const Mine = () => {
  const classes = useStyles();
  const [image, setImage] = useState();

  useEffect(() => getMineableNocco(), [image]);

  console.log(image);

  const getMineableNocco = async () => {
    const latestNoccchain = await noccocoinsService.getMineNocco();
    setImage(latestNoccchain);
  };

  return (
    <>
      <Link to="/mine/photo">New Photo</Link>
      <div className={classes.root}>
        <Card>
          <CardContent>
            <img src={image} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    gridGap: 32,
  },
});

export default Mine;
