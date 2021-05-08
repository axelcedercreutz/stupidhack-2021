import { useRouteMatch } from 'react-router-dom';

import noccocoinsService from '../services/noccocoins';
import useStore from '../store';
import Friend from '../components/Friend';

const FriendPage = () => {
  const { friends, userId, userToken, userInfo, setUserInfo } = useStore();

  const match = useRouteMatch('/friends/:id');

  const friend = match
    ? friends.find(friend => friend._id === match.params.id)
    : undefined;

  const handleTransfer = async () => {
    const response = await noccocoinsService.transferCoins(
      userToken,
      userId,
      '6095b3f1e0eccae5569a3c94',
      2,
    );
    console.log(response);
    const newUserInfo = {
      ...userInfo,
      nocccoins: response.nocccoins,
    };
    setUserInfo(newUserInfo);
  };

  return (
    <Friend
      friend={friend}
      userId={userId}
      handleTransfer={() => handleTransfer()}
    />
  );
};

export default FriendPage;
