// Imports the `create` function from zustand, a state management library for React.
import { create } from "zustand";

// Defines `useSelectPortfolioModal`, a custom hook for managing the open state of a portfolio selection modal.
const useSelectPortfolioModal = create((set) => ({
    isOpen: false, // Initial state for the modal's open state, defaulting to not open.
    onOpen: () => set({ isOpen: true }), // Function to open the modal, setting `isOpen` to true.
    onClose: () => set({ isOpen: false }), // Function to close the modal, setting `isOpen` to false.
}));

// Exports the custom hook for use in other parts of the application.
export default useSelectPortfolioModal;
