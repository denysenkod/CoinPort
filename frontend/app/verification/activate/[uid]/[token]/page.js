"use client"; // Indicates that the following code should only run on the client-side.

// Import Activate component for user account activation functionality.
import Activate from "../../../../../containers/Activate";
// Import Provider from react-redux to make the Redux store available to React components.
import { Provider } from "react-redux";
// Import the Redux store configured with combined reducers.
import store from "../../../../store";
// Import Layout component to structure the UI and provide consistent layout across the app.
import Layout from "../../../../../hooks/Layout";

// Define and export a React component function for the login page.
export default function login() {
    return (
        // Use Provider to pass the Redux store down to the React component tree.
        <Provider store={store}>
            {/* Wrap the page content within the Layout component for consistent styling and structure. */}
            <Layout>
                {/* Apply dark mode background styling conditionally and render the Activate component. */}
                <div className="dark:bg-black">
                    <Activate />
                </div>
            </Layout>
        </Provider>
    );
}
