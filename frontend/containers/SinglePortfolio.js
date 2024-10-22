"use client" // Indicates that the following code should only run on the client-side.
// Importing necessary hooks from React for state management and lifecycle events.
import { useState, useEffect, useCallback } from "react";

// Importing custom components for displaying portfolio coin data and information charts.
import PortfolioCoinData from "../components/PortfolioCoinData";
import InfoChart from "../components/InfoChart";

// Importing Redux store provider and the store itself for state management across the app.
import { Provider } from "react-redux";
import store from "../app/store";

// Importing a custom layout hook for managing layout-related logic.
import Layout from "../hooks/Layout";

// Importing a generic button component for UI interactions.
import Button from "../components/Button";

// Importing custom hooks for managing modals related to transactions, creating portfolios, and selecting portfolios.
import useTransactionModal from "@/hooks/useTransactionModal";
import useCreatePortfolioModal from "@/hooks/useCreatePortfolioModal";
import useSelectPortfolioModal from "@/hooks/useSelectPortfolioModal";

// Importing utilities for navigation and Redux state connection.
import { redirect } from "next/navigation";
import { connect } from "react-redux";

// Importing chart components from the react-chartjs-2 library for data visualization.
import { Line } from "react-chartjs-2";
import { Doughnut } from 'react-chartjs-2';

// Importing icons from react-icons library for enhancing UI elements.
import { HiMiniWallet } from 'react-icons/hi2';
import { MdAddToPhotos } from 'react-icons/md';

// Importing axios for making HTTP requests.
import axios from "axios";

// Importing Chart.js modules for chart customization and configuration.
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Legend,
  Tooltip,
  Filler,
  ArcElement
} from "chart.js";

// Registering Chart.js components for use in charts.
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
  ArcElement
);

