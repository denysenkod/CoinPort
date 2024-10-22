// Imports the create function from the zustand library, a state management solution.
import { create } from "zustand";

// Defines a custom hook `useCreatePortfolioModal` using zustand's create function.
const useCreatePortfolioModal = create((set) => ({
    isOpen: false, // Initializes the modal's open state to false.
    onOpen: () => set({ isOpen: true }), // Defines an action to open the modal by setting isOpen to true.
    onClose: () => set({ isOpen: false }), // Defines an action to close the modal by setting isOpen to false.
}));

export default useCreatePortfolioModal; // Exports the custom hook for use across the application.
