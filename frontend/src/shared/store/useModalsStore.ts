import { create } from 'zustand';

interface ModalsStore {
   choiceModalOpen: boolean;
   setChoiceModalOpen: (value: boolean) => void;
   deleteModalOpen: boolean;
   setDeleteModalOpen: (value: boolean) => void;
   pinModalOpen: boolean;
   setPinModalOpen: (value: boolean) => void;
}

const useModalsStore = create<ModalsStore>(set => ({
   choiceModalOpen: false,
   setChoiceModalOpen: value => set({ choiceModalOpen: value }),
   deleteModalOpen: false,
   setDeleteModalOpen: value => set({ deleteModalOpen: value }),
   pinModalOpen: false,
   setPinModalOpen: value => set({ pinModalOpen: value }),
}));

export default useModalsStore;
