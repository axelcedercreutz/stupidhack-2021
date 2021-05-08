import React, { useState } from 'react';
import noccocoinsService from '../services/noccocoins';
import { Typography, Button } from '@material-ui/core';

const Friend = props => {
  const { friend } = props;
  const { userId, userInfo, setUserInfo } = useStore(state => state);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
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
      userInfo.password,
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
    takeNewPicture ? (
      <>
        <Typography>This will be the image stuff</Typography>
      </>
    ) : (
      <>
        <Typography>{friend.username}</Typography>
        <div>
          <Button
            variant={'outlined'}
            onClick={() => noccocoinsService.addCoins(userId, 5)}
          >
            Send new message
          </Button>
          <Button variant={'outlined'} onClick={handleTransfer}>
            Send Nocccoins
          </Button>
        </div>
      </>
    )
  ) : null;
};

export default Friend;