// Function to create a line graph configuration for the portfolio value change over time.
const createGraph = (data) => {
  const dataGraph = {
    labels: data.map((data) => data.date), // Setting the x-axis labels to dates.
    datasets: [
      {
        label: "Change in Portfolio Value",
        data: data.map((data) => data.price), // Mapping price data to the y-axis.
        borderColor: "#ffc002", // Setting the color of the line.
        borderWidth: 3, // Border width.
        pointRadius: 0, // Disable points at the borders on lines
        tension: 0.5, // Adjusting the line tension for smooth curves.
        fill: true, // Filling the area under the line.
        backgroundColor: (context) => { // Creating a gradient fill under the line.
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "yellow");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  return dataGraph;
}

const createDataPie = (labels, dataValues) => {
  // Expanded list of background colors
  const backgroundColors = [
    '#ff9933', // Orange
    '#3366ff', // Blue
    '#00ff99', // Mint
    '#ff0000', // Red
    '#cc00cc', // Purple
    '#0000ff', // Dark Blue
    '#00ccff', // Sky Blue
    '#ff6699', // Pink
    '#99ff66', // Light Green
    '#ffcc00', // Amber
    '#6666ff', // Indigo
    '#ff5050', // Light Red
   
  ];

  // Expanded list of border colors
  const borderColors = [
    'rgba(255, 206, 86, 1)', // Orange
    'rgba(54, 162, 235, 1)', // Blue
    'rgba(255, 99, 132, 1)', // Red
    'rgba(75, 192, 192, 1)', // Teal
    'rgba(153, 102, 255, 1)', // Purple
    'rgba(255, 159, 64, 1)', // Amber
    'rgba(101, 143, 241, 1)', // Cornflower Blue
    'rgba(255, 99, 71, 1)',  // Tomato
    'rgba(50, 205, 50, 1)',   // Lime Green
    'rgba(255, 69, 0, 1)',    // Red Orange
    'rgba(138, 43, 226, 1)',  // Blue Violet
    'rgba(219, 112, 147, 1)', // Pale Violet Red
    
  ];









// Define the data structure for a pie chart
const dataPie = {
  labels: labels, // Use 'labels' array to define the segments of the pie chart
  datasets: [
    {
      label: 'Shares of Crypto', // Title for the dataset
      data: dataValues, // Data points/values for each segment of the pie chart
      backgroundColor: backgroundColors.slice(0, labels.length), // Dynamically set background colors for each segment, slicing the array to match the number of labels
      borderColor: borderColors.slice(0, labels.length), // Dynamically set border colors for each segment, slicing the array to match the number of labels
      borderWidth: 1, // Set the width of the border for each segment
    },
  ],
};
// Return the configured data structure for use in rendering a pie chart
return dataPie;
};

// Define options for a line graph
const optionsGraph = {
  plugins: {
    legend: {
      labels: {
        color: "#ffc002", // Set the color of legend labels
      },
      position: "top" // Position the legend at the top of the chart
    }
  },
  responsive: true, // Ensure the chart is responsive to the window size
  scales: {
    y: { // Configuration for the y-axis
      ticks: { // Styling for the tick marks and labels on the y-axis
        color: "#ffc002", // Color of the tick labels
        font: { // Font styling for the tick labels
          size: 17, // Font size
          weight: "bold", // Font weight
        },
      },
      title: { // Title configuration for the y-axis
        color: "#ffc002", // Color of the title text
        display: true, // Ensure the title is displayed
        text: "Price", // Title text
        padding: { // Padding around the title
          bottom: 5, // Padding at the bottom of the title
        },
        font: { // Font styling for the title
          size: 30, // Font size
          style: "italic", // Font style
          family: "Arial", // Font family
        },
      },
    },
    x: { // Configuration for the x-axis
      ticks: { // Styling for the tick marks and labels on the x-axis
        color: "#ffc002", // Color of the tick labels
        font: { // Font styling for the tick labels
          size: 17, // Font size
          weight: "bold", // Font weight
        },
      },
      title: { // Title configuration for the x-axis
        color: "#ffc002", // Color of the title text
        display: true, // Ensure the title is displayed
        text: "Date", // Title text
        padding: { // Padding around the title
          top: 5, // Padding at the top of the title
        },
        font: { // Font styling for the title
          size: 30, // Font size
          style: "italic", // Font style
          family: "Arial", // Font family
        },
      },
    },
  },
};

// Define options for a pie chart
const optionsPie = {
  plugins: {
    legend: { // Configuration for the legend of the pie chart
      labels: {
        color: "#ffc002", // Set the color of legend labels
      },
      position: "top" // Position the legend at the top of the chart
    }
  },
};









// Define a functional component `Market` that receives `isAuthenticated` as a prop
const Market = ({ isAuthenticated }) => {
  // State hooks for managing component state
  // States for global cryptocurrency market data
  const [globalMarketCap, setGlobalMarketCap] = useState();
  const [globalDayVolume, setGlobalDayVolume] = useState();
  const [totalNumberOfCoins, setTotalNumberOfCoins] = useState();

  // States for managing arrays of coins and portfolio data
  const [allCoinsArray, setAllCoinsArray] = useState([]);
  const [allCoinsList, setAllCoinsList] = useState([]);
  const [portfolioDataList, setPortfolioDataList] = useState([]);
  const [portfolioId, setPortfolioId] = useState(); // To store the current portfolio ID
  const [isLoading, setIsLoading] = useState(true); // To manage loading state
  const [dynamicData, setDynamicData] = useState({}); // For dynamic data that might be used for rendering charts or graphs
  const [historicalValue, setHistoricalValue] = useState([]); // For storing historical values of the portfolio
  const [dynamicGraph, setDynamicGraph] = useState({}); // For a dynamic graph based on the historical values

  // Custom hooks for modal functionality related to transactions and portfolio management
  const transactionModal = useTransactionModal();
  const createPortfolioModal = useCreatePortfolioModal();
  const selectPortfolioModal = useSelectPortfolioModal();

  // Import and instantiate the Coinpaprika API client for fetching market data
  const CoinpaprikaAPI = require('@coinpaprika/api-nodejs-client');
  const client = new CoinpaprikaAPI();

  // Effect hook to initialize the portfolio ID from localStorage on component mount
  useEffect(() => {
    setPortfolioId(localStorage.getItem("portfolioId"));
  }, []);

  // Effect hook to fetch portfolio data from an API when `portfolioId` changes
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        // Fetch portfolio data and historical values from the database using the portfolioId
        const response = await axios.get(`http://localhost:8000/portfolio/${portfolioId}/`);
        const response_historical_value = await axios.get(`http://localhost:8000/portfolio-history/${portfolioId}/`);
        
        // Update state with fetched data
        setPortfolioDataList(response.data);
        setHistoricalValue(response_historical_value.data);
      } catch (error) {
        console.error("Error fetching portfolio data", error);
      }
    };

    if (portfolioId) {
      fetchPortfolioData().finally(() => setIsLoading(false)); // Change the state of 'isLoading' to 'false'
    }
  }, [portfolioId]);

  // Redirect if the user is not authenticated
  if (!isAuthenticated) {
    redirect("/market");
  }

  // Effect hook to fetch global market data and all coins data on component mount
  useEffect(() => {
    client.getGlobal()
      .then((data) => {
        // Update state with global market data
        setGlobalMarketCap(data.market_cap_usd);
        setGlobalDayVolume(data.volume_24h_usd);
        setTotalNumberOfCoins(data.cryptocurrencies_number);
      })
      .catch(console.error);

    client.getTicker()
      .then((data) => {
        // Update state with all coins data
        setAllCoinsArray(data);
      })
      .catch(console.error);
  }, []);

  // Effect hook to process all coins data once it's fetched
  useEffect(() => {
    if (!allCoinsArray) {
      return; // Do nothing if `allCoinsArray` is not yet populated
    } else {
      looping(); // Call `looping` to process coins data for display
    }
  }, [allCoinsArray]);

  // useCallback hooks for modal open actions:

  // Open transaction modal
  const onTransaction = useCallback(() => {
    transactionModal.onOpen(); 
  }, [transactionModal]);

  // Open create portfolio modal
  const onCreatePortfolio = useCallback(() => {
    createPortfolioModal.onOpen(); 
  }, [createPortfolioModal]);

  // Open select portfolio modal
  const onSelectPortfolio = useCallback(() => {
    selectPortfolioModal.onOpen(); 
  }, [selectPortfolioModal]);

  // Function to limit the coins list to the first 100 entries for display
  const looping = () => {
    let newCoinsList = allCoinsArray.slice(0, 100);
    setAllCoinsList(newCoinsList);
  };

  // Function to process data for a pie chart visualization
  const pieChart = (object) => {
    let listToReturn = [[],[]]; // Initialize an array to hold names and holdings

    Object.values(object)?.map((value) => { 
      listToReturn[0].push(value.name); // Collect coin names
      listToReturn[1].push(value.holdings); // Collect coin holdings
    });

    return listToReturn; // Return the processed data for pie chart
  }



    // Function to transform historical data into a format suitable for rendering a graph.
    const Graph = (object) => {
      let listToReturn = []; // Initialize an empty array to hold transformed data.

      // Iterate over each value in the input object, transforming it for graphing.
      Object.values(object)?.map((value) => {
        // Push an object with 'date' (formatted from 'date_time') and 'price' into the list.
        listToReturn.push({date: value.date_time.slice(0,10), price: value.total_value});
      });

      console.log("listToReturn", listToReturn); // Log the transformed list for debugging.
      return listToReturn; // Return the transformed list for use in graphing.
    }

