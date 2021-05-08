import React, { useEffect, useState } from 'react';
import nocccoinsService from '../services/noccocoins';
import { Typography, TextField, Button } from '@material-ui/core';
import { Page } from '../styles';
import useStore from '../store';
import { toast } from 'react-toastify';

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
    const allMessagesFrom = await nocccoinsService.getTransfers(
      userId,
      friend._id,
    );
    const allMessagesTo = await nocccoinsService.getTransfers(
      friend._id,
      userId,
    );
    const messages = allMessagesTo.concat(allMessagesFrom);
    setMessages(messages);
  };

  const handleTransfer = async () => {
    try {
      const response = await nocccoinsService.transferCoins(
        password,
        userId,
        friend._id,
        amount,
        message,
      );
      const newUserInfo = {
        ...userInfo,
        nocccoins: userInfo.nocccoins - amount,
      };
      setUserInfo(newUserInfo);
      setMessage('');
      setPassword('');
      setAmount(1);
      getAllMessages();
    } catch (e) {
      toast.error("Couldn't send money");
    }
  };

  return friend ? (
    <Page>
      <Typography variant={'h4'}>{friend.username}</Typography>
      <div>
        {messages.map((message, index) => {
          return (
            <div
              style={{
                margin: 8,
                padding: 16,
                border: '1px solid black',
                backgroundColor:
                  message.from_id === userId ? 'peachpuff' : 'lightblue',
                textAlign: message.from_id === userId ? 'right' : 'left',
              }}
            >
              <Typography key={message.from_id + index} variant={'body1'}>
                {message.message}
              </Typography>
              <Typography key={message.from_id + index} variant={'body2'}>
                {message.from_id === userId ? 'You' : friend.username}
              </Typography>
            </div>
          );
        })}
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
