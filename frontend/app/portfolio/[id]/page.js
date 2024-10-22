"use client"; // Indicates that the following code should only run on the client-side.

// Imports the Redux store configuration from a relative path. This store is where all the state management happens.
import store from "../../store"; 

// Imports the Provider component from 'react-redux'. This component is used to pass the Redux store down to the React component tree.
import { Provider } from "react-redux"; 

// Imports Layout, a custom React component for consistent layout across different parts of the application.
import Layout from "../../../hooks/Layout";

// Imports SinglePortfolio from a local file.
import SinglePortfolio from "../../../containers/SinglePortfolio";

// Defines a functional component named Portfolio. This is a React component.
export default function Portfolio() {
  return (
      // The Provider component wraps the entire return statement, making the Redux store available to all child components.
      <Provider store={store}>
          {/* Layout component wraps the main content of this component, providing a consistent header, footer, and other layout elements. */}
          <Layout store={store}>
              {/* This div controls the background color of the SinglePortfolio component. */}
              <div className="dark:bg-black bg:white">
                  {/* SinglePortfolio component is rendered here, showing the details of a portfolio item. */}
                  <SinglePortfolio />
              </div>
          </Layout>
      </Provider>
  )
}
