import { useEffect } from 'react';
import useStore from '../store';
import userService from '../services/user';

export const useInit = () => {
  const { setUserInfo, userId, setUserId, setFriends } = useStore(
    state => state,
  );

  useEffect(() => {
    let loggedUserJSON = window.localStorage.getItem('nocccoinUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserId(user._id);
      setUserInfo(user);
    }
  }, []);

  useEffect(() => initUserData(), [userId]);

  const initUserData = async () => {
    if (userId) {
      const newUserInfo = await userService.getBasicInfo();
      window.localStorage.setItem('nocccoinUser', JSON.stringify(newUserInfo));
      const allUsers = await userService.getAllUsers();
      setUserInfo(newUserInfo);
      setFriends(allUsers.filter(user => user._id !== userId));
    }
  };
};
