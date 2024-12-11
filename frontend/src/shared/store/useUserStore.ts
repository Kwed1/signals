import { JwtDecode } from 'app/auth/types/auth';
import { create } from 'zustand';

interface UserStore {
   userData: JwtDecode | null;
   userAvatar: string | null;
   setUserData: (value: JwtDecode) => void;
   setUserAvatar: (value: string) => void;
}

const useUserStore = create<UserStore>(set => ({
   userData: null,
   userAvatar: null,
   setUserAvatar: value => set({ userAvatar: value }),
   setUserData: value => set({ userData: value }),
}));

export default useUserStore;
