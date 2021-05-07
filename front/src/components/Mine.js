import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Mine = () => {
  const classes = useStyles();
  return (
    <>
      <Link to="/mine/photo">New Photo</Link>
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Typography>Newest photo</Typography>
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
