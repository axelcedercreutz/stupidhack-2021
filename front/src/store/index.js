import create from 'zustand';

const useStore = create((set, get) => ({
  userId: null,
  setUserId: userId => set({ userId }),
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
  isLoggedIn: () => !!get().userId,
  friends: [],
  setFriends: friends => set({ friends }),
  latestChainId: 0,
  setLatestChainId: latestChainId => set({ latestChainId }),
}));

export default useStore;
