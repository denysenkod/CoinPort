"use client" // Indicates that the following code should only run on the client-side.
import { useEffect } from "react"; // Imports useEffect hook from React for running side effects in the component.
import { connect } from "react-redux"; // Connects React component to Redux store for state management and dispatching actions.
import { checkAuthenticated, load_user } from "@/app/actions/auth"; // Imports action creators for authentication checks and loading user data.

// Defines the Layout component that wraps child components, often used to include global components like headers or footers.
const Layout = (props) => {
    useEffect(() => {
        // Immediately after mounting, check if the user is authenticated and load user data.
        props.checkAuthenticated();
        props.load_user();
    }, []); // The empty dependency array means this effect runs only once after the initial render.

    return (
        <div>
            {/* Button component for submitting the form. */}
            {props.children} 
        </div>
    )
}

// Connects the Layout component to the Redux store, enabling it to dispatch the checkAuthenticated and load_user actions.
export default connect(null, { checkAuthenticated, load_user })(Layout);
