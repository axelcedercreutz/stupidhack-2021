import create from 'zustand';

const useStore = create((set, get) => ({
  userId: null,
  setUserId: userId => set({ userId }),
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
  isLoggedIn: () => !!get().userId,
  setIsLoggedIn: isLoggedIn => set({ isLoggedIn }),
  friends: [],
  setFriends: friends => set({ friends }),
}));

export default useStore;
