"use client"; // indicates this script is intended to run in a client-side environment.


const Input = ({
    inputType, // The type of the input, e.g., 'text', 'email', etc.
    handleClick, // Event handler for the input's onChange event.
    label, // Text label for the input field.
    name, // The 'name' attribute for the input, important for form handling.
    required, // Boolean indicating if the input is required.
    minLength, // The minimum length of the input value.
    errors, // Object containing any validation errors.
    id, // The 'id' attribute for the input, used for linking with the label.
    disabled, // Boolean indicating if the input should be disabled.
    classStyles, // Additional CSS class names to be applied to the input.
    handleRealClick, // Prop which could be used to create another handle.
}) => {
    return (
        <div 
            className="
                w-full
                relative
            ">
            <div >
                <input 
                    id={id} // Unique identifier.
                    name={name} // Name of the input field.
                    disabled={disabled} // Boolean value used to disable the input field.
                    type={inputType} // The type of the input, e.g., 'text', 'email', etc.
                    minLength={minLength} // The minimum length of the input value.
                    placeholder=" " // Placeholder with a single space used for animation purposes.
                    onChange={handleClick} // Handler to record inputs.
                   
                    // Tailwind CSS classes for styling and animation purposes.
                    className={`
                        bg-yellow
                        text-black
                        rounded-lg
                        cursor-pointer
                        font-bold
                        w-full
                        mt-8
                        p-6
                        pt-6
                        outline-none
                        transition
                        peer
                        disabled:opacity-70
                        disabled:cursor-not-allowed
                        ${classStyles}
                    `}
                />
                    {/* Tailwind CSS classes for styling and animation purposes. */}
                    <label 
                        className=" 
                            absolute
                            mt-10
                            text-lg
                            text-black
                            font-medium
                            duration-300
                            transform
                            -translate-y-4
                            scle-90
                            top-3
                            z-10
                            origin-[0]
                            cursor-pointer
                            left-2.5
                            peer-placeholder-shown:scale-100 
                            peer-placeholder-shown:translate-y-0 
                            peer-focus:scale-75 
                            peer-focus:-translate-y-4 
                    ">
                        {label}          
                    </label>
            </div>
        </div>
    )
}

// Exports the Input component for use elsewhere in the application.
export default Input;