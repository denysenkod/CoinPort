"use client"; // Indicates that the following code should only run on the client-side.

import { useState } from "react"; // Imports the useState hook from React for state management.
import Modal from "./Modal"; // Imports a Modal custom component.
import Input from "@/components/Input"; // Imports an Input custom component.
import { toast } from "react-hot-toast"; // Imports a toast utility for showing notifications.
import axios from "axios"; // Imports Axios for making HTTP requests.
import { useForm } from "react-hook-form"; // Imports the useForm hook from react-hook-form for form handling.

import useCreatePortfolioModal from "@/hooks/useCreatePortfolioModal"; // Imports a custom hook for managing the portfolio modal state.

const CreatePortfolioModal = () => {
    const createPortfolioModal = useCreatePortfolioModal(); // Uses the custom hook to manage modal state.

    const [ isLoading, setIsLoading ] = useState(false);  // State to manage loading state of the component.
    
    // Destructuring useForm hook to manage form states and handlers.
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm({
        defaultValues: {
            name: "" // Sets the default value for the form.
        }
    });

    // The submit handler for the form.
    const onSumbit = (data) => {

        setIsLoading(true); // Sets loading state to true.

        const token = localStorage.getItem("token"); // Retrieves the token from localStorage.

        // Checks if access token exists in localStorage.
        if (localStorage.getItem("access")) {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                    'Accept': 'application/json',
                    
                }
            };
            
            try {
                // Adjusts the coin data format if present.
                if (data.hasOwnProperty('coin')) {
                    data.coin = data.coin.id.toLowerCase().replace(" ", "-");
                } 
                
                // Posts data to add a portfolio, handles success, error, and finally states.
                axios.post('http://localhost:8000/api/add-portfolios/', data, config)
                .then(() => {
                    toast.success('Transaction Created!'); // Shows success toast.
                    reset(); // Resets the form.
                    createPortfolioModal.onClose(); // Closes the modal.
                })
                .catch((error) => {
                    toast.error("Something went wrong."); // Shows error toast.
                    console.log("ERROR", error)
                    console.log(data)
                })
                .finally(() => {
                    setIsLoading(false); // Resets loading state.
                })
            } catch (err) {
                console.log(err); // Logs any errors caught in the try block.
            }
        } else {
            console.log("No in localstorage"); // Logs if no access token is found.
        }
    }

    // The content to be rendered within the modal body.
    const bodyContent = (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-0">
                <p className="-mb-6 text-lg font-semibold"></p>
                <Input 
                    id="name"
                    label="Portfolio Name" 
                    disabled={isLoading} // Disables the input when loading.
                    {...register("name")} // Registers the name input for form handling.
                    handleClick={(e) => setValue("name", e.target.value)} // Sets the name value on change.
                    value={watch("name")} // Watches the name input for changes.
                    errors={errors} // Passes down any errors.
                    required // Makes the input required
                    classStyles="p-2 pt-2" 
                />
            </div>
        </div>
    );

    // Returns the Modal component with props passed for managing and displaying the modal.
    return(
        <Modal
            isOpen={createPortfolioModal.isOpen}
            onClose={createPortfolioModal.onClose}
            onSubmit={handleSubmit(onSumbit)}
            actionLabel="Submit"
            secondaryActionLabel="Close"
            title="Create a portfolio!"
            body={bodyContent}
        />
    );
};

// Exports the component to reuse in other files.
export default CreatePortfolioModal;