import { create } from 'zustand'

interface TokenStore {
  token: string | null; 
  setToken: (token: string) => void;
  getToken: () => string | null; 
}

const useTokenStore = create<TokenStore>((set, get) => ({
  token: null,
  setToken: (token: string) => set({ token }),
  getToken: () => get().token,
}));

export default useTokenStore;
