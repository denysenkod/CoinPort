"use client" // Indicates that the following code should only run on the client-side.

import { useState, useEffect } from "react"; // Import React hooks for state and lifecycle management.
import Modal from "./Modal"; // Import a custom Modal component for displaying the form.
import CoinSelect from "@/components/CoinSelect"; // Custom component for selecting a cryptocurrency.
import Input from "@/components/Input"; // Custom input component for form fields.
import { toast } from "react-hot-toast"; // Import toast for displaying notifications.
import axios from "axios"; // Import axios for making HTTP requests.
import {
    useForm, // Import useForm hook for form handling
} from "react-hook-form";

import useTransactionModal from "@/hooks/useTransactionModal"; // Custom hook for managing transaction modal state.

const TransactionModal = () => {
    const transactionModal = useTransactionModal(); // Use custom hook to control modal display.

    const [isLoading, setIsLoading] = useState(false); // State to track loading status of the form submission.

    const {
        register, // Register value handler
        handleSubmit, // Submit handler
        setValue, // Set the value of a specific form field
        watch, // Watch specific form fields for changes.
        formState: { errors }, // Destructure errors from formState to handle form validation feedback.
        reset // Reset form fields to default values after submission.
    } = useForm({
        defaultValues: { // Set default form values
            portfolioId: Number(localStorage.getItem("portfolioId")),
            coin: "",
            transaction_type: "BUY",
            quantity: 1,
            price_per_coin: 1,
            comments: ""
        }
    });

    useEffect(() => {
        // Effect to update portfolioId from localStorage whenever it changes.
        setValue("portfolioId", Number(localStorage.getItem("portfolioId")));
    }, [localStorage.getItem("portfolioId")]); // Dependency array includes localStorage item to watch for changes.

    const coin = watch('coin'); // Watch the 'coin' field for changes to handle dynamic UI updates or validations.

    const setCustomValue = (id, value) => {
        // Custom function to update form values with additional flags for validation and UI feedback.
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    };

    const onSubmit = (data) => {
        // Handler for form submission.
        setIsLoading(true); // Set loading state to true during request processing.

        const token = localStorage.getItem("token"); // Retrieve authentication token from localStorage.

        if (localStorage.getItem("access")) { // Check for a specific localStorage item before proceeding.
            const config = { // HTTP request headers configuration.
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                }
            };

            try {

                if (data.hasOwnProperty('coin')) { // Format coin field if present.
                    data.coin = data.coin.id.toLowerCase().replace(" ", "-");
                }

                // Perform a POST request to add a transaction with axios.
                axios.post('http://localhost:8000/api/add-transaction/', data, config)
                .then(() => {
                    toast.success('Transaction Created!'); // Display success message on successful request.
                    reset(); // Reset form fields to initial state.
                    transactionModal.onClose(); // Close the modal.
                })
                .catch((error) => {
                    toast.error("Something went wrong."); // Display error message on failure.
                    console.log("ERROR", error); // Print error message.
                })
                .finally(() => {
                    setIsLoading(false); // Reset loading state regardless of request outcome.
                });
            } catch (err) {
                console.log(err); // Catch and log any errors not related to the HTTP request.
            }
        } else {
            console.log("Not in localstorage"); // Log if the required item is not in localStorage.
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-5">
            {/* Coin selection input using a custom component */}
            <CoinSelect 
                id="coin" // Unique identifier for the coin select component
                value={coin} // Controlled value from the component state
                onChange={(value) => setCustomValue('coin', value)} // Custom handler to set the coin value with validation
                register={register} // Function from react-hook-form to register the input for validation
            />
            {/* Container for transaction type selection */}
            <div className="flex flex-col gap-0">
                <p className="-mb-6 text-lg font-semibold">Select transaction type</p> {/* Label for transaction type */}
                <select
                    id="transaction_type" // Unique identifier for the select input
                    disabled={isLoading} // Disables the input when the form is submitting
                    {...register("transaction_type")} // Registers the transaction type select input for validation
                    required // Makes the field required
                    placeholder=" " // Placeholder for styling purposes
                    className="
                        bg-yellow
                        text-black
                        rounded-lg
                        cursor-pointer
                        font-bold
                        w-full
                        mt-8
                        p-2
                        pt-2
                        outline-none
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                    " // Tailwind CSS classes for styling
                >
                    <option value="BUY">BUY</option> {/* Option to buy */}
                    <option value="SELL">SELL</option> {/* Option to sell */}
                </select>
            </div>
            {/* Container for price per coin input */}
            <div className="flex flex-col gap-0">
                <p className="-mb-6 text-lg font-semibold">Price per coin</p> {/* Label for price per coin */}
                <Input
                    {...register("price_per_coin")} // Registers the input for validation and links it to the form state
                    handleClick={(e) => setValue("price_per_coin", Number(e.target.value))} // Custom handler to process and set the price per coin value
                    id="price_per_coin" // Unique identifier for the input
                    label="" // Empty label as placeholder
                    disabled={isLoading} // Disables the input when the form is submitting
                    value={watch("price_per_coin")} // Controlled value, watching the price per coin field for changes
                    errors={errors} // Passes any field errors for display
                    required // Makes the field required
                    classStyles="p-2 pt-2" // Custom class for styling
                />
            </div>
            {/* Container for quantity input */}
            <div className="flex flex-col gap-0">
                <p className="-mb-6 text-lg font-semibold">Quantity</p> {/* Label for quantity */}
                <Input 
                    {...register("quantity")} // Registers the input for validation and links it to the form state
                    handleClick={(e) => setValue("quantity", Number(e.target.value))} // Custom handler to process and set the quantity value
                    id="quantity" // Unique identifier for the input
                    label="" // Empty label as placeholder
                    disabled={isLoading} // Disables the input when the form is submitting
                    value={watch("quantity")} // Controlled value, watching the quantity field for changes
                    errors={errors} // Passes any field errors for display
                    required // Makes the field required
                    classStyles="p-2 pt-2" // Custom class for styling
                />
            </div>
            {/* Container for comments input */}
            <div className="flex flex-col gap-0">
                <p className="-mb-6 text-lg font-semibold">Comments</p> {/* Label for comments */}
                <Input 
                    {...register("comments")} // Registers the input for validation and links it to the form state
                    handleClick={(e) => setValue("comments", e.target.value)} // Custom handler to process and set the comments value
                    id="comments" // Unique identifier for the input
                    label="" // Empty label as placeholder
                    disabled={isLoading} // Disables the input when the form is submitting
                    value={watch("comments")} // Controlled value, watching the comments field for changes
                    errors={errors} // Passes any field errors for display
                    required // Makes the field required
                    classStyles="p-2 pt-2" // Custom class for styling
                />
            </div>
        </div>
    );
    

// Return JSX for rendering the modal component
return(
        <Modal
            isOpen={transactionModal.isOpen} // Determines if the modal is visible based on a boolean state
            onClose={transactionModal.onClose} // Function to execute when the modal is requested to close, e.g., clicking a close button or overlay
            onSubmit={handleSubmit(onSubmit)} // Wraps the onSubmit function with react-hook-form's handleSubmit for form validation and submission
            actionLabel="Submit" // Text for the primary action button, initiating form submission
            secondaryActionLabel="Close" // Text for the secondary action button, closing the modal
            title="Add Transaction!" // Sets the modal's title to inform users of the modal's purpose
            body={bodyContent} // Injects the modal's content, defined elsewhere, containing the form fields and labels
        />
    );
};


// Export the TransactionModal component for use elsewhere in the application
export default TransactionModal;

