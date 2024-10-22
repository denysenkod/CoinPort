"use client"; // indicates that this script is intended to run in a client-side environment.
import axios from "axios"; // Import axios for making HTTP requests.
import Select from 'react-select' // Import the Select component from 'react-select' for custom dropdown menus.
import { useState, useEffect } from "react"; // Import useState and useEffect from React for state management and lifecycle effects.

// Define the PortfolioSelect component accepting `value` and `onChange` props for controlled behavior.
const PortfolioSelect = ({ value, onChange }) => {
    // State to hold the list of portfolios fetched from the database.
    const [ portfolios, setPortfolios ] = useState([])

    // Define an async function to fetch portfolios from the database.
    async function getPortfolios() {
        // Retrieve the user's token from localStorage.
        const token = localStorage.getItem("token"); 

        // Configuration object for the axios request, including authorization header.
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
                'Accept': 'application/json',
                
            }
        };

        // Use axios to fetch the list of portfolios, using the config for authorization.
        var response = await axios.get("http://localhost:8000/portfolios/", config);

        // Update the state with the fetched portfolios.
        setPortfolios(response.data)
  
    };

    // Use useEffect to call getPortfolios when the component mounts.
    useEffect(() => {
        getPortfolios();
    }, []); // The empty dependency array means this effect runs only once on mount.

    // Map the portfolios to options for the react-select component.
    const options = portfolios.map((portfolio) => ({
        id: portfolio.id, // Each option has an id.
        label: portfolio.name, // Each options has a label, which is the portfolio name.
    }));


    // Render the Select component with the mapped options.
    return(
        <Select 
            placeholder="Select a portfolio..." // Placeholder text for the dropdown.
            options={options} // The options for the dropdown, created from the portfolios state.
            isClearable // Allows the selection to be cleared.
            value={value} // Controlled value of the select, passed from the parent component.
            onChange={(value) => onChange(value)} // Handler for when the selection changes.
            formatOptionLabel={(option) => ( 
                // Custom format for the label display.
                <div className="flex flex-row items-center gap-3 text-black font-semibold">
                    {option.label} {/* Displays the label of the option. */}
                </div>
            )}
            // Custom class names for styling the select component.
            classNames={{ 
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
            }
            }
        />
    )
}

// Export the component for use elsewhere.
export default PortfolioSelect;