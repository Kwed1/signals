import { JwtDecode } from 'app/auth/types/auth';
import { create } from 'zustand';

interface UserStore {
   userData: JwtDecode | null;
   setUserData: (value: JwtDecode) => void;
}

const useUserStore = create<UserStore>(set => ({
   userData: null,
   setUserData: value => set({ userData: value }),
}));

export default useUserStore;
