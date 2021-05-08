import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Page } from '../styles';
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
    <Page>
      <Typography variant="h4" component="h2" align="center" padding="20">
        Register
      </Typography>

      <Link to="/mine/photo">New Photo</Link>

      <div className={classes.root}>
        <Card>
          <CardContent>
            <img src={image} />
          </CardContent>
        </Card>
      </div>
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

export default Mine;
