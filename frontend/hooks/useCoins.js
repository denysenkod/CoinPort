"use client" // Indicates that the following code should only run on the client-side.

import axios from "axios"; // Imports axios for making HTTP requests.
import { useState } from "react"; // Imports the useState hook from React for state management.

// Defines a custom hook named useCoins.
const useCoins = () => {
    // Initializes 'coins' state with an empty array.
    const [ coins, setCoins ] = useState([]); 
    
    // Defines an asynchronous function to fetch coin data from a specified endpoint.
    async function getCoins() {
        // Makes a GET request to fetch coin data.
        var responce = await axios.get("http://localhost:8000/api/coins/")
        // Updates the 'coins' state with the fetched data.
        setCoins(responce)
    }
    // Invokes the getCoins function immediately upon the hook's execution.
    getCoins(); 

    // Returns the 'coins' state.
    return coins;
}

// Exports the useCoins hook for use in other parts of the application.
export default useCoins;