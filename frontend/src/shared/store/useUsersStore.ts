import { User } from 'shared/types';
import { create } from 'zustand';

interface UsersStore {
   users: User[];
   setUsers: (value: User[]) => void;
}

const useUsersStore = create<UsersStore>(set => ({
   users: [],
   setUsers: value => set({ users: value }),
}));

export default useUsersStore;
