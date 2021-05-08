import React, { useEffect, useState } from 'react';
import nocccoinsService from '../services/noccocoins';
import { Typography, TextField, Button } from '@material-ui/core';
import { Page } from '../styles';
import useStore from '../store';

const Friend = props => {
  const { friend } = props;
  const { userId, userInfo, setUserInfo } = useStore(state => state);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [password, setPassword] = useState();
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    const allMessages = await nocccoinsService.getTransfers(
      friend._id,
      friend._id,
    );
    setMessages(allMessages);
  };

  const handleTransfer = async () => {
    const response = await nocccoinsService.transferCoins(
      password,
      userId,
      friend._id,
      amount,
      message,
    );
    const newUserInfo = {
      ...userInfo,
      nocccoins: response.nocccoins,
    };
    setUserInfo(newUserInfo);
    getAllMessages();
  };

  return friend ? (
    <Page>
      <Typography>{friend.username}</Typography>
      <div>
        {messages.map((message, index) => (
          <Typography key={message.from_id + index}>
            From: {message.from_id === userId ? 'You' : friend.username} To:
            {message.to_id === userId ? 'You' : friend.username} Message:{' '}
            {message.message}
          </Typography>
        ))}
      </div>
      <div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id={'message'}
          label={'Message'}
          name={'message'}
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id={'amount'}
          label={'Amount'}
          name={'amount'}
          value={amount}
          type={'number'}
          onChange={({ target }) => setAmount(target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id={'password'}
          label={'Your password'}
          name={'password'}
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type={'password'}
        />
        <Button variant={'outlined'} onClick={handleTransfer}>
          Send Nocccoins
        </Button>
      </div>
    </Page>
  ) : null;
};

export default Friend;
