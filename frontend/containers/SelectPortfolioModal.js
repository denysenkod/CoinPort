"use client"; // Indicates that the following code uses client-side only features of Next.js.

// Import necessary components.
import Modal from "./Modal"; // Import a custom modal component to display content in a dialog.
import PortfolioSelect from "@/components/PortfolioSelect"; // Custom select component for choosing a portfolio.

// Import useForm hook from react-hook-form for managing form state and validation.
import { useForm } from "react-hook-form";

// Import useRouter hook from Next.js for programmatic navigation.
import { useRouter } from 'next/navigation';

// Import a custom hook for managing the state and behavior of the select portfolio modal.
import useSelectPortfolioModal from "@/hooks/useSelectPortfolioModal";

// Define the main functional component.
const SelectPortfolioModal = () => {
    const router = useRouter(); // Initialize the useRouter hook for navigation.

    // Initialize the custom hook to manage modal visibility and state.
    const selectPortfolioModal = useSelectPortfolioModal();

    // Initialize useForm hook to manage form fields, submission, and validation.
    const { register, handleSubmit, setValue, watch, reset } = useForm({
        defaultValues: { portfolio: "" } // Set initial form values.
    });

    // Watch the 'portfolio' field for changes to update the component state accordingly.
    const portfolio = watch('portfolio');

    // Custom function to programmatically set form values with additional options like validation.
    const setCustomValue = (id, value) => {
        setValue(id, value, {
            shouldValidate: true, // Trigger validation on change.
            shouldDirty: true, // Mark the form as dirty to indicate changes.
            shouldTouch: true, // Mark the field as touched to show that the user interacted with it.
        });
    };


    // Define the body content of the modal using JSX.
    const bodyContent = (
        <div className="flex flex-col gap-5">
            <PortfolioSelect
                id="portfolio"
                value={portfolio}
                onChange={(value) => setCustomValue('portfolio', value)} // Update form value on change.
                register={register} // Register the input for react-hook-form.
            />
        </div>
    );

    // Function to handle form submission.
    const onSubmit = (data) => {
        // Store the selected portfolio's name and ID in localStorage.
        localStorage.setItem("portfolioName", data.portfolio.label.toLowerCase());
        localStorage.setItem("portfolioId", data.portfolio.id);

        // Construct the navigation link.
        var link = `/portfolio/${data.portfolio.id}`;

        // Use the Next.js router to navigate to the selected portfolio page.
        router.push(link);

        // Close the modal.
        selectPortfolioModal.onClose();

        // Reset the form fields to their initial state.
        reset();
    };



    // Render the Modal component with props and content defined above.
    return (
        <Modal
            isOpen={selectPortfolioModal.isOpen} // Control modal visibility.
            onClose={selectPortfolioModal.onClose} // Function to call when closing the modal.
            onSubmit={handleSubmit(onSubmit)} // Handle form submission.
            actionLabel="Submit" // Label for the primary action button.
            secondaryActionLabel="Close" // Label for the secondary action button.
            onSecondaryAction={selectPortfolioModal.onClose}
            title="Select Portfolio!" // Modal title.
            body={bodyContent} // Content of the modal.
        />
    );
};

// Export the component for use in other parts of the application.
export default SelectPortfolioModal;