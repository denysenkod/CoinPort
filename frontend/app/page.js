"use client"; // Indicates that the following code should only run on the client-side.

// Import the Provider component from react-redux to integrate Redux state management.
import { Provider } from "react-redux";
// Import the Redux store configured for the application.
import store from "./store";
// Import a Layout component, which is likely used for consistent layout across the app.
import Layout from "../hooks/Layout";

// Define and export a functional component for the Home page.
export default function Home() {
  return (
    // Outer div with a conditional class for dark mode styling. 
    <div className="dark:bg-black">
      {/* The Redux Provider wraps the Layout, making the Redux store available throughout the component tree. */}
      <Provider store={store}>
        {/* The Layout component is used to wrap the page content, providing consistent styling and structure. */}
        <Layout store={store}>
          {/* Inner div also styled for dark mode, ready for additional content or components. */}
          <div className="dark:bg-black">
            {/* Content or components would go here */}
          </div>
        </Layout>
      </Provider>
    </div>
  )
}
