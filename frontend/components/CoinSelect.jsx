"use client"; // Indicates that the following code should only run on the client-side.

import axios from "axios"; // Imports axios for making HTTP requests.
import Select from 'react-select' // Imports the Select component from the 'react-select' library for creating customizable dropdown menus.
import { useState, useEffect } from "react"; // Imports useState and useEffect hooks from React for state management and side effects.
import Image from "next/image"; // Imports the Image component from Next.js for optimized image rendering.

// Defines the CoinSelect component with props `value` and `onChange` for selected option and handling changes.
const CoinSelect = ({ value, onChange }) => {
    const [ coins, setCoins ] = useState([]); // Initializes coins state as an empty array.
    
    // Defines an async function to fetch coins data from a given API endpoint.
    async function getCoins() {
        var response = await axios.get("http://localhost:8000/api/coins/") // Makes a GET request to fetch coins.
        setCoins(response.data) // Updates the coins state with the fetched data.
    };

    // Uses useEffect to call getCoins once the component mounts, ensuring the data is fetched on initial render.
    useEffect(() => {
        getCoins()
    }, []); // The empty dependency array ensures this effect runs only once after the initial rendering.

    // Maps the coins data to a format suitable for react-select, including id, label, symbol, and image for each coin.
    const options = coins.map((coin) => ({
        id: coin.id,
        label: coin.name,
        symbol: coin.symbol,
        image: coin.image
    }));

    // Returns the Select component with customized options and behavior.
    return(
        <Select 
            placeholder="Select a coin..." // Placeholder text for the dropdown.
            options={options} // The options for the dropdown, derived from the coins state.
            isClearable // Allows users to clear the selection.
            value={value} // Controlled value of the select, allowing for an externally controlled state.
            onChange={(value) => onChange(value)} // Handler for when the selection changes, passed from props.
            formatOptionLabel={(option) => ( // Custom rendering for options, including an image and text.
                <div className="flex flex-row items-center gap-3">
                    <div>
                        {<Image src={option.image} width={27} height={27} objectFit="contain" className="rounded-lg" alt="logo"/>}
                    </div>
                    <div className="text-black font-semibold">
                        {/*  Displays the coin name */}
                        {option.label},
                        <span className="text-neutral-500 font-medium ml-1">
                            {/*  Displays the coin symbol in uppercase */}
                            {option.symbol.toUpperCase()} 
                        </span>
                    </div>
                </div>
            )}
            classNames={{ // Custom class names for various parts of the select component, allowing for custom styling.
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => 'text-lg'
            }}
        />
    )

}

// Exports the CoinSelect component for use in other parts of the application.
export default CoinSelect; 