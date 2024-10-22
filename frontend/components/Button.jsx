// Import React library to enable JSX syntax and React component features
import React from 'react';

// Define a Button component that accepts props for customization
const Button = ({btnName, classStyles, handleClick, type, disabled}) => {
    // Return a button element with dynamic properties and styling
    return(
        // Render a button with various passed and predefined properties
        <button
            onClick={handleClick} // Attach the onClick event handler to perform an action when the button is clicked
            disabled={disabled} // Control the enabled/disabled state of the button
            type={type} // Set the button's type (e.g., 'submit', 'button')

            // Tailwind CSS styling classes.
            className={`
                ${classStyles}
                relative
                rounded-lg
                hover:opacity-80
                transition
                px-4
                text-black
                py-3
                text-md
                font-bold
                
            `}>
                 {btnName} {/* Display the button name passed as a prop */}
        </button>
    );
}

// Export the Button component for use in other parts of the application
export default Button;


