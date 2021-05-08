import create from 'zustand';

const useStore = create(set => ({
  userId: null,
  setUserId: userId => set({ userId }),
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
  isLoggedIn: false,
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  friends: [],
  setFriends: friends => set({ friends }),
}));

export default useStore;
