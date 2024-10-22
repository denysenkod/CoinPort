import React from 'react'; // Import React library to enable JSX syntax and React features.
import Image from "next/image"; // Import the Image component from Next.js for optimized image handling.

const PortfolioCoinData = ({ 
    img, // URL of the cryptocurrency image.
    name, // Name of the cryptocurrency.
    price, // Current price of the cryptocurrency.
    hour, // Price change in the last hour.
    hours, // Price change in the last 24 hours.
    days, // Price change in the last 7 days.
    tupnl, // Total unrealized profit/loss.
    trpnl, // Total realized profit/loss.
    holdings, // Value of the holdings in the portfolio.
    quantity // Quantity of the cryptocurrency held.
}) => {
    return (
        // Wrapper div for the table, with responsive and styling classes.
        <div className="relative overflow-x-auto text-xl">
            <table className="table w-full text-base text-left text-gray-800 dark:text-white bg-yellow dark:bg-black">
                {/* Table body with uppercase text styling */}
                <tbody className="text-sm uppercase ">
                    {/* Table row displaying the data */}
                    <tr >
                        {/* Display the cryptocurrency image with Next.js Image component for optimized loading */}
                        <th  className="pl-24 w-1/12 py-3 ">{<Image src={img} width={34} height={34}  className="rounded-lg text-2xl  " alt="logo"/>}</th>
                        {/* Display the cryptocurrency name */}
                        <th  className="w-1/12 py-3 text-base "> {name}</th>
                        {/* Display the current price */}
                        <th  className="w-1/12 py-3 text-base text-left -pl-2 -ml-4">{price}</th>
                        {/* Conditional rendering for price change in the last hour, color-coded based on positive or negative change */}
                        <th  className={`w-1/12 py-3 text-base ${hour[0] === "-" ? "text-red-500" : "text-green-500"}`}>{hour}</th>
                        {/* Conditional rendering for price change in the last 24 hours */}
                        <th  className={`w-1/12 py-3 text-base ${hours[0] === "-" ? "text-red-500" : "text-green-500"}`}>{hours}</th>
                        {/* Conditional rendering for price change in the last 7 days */}
                        <th  className={`w-1/12 py-3 text-base ${days[0] === "-" ? "text-red-500" : "text-green-500"}`}>{days}</th>
                        {/* Display the quantity held */}
                        <th  className="w-1/12 py-3 text-base pr-8">{quantity}</th>
                        {/* Display the value of the holdings */}
                        <th  className="w-1/12 py-3 text-base">{holdings}</th>
                        {/* Conditional rendering for total unrealized profit/loss */}
                        <th  className={`w-1/12 py-3 text-base ${tupnl[2] === "-" ? "text-red-500" : "text-green-500"}`}>{tupnl}</th>
                        {/* Conditional rendering for total realized profit/loss, including a check for zero value */}
                        <th  className={`w-1/12 py-3 text-base ${trpnl[2] === "-" ? "text-red-500" : trpnl[2] == 0.0 ? "text-black" : "text-green-500"}`}>{trpnl}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

// Export the component for use in other parts of the application.
export default PortfolioCoinData;