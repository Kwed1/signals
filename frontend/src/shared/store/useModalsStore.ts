import {create} from 'zustand';

interface ModalsStore {
    choiceModalOpen: boolean;
    setChoiceModalOpen: (value: boolean) => void;
    deleteModalOpen: boolean;
    setDeleteModalOpen: (value: boolean) => void;
}

const useModalsStore = create<ModalsStore>((set) => ({
    choiceModalOpen: false,
    setChoiceModalOpen: (value) => set({choiceModalOpen: value}),
    deleteModalOpen: false,
    setDeleteModalOpen: (value) => set({deleteModalOpen: value})
}))

export default useModalsStore;