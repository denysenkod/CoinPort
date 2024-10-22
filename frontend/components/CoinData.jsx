// Import React library to enable JSX syntax and React component features
import React from 'react';
// Import Image component from Next.js for optimized image rendering
import Image from "next/image";

// Define a CoinData component that accepts various props related to cryptocurrency data for display
const CoinData = ({ number, name, price, hour, hours, days, volume, marketCap}) => {
    // Return a container with a table displaying the cryptocurrency data
    return (
        <div className="relative overflow-x-auto">
            {/* Define a table with full width, base text size, left text alignment, and conditional dark mode styling */}
            <table className="table w-full text-base text-left text-gray-800 dark:text-white bg-yellow dark:bg-black">
                <tbody className="text-sm uppercase ">
                    <tr >
                        <th  className="pl-24 w-1/12 py-3 ">
                            {<Image src={number} width={27} height={27} objectFit="contain" className="rounded-lg" alt="logo"/>}
                        </th>
                        {/* Display cryptocurrency name */}
                        <th  className="w-1/12 py-3 text-base "> 
                            {name}
                        </th>
                        {/* Display current price of the cryptocurrency */}
                        <th  className="w-1/12 py-3 text-base ">    
                            {price}
                        </th>
                        {/* 
                            - Display price change in the last hour with conditional coloring
                                * text-red-500   : Colour for negative change
                                * text-green-500 : Colout for positive change 
                        */}
                        <th  className={`w-1/12 py-3 text-base ${hour[1] === "-" ? "text-red-500" : "text-green-500"}`}>
                            {hour}
                        </th>
                        {/* 
                            - Display price change in the last 24 hours with conditional coloring
                                * text-red-500   : Colour for negative change
                                * text-green-500 : Colout for positive change 
                        */}
                        <th  className={`w-1/12 py-3 text-base ${hours[1] === "-" ? "text-red-500" : "text-green-500"}`}>
                            {hours}
                        </th>
                        {/* 
                            - Display price change in the last 7 days with conditional coloring
                                * text-red-500   : Colour for negative change
                                * text-green-500 : Colout for positive change 
                        */}
                        <th  className={`w-1/12 py-3 text-base ${days[1] === "-" ? "text-red-500" : "text-green-500"}`}>
                            {days}
                        </th>
                        {/* Display trading volume */}
                        <th  className="w-2/12 py-3 text-base">
                            {volume}
                        </th>
                        {/* Display market capitalization */}
                        <th  className="w-2/12 py-3 text-base">
                            {marketCap}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

// Export the CoinData component for use in other parts of the application
export default CoinData;
