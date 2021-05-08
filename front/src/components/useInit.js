import { useEffect } from 'react';
import useStore from '../store';
import userService from '../services/user';

export const useInit = () => {
  const {
    setUserInfo,
    userId,
    setUserId,
    setIsLoggedIn,
    setFriends,
  } = useStore(state => state);

  useEffect(() => {
    let loggedUserJSON = window.localStorage.getItem('noccoinUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUserId(user.userId);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => initUserData(), [userId]);

  const initUserData = async () => {
    if (userId) {
      const newUserInfo = await userService.getBasicInfo();
      setUserInfo(newUserInfo);
      window.localStorage.setItem('nocccoinUser', JSON.stringify(newUserInfo));
      const allUsers = await userService.getAllUsers();
      setFriends(allUsers);
    }
  };
};
