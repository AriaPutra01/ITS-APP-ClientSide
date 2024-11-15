import { create } from "zustand";

interface ModalStore {
  modals: {
    addModal: boolean;
    editModal: boolean;
    showModal: boolean;
    deleteModal: boolean;
    uploadModal: boolean;
  };
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  resetModals: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: {
    addModal: false,
    editModal: false,
    showModal: false,
    deleteModal: false,
    uploadModal: false,
  },
  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),
  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
    })),
  resetModals: () =>
    set({
      modals: {
        addModal: false,
        editModal: false,
        showModal: false,
        deleteModal: false,
        uploadModal: false,
      },
    }),
}));
