import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';

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
    console.log(allMessages);
    setMessages(allMessages);
  };

  return userInfo ? (
    <Page>
      <div>
        <div>
          <Dashboard />
        </div>
        <div>
          <Card raised={true} style={{ margin: '0 0 16px 0' }}>
            <CardContent>
              <Typography>Visit your friends:</Typography>
              {friends.map(friend => {
                return (
                  <Button
                    variant={'outlined'}
                    style={{ margin: 8 }}
                    href={`/friends/${friend._id}`}
                    key={friend.username}
                  >
                    {friend.username}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
          {messages?.length > 0 && friends?.length > 0 && (
            <Card>
              <Typography>Your latest messages:</Typography>
              {messages.reverse().map((message, index) => {
                const messageFrom =
                  message.from_id === userId
                    ? 'You'
                    : friends.filter(
                        friend => friend._id === message.from_id,
                      )[0].username;
                const messageTo =
                  message.to_id === userId
                    ? 'You'
                    : friends.filter(friend => friend._id === message.to_id)[0]
                        .username;
                return (
                  <Typography key={message.from_id + index}>
                    From:{messageFrom} To:
                    {messageTo} Message: {message.message}
                  </Typography>
                );
              })}
            </Card>
          )}
        </div>
      </div>
    </Page>
  ) : null;
};

export default UserPage;
