import { useRouteMatch } from 'react-router-dom';
import Friend from '../components/Friend';
import { CircularProgress } from '@material-ui/core';
import useStore from '../store';

const FriendPage = () => {
  const { friends } = useStore();

  const match = useRouteMatch('/friends/:id');

  const friend = match
    ? friends.find(friend => friend._id === match.params.id)
    : undefined;

  return friend ? <Friend friend={friend} /> : <CircularProgress />;
};

export default FriendPage;
