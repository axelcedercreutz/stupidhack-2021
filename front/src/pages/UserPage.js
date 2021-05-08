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
    if (friends) {
      getAllMessages();
    }
  }, [friends, userId]);

  const getAllMessages = async () => {
    const allMessages = await nocccoinServices.getTransfers(userId, userId);
    const newestMessageFirst = allMessages.reverse();
    setMessages(newestMessageFirst);
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
                    key={friend._id}
                  >
                    {friend.username}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
          {messages?.length > 0 && friends?.length > 0 && (
            <Card>
              <CardContent>
                <Typography variant="h5">Your latest messages</Typography>
                {messages.map((message, index) => {
                  const messageFrom =
                    message.from_id === userId
                      ? 'You'
                      : friends.filter(
                          friend => friend._id === message.from_id,
                        )[0]?.username;
                  const messageTo =
                    message.to_id === userId
                      ? 'You'
                      : friends.filter(
                          friend => friend._id === message.to_id,
                        )[0]?.username;
                  return (
                    <div
                      style={{
                        margin: 8,
                        padding: 16,
                        border: '1px solid black',
                        backgroundColor:
                          message.from_id === userId
                            ? 'peachpuff'
                            : 'lightblue',
                        textAlign:
                          message.from_id === userId ? 'right' : 'left',
                      }}
                      key={message.from_id + index}
                    >
                      <Typography variant={'body1'}>
                        {message.message}
                      </Typography>
                      <Typography
                        key={message.from_id + index}
                        variant={'body2'}
                      >
                        {messageFrom} => {messageTo} ({message.amount})
                      </Typography>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Page>
  ) : null;
};

export default UserPage;
