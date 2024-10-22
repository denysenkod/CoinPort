// Import the `create` function from the zustand library to create a state store.
import { create } from "zustand";

// Define a custom hook `useTransactionModal` using zustand's `create` function.
const useTransactionModal = create((set) => ({
    // `isOpen` state to track if the modal is open or closed, initially set to false.
    isOpen: false,
    // `onOpen` function to set `isOpen` to true, opening the modal.
    onOpen: () => set({ isOpen: true }),
    // `onClose` function to set `isOpen` to false, closing the modal.
    onClose: () => set({ isOpen: false }),
}));

// Export the custom hook for use in other parts of the application
export default useTransactionModal;