// Check the portfolio data list and update the loading state accordingly.
useEffect(() => {
  // If the portfolio data list is not empty, set loading to false.
  if (Object.keys(portfolioDataList).length > 0) {
    setIsLoading(false);
  };
}, [portfolioDataList]);

// Process and update the component state for visualizations based on the portfolio data list.
useEffect(() => {
  // Process portfolio data to generate inputs for a pie chart.
  var pieChartInputs = pieChart(portfolioDataList);
  // If valid pie chart inputs exist, generate dynamic pie chart data and update state.
  if (pieChartInputs && pieChartInputs[0].length > 0) {
    const dynamicDataPie = createDataPie(pieChartInputs[0], pieChartInputs[1]);
    setDynamicData(dynamicDataPie); // Update dynamic data state with pie chart data.
  }

  // Process historical data to generate inputs for a graph.
  var GraphInputs = Graph(historicalValue);

  // If valid graph inputs exist, generate dynamic graph data and update state.
  if (GraphInputs && GraphInputs.length > 0) {
    const Graph = createGraph(GraphInputs); // This shadows the Graph function; consider renaming.
    setDynamicGraph(Graph); // Update dynamic graph state with new data.
  }
}, [portfolioDataList]); // This effect is dependent on changes to the portfolio data list.


// Check if the component is currently loading, and display a loading indicator if true.
if (isLoading) return <div>Loading...</div>;

