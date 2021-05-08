import create from 'zustand';

const useStore = create(set => ({
  userId: null,
  setUserId: userId => set({ userId }),
  userInfo: null,
  isLoggedIn: false,
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  friends: [],
  setFriends: friends => set({ friends }),
}));

export default useStore;
