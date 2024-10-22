"use client"; // Indicates that the following code should only run on the client-side.

// Import the configured Redux store to manage application state.
import store from "../store";
// Import the Provider component from react-redux to make the Redux store available to connected components.
import { Provider } from "react-redux";
// Import the Layout component, which is used to apply consistent layout styling across the app.
import Layout from "../../hooks/Layout";
// Import the Signup component, which contains the form and logic for user registration.
import Signup from "../../containers/Signup";

// Define and export a functional component for the SignUp page.
export default function SignUp() {
  return (
    // Wrap the entire component tree in the Provider to pass the Redux store down.
    <Provider store={store}>
      {/* Layout component used to wrap page content. */}
      <Layout>
        {/* A div container with conditional styling for dark mode; inside it, the Signup component is rendered. */}
        <div className="dark:bg-black">
          <Signup />
        </div>
      </Layout>
    </Provider>
  );
}