return (
  // Wraps the component in a Redux Provider to pass the Redux store down to the components.
  <Provider store={store}>
    <Layout store={store}> {/* Custom layout component that might be using 'store' for additional context or setup */}
      <div>
        {/* Spacing div to push content down the page */}
        <div className="pt-[120px]">
          {/* Centered title with buttons for portfolio actions */}
          <div className="flex justify-center gap-0 font-bold text-6xl">
            <div className="flex justify-center gap-0 my-10 font-bold text-6xl">
              {/* Button to select a portfolio, with a wallet icon */}
              <Button
                btnName={<HiMiniWallet size={42} />}
                handleClick={() => onSelectPortfolio()}
                classStyles={" text-yellow bg-blue cursor-pointer"}
                type="submit"
              />
              {/* Dynamically displays the portfolio name or a loading message */}
              <h1>
                {Object.values(portfolioDataList)[0]?.portfolio_name || "Loading portfolio name..."} 
              </h1>
              {/* Button to create a new portfolio, with an add icon */}
              <Button
                btnName={<MdAddToPhotos size={42} />}
                handleClick={() => onCreatePortfolio()}
                classStyles={" text-yellow bg-blue cursor-pointer"}
                type="submit"
              />
            </div>
          </div>
          {/* Displays market statistics and a button to add a new coin */}
          <div className="flex justify-center ml-10 gap-10">
            <InfoChart data={`$ ${globalMarketCap}`} whichOne="Market Capitalisation"/>
            <InfoChart data={`$ ${globalDayVolume}`} whichOne="24H Trading Volume"/>
            <InfoChart data={totalNumberOfCoins} whichOne="Number of Crypto"/>
            <Button classStyles="ml-[20px] mt-1 text-black bg-yellow mb-3 self-end justify-center w-[140px]" type="submit" btnName="+ Add Coin" handleClick={() => onTransaction()}/>
          </div>
        </div>
        <div>
          {/* Placeholder for dynamic graph rendering */}
          <h1 className="font-bold text-3xl text-center mt-10"></h1>
          <div className="flex mx-auto justify-auto">
            <div style={{ width: "900px", height: "400px", padding: "20px", cursor: "pointer", }}>
              {/* Conditionally renders a line chart or a message if no data is available */}
              {dynamicGraph && dynamicGraph.datasets && dynamicGraph.datasets.length > 0 ? (
                <Line data={dynamicGraph} options={optionsGraph}/>
              ) : (
                <div>No data available</div>
              )}
            </div>
            <div>
              {/* Conditionally renders a doughnut chart or a message if no data is available */}
              {dynamicData && dynamicData.datasets && dynamicData.datasets.length > 0 ? (
                <Doughnut data={dynamicData} options={optionsPie}/>
              ) : (
                <div>No data available</div>
              )}
            </div>
          </div>
        </div>
        {/* Renders a table header for portfolio coins data */}
        <div className="pt-[10px] mx-auto w-11/12 rounded-md">
          <table className="table bg-yellow pb-10 dark:bg-black rounded-t-2xl w-full text-sm text-left text-gray-800 dark:text-white">
            <tbody className="text-lg font-bold ">
              {/* Table headers for coin data */}
              <tr>
                <th className="pl-10 w-1/12 py-3"></th>
                <th className="w-1/12 py-3 text-xl ">Coin</th>
                <th className="w-1/12 py-3 text-xl ">Price</th>
                <th className="w-1/12 py-3 text-xl ">1H</th>
                <th className="w-1/12 py-3 text-xl ">24H</th>
                <th className="w-1/12 py-3 text-xl ">7D</th>
                <th className="w-1/12 py-3 text-xl ">Quantity</th>
                <th className="w-1/12 py-3 text-xl ">Holdings</th>
                <th className="w-1/12 py-3 text-xl ">uP&l</th>
                <th className="w-1/12 py-3 text-xl ">rP&L</th>
              </tr>
            </tbody>
          </table>
          {/* Maps over portfolio data list to render rows for each coin */}
          {portfolioDataList && Object.keys(portfolioDataList).length > 0 ? (
            Object.values(portfolioDataList).map((value) => {
              return <PortfolioCoinData 
              img={value.image + 1} 
              name={value.symbol} 
              price={`$ ${value.current_price_of_coins}`} 
              hour={`${value.hour_day_week_list_percentage_change[0].toFixed(3)}%`} 
              hours={`${value.hour_day_week_list_percentage_change[1].toFixed(3)}%`} 
              days={`${value.hour_day_week_list_percentage_change[2].toFixed(3)}%`} 
              quantity={value.total_quantity.toFixed(3)} 
              holdings={`$ ${value.holdings.toFixed(1)}`} 
              trpnl={`$ ${value.total_realized_profit_and_loss.toFixed(1)}`} 
              tupnl={`$ ${value.total_unrealized_profit_and_loss.toFixed(1)}`}/>
            })   
          ) : (
            <div>No data available</div> // Displayed if no portfolio data is available
          )}
        </div>
      </div>
    </Layout>
  </Provider>
);

};

// Define a function to map the Redux store's state to props that will be passed to the component.
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Connecting the Market component to Redux store with mapStateToProps and the signup action.
export default connect(mapStateToProps, { })(Market); 



