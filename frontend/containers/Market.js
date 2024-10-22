"use client"; // Indicates that the following code should only run on the client-side.

// Imports necessary React hooks and components, as well as the axios library for making HTTP requests.
import { useState, useEffect } from "react";
import CoinData from "../components/CoinData";
import InfoChart from "../components/InfoChart";
import axios from "axios";



// Defines the Market component.
const Market = () => {
    // State variables for storing global market data.
    const [ globalMarketCap, setGlobalMarketCap ] = useState();
    const [ globalDayVolume, setGlobalDayVolume ] = useState();
    const [ bitcoinDominance, setBitcoinDominance ] = useState();
    const [ totalNumberOfCoins, setTotalNumberOfCoins ] = useState();

    // State variable for storing an array of all coin data fetched from the CoinGecko API.
    const [ newAllCoinsArray, setNewAllCoinsArray ] = useState([]);

    // Imports and initializes the Coinpaprika API client.
    const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
    const client = new CoinpaprikaAPI();
    
    // useEffect hook to fetch global market data from the Coinpaprika API when the component mounts.
    useEffect(() => {
      client.getGlobal()
        .then((e) => {
          // Updates state variables with the fetched data.
          setGlobalMarketCap(e.market_cap_usd)
          setGlobalDayVolume(e.volume_24h_usd)
          setBitcoinDominance(e.bitcoin_dominance_percentage)
          setTotalNumberOfCoins(e.cryptocurrencies_number)
        })
        .catch(console.error); // Logs any errors to the console.
      }, []); // An empty dependency array means this effect runs only on component mount.

    // Asynchronous function to fetch market data for various coins from the CoinGecko API.
    async function get_data() {
      let response = await axios.get("https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h,24h,7d&per_page=100&page=1&price_change_percentage=1h%2C7d&x_cg_pro_api_key=CG-KoQX65qXJc75y6buWtSQXtDP")
      setNewAllCoinsArray(response.data); // Updates the state with the fetched data.
    }


    
    
      
    // useEffect hook to call get_data() when the component mounts.
    useEffect(() =>{
      get_data()
    }, []); // An empty dependency array means this effect runs only on component mount.



    // The component renders UI elements to display the fetched market and coins data.
    return (
          <div>
            <div className="pt-[120px] flex justify-center gap-4">
              {/* InfoChart components display global market data (Market Capitalisation, 24H Trading Volume, Bitcoin Dominance, Number of Crypto) */}
              <InfoChart data={`$ ${globalMarketCap}`} whichOne="Market Capitalisation"/>
              <InfoChart data={`$ ${globalDayVolume}`} whichOne="24H Trading Volume"/>
              <InfoChart data={`${bitcoinDominance} %`} whichOne="Bitcoin Dominance"/>
              <InfoChart data={totalNumberOfCoins} whichOne="Number of Crypto"/>
            </div>
            <div className="pt-[10px] mx-auto w-11/12 rounded-md">
            {/* Table headers for displaying coin data */}
            <table className="table bg-yellow pb-10 dark:bg-black rounded-t-2xl w-full text-sm text-left text-gray-800 dark:text-white">
                    <tbody className="text-lg font-bold ">
                        {/* Table row with headers of each column */} 
                        <tr>
                            <th  className="pl-10 w-1/12 py-3  "></th>
                            <th  className="w-1/12 py-3 text-xl ">Coin</th>
                            <th  className="w-1/12 py-3 text-xl ">Price</th>
                            <th  className={`w-1/12 py-3 text-xl `}>1H</th>
                            <th  className={`w-1/12 py-3 text-xl `}>24H</th>
                            <th  className={`w-1/12 py-3 text-xl `}>7D</th>
                            <th  className="w-2/12 py-3 text-xl ">Total Volume</th>
                            <th  className="w-2/12 py-3 text-xl ">Market Cap</th>
                        </tr>
                    </tbody>
                </table>
              {/* Maps over newAllCoinsArray to display data for each coin using the CoinData component */}
              {
                newAllCoinsArray.slice(0,100).map((value, index) => {
                  console.log(value);
                return <CoinData 
                  number={value.image} 
                  name={value.symbol} 
                  price={`$ ${value.current_price}`} 
                  hour={` ${Math.floor(value.price_change_percentage_1h_in_currency * 100) / 100} % `} 
                  hours={` ${Math.floor(value.price_change_percentage_24h * 100) / 100 } %`} 
                  days={` ${Math.floor(value.price_change_percentage_7d_in_currency * 100) / 100} %`} 
                  volume={`$ ${value.total_volume}`} 
                  marketCap={`$ ${value.market_cap}`} 
                  />
                })
              }
            </div>
          </div>

    )
}
// Exports the Market component for use in other parts of the application.
export default Market;