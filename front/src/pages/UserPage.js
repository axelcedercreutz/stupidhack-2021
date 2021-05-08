import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { Page } from '../styles';
import useStore from '../store';
import Dashboard from '../components/Dashboard';
import nocccoinServices from '../services/noccocoins';

const UserPage = () => {
  const { userId, userInfo, friends = [] } = useStore(state => state);
  const [messages, setMessages] = useState();

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    const allMessages = await nocccoinServices.getTransfers(userId, userId);
    setMessages(allMessages);
  };

  return (
    userInfo && (
      <Page>
        <div>
          <div>
            <Dashboard />
          </div>
          <div>
            <Card raised={true}>
              <CardContent>
                <Typography>Visit your friends:</Typography>
                {friends.map(friend => {
                  return (
                    <Link to={`/friends/${friend._id}`}>{friend.username}</Link>
                  );
                })}
              </CardContent>
            </Card>
            {messages && (
              <Card>
                <Typography>Your latest messages:</Typography>
                {messages.reverse().map(message => (
                  <Typography>
                    From: {message.from_id === userId ? 'You' : message.from_id}{' '}
                    To: {message.to_id === userId ? 'You' : message.to_id}{' '}
                    Message: {message.message}
                  </Typography>
                ))}
              </Card>
            )}
          </div>
        </div>
      </Page>
    )
  );
};

export default UserPage;
