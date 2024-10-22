"use client"; // Indicates that the following code should only run on the client-side.

// Import necessary hooks from React
import { useState, useEffect, useCallback } from "react";

// Import a custom Button component
import Button from "../components/Button.jsx";

// Import a close icon from `react-icons`
import { AiOutlineClose } from "react-icons/ai";

// Define the Modal component with props for controlling its state and content
const Modal = ({isOpen, disabled, onClose, onSubmit, title, body, actionLabel, secondaryActionLabel, onSecondaryAction}) => {
    // State to manage the visibility of the modal
    const [ showModal, setShowModal ] = useState(isOpen);

    // Effect hook to update the modal's visibility when the `isOpen` prop changes
    useEffect (() => {
        setShowModal(isOpen);
    }, [isOpen]);

    // Placeholder function for a secondary action, could be implemented when scaling the program
    // Callback for handling the modal submit action, accounts the `disabled` state
    const handleSecondaryAction = useCallback(() => {

        // Call the onSubmit callback
        onSecondaryAction()
    }, [disabled, onSubmit]);

    // Callback for handling the modal close action, accounts the `disabled` state
    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        };
        
        // Close the modal and call the `onClose` callback after a delay for animation purposes
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    // Callback for handling the modal submit action, accounts the `disabled` state
    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        };

        // Call the onSubmit callback
        onSubmit()
    }, [disabled, onSubmit]);

    // Return `null` to render nothing if the modal is not open
    if (!isOpen) {
        return null;
    }




    // Render the modal with dynamic classes for animation and visibility
    return( 
        <>
            <div
                className="
                    justify-center
                    items-center
                    flex
                    overflow-x-hidden
                    overflow-y-auto
                    fixed
                    inset-0
                    z-50
                    outline-none
                    focus:outline-none
                    bg-gray-900/70
                "
            >
                <div 
                    className="
                        relative
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto
                        h-full
                        lg:h-auto
                        md:h-auto
                ">
                    {/* Modal content with conditional classes for transition effects */}
                    <div
                        className={`
                            translate
                            duration-300
                            h-full
                            ${showModal ? 'translate-y-0' : 'translate-y-full'}
                            ${showModal ? 'opacity-100' : 'opacity-0'}
                        `}
                    >
                        <div className=" 
                            border-0
                            rounded-lg
                            shadow-lg
                            relative
                            flex
                            flex-col
                            w-full
                            bg-blue
                            dark:bg-black
                        ">
                            {/* Modal header with a close button */}
                            <div
                                className="
                                    flex 
                                    items-center
                                    p-6
                                    rounded-t
                                    justify-center
                                    relative
                                    border-b-[1px]
                                   
                                "
                            >
                               <button
                                    onClick={handleClose}
                                    className="
                                        p-1
                                        border-0
                                        hover:opacity-70
                                        transition
                                        absolute
                                        left-9
                                    "
                               >
                                    <AiOutlineClose size={22} />
                               </button>
                                <div className="text-lg text-yellow font-semibold">
                                    {title}
                                </div>
                            </div>
                            {/* Modal body */}
                            <div className="relative p-6 flex-auto">
                                {body}
                            </div>
                            {/* Modal footer with action buttons */}
                            <div className="flex flex-col gap-2 p-6">
                                <div className="
                                    flex
                                    flex-row
                                    items-center
                                    gap-4
                                    w-full
                                ">
                                    {/* Secondary action button (close) */}
                                    <Button 
                                        classStyles="w-full bg-yellow"
                                        disabled={disabled}
                                        btnName={secondaryActionLabel}
                                        handleClick={handleClose}
                                    />
                                    {/* Primary action button (submit) */}
                                    <Button 
                                        classStyles="w-full bg-yellow"
                                        disabled={disabled}
                                        btnName={actionLabel}
                                        handleClick={handleSubmit}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// Export the Modal component for use in other parts of the application
export default Modal;
