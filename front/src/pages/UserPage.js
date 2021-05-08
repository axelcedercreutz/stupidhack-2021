import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Page } from '../styles';
import useStore from '../store';
import { useStyles } from '../styles/theme';
import Dashboard from '../components/Dashboard';

const noccos = [
  {
    flavor: 'Carnival',
    amount: 1,
  },
  {
    flavor: 'Mongo',
    amount: 1,
  },
  {
    flavor: 'Leila',
    amount: 1,
  },
  {
    flavor: 'Pekka',
    amount: 1,
  },
  {
    flavor: 'Olli "VIDUIXMÄÄÄN" GIGGILÄ',
    amount: 1,
  },
];

const UserPage = () => {
  const { userInfo, friends = [] } = useStore(state => state);
  const classes = useStyles();

  return (
    userInfo && (
      <Page>
        <Card className={classes.root} raised={true}>
          <CardContent>
            <Typography className={classes.title} color="primary" gutterBottom>
              {'Hello ' + userInfo.username + '!'}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              You have {userInfo.nocccoins} Noccocoins
            </Typography>
          </CardContent>
        </Card>

        <Card raised={true}>
          <CardContent>
            <Typography>Your friends!</Typography>
            {friends.map(friend => {
              return (
                <Link to={`/friends/${friend._id}`}>{friend.username}</Link>
              );
            })}
          </CardContent>
        </Card>

        <Dashboard noccoFlavors={noccos} />
      </Page>
    )
  );
};

export default UserPage;
