import React, { useState } from 'react';
import noccocoinsService from '../services/noccocoins';
import { Typography, Button } from '@material-ui/core';

const Friend = props => {
  const { friend, userId, handleTransfer } = props;
  console.log(friend);
  const [takeNewPicture, setTakeNewPicture] = useState(false);
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
