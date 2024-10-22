"use client"; // Indicates that the following code should only run on the client-side.

import Button from "../components/Button"; // Imports a reusable Button component from the components directory.

import { connect } from "react-redux"; // Imports the connect function from react-redux to connect the component to the Redux store.
import { useState } from "react"; // Imports the useState hook from React for managing component state.
import { verify } from "../app/actions/auth"; // Imports the verify action creator from the auth actions file.
import { redirect } from 'next/navigation'; // Imports the redirect function from Next.js navigation for client-side redirection.
import { useParams } from "next/navigation"; // Imports the useParams hook from Next.js navigation to access URL parameters.

// The Activate component is connected to Redux store and receives the verify action as a prop.
const Activate = ({ verify }) => {
    // useState hook to manage the verification state of the account.
    const [verified, setVerified] = useState(false);
    // Initialises 'params' constant using useParams hook.
    const params = useParams();
    
    // Function to handle account verification. It extracts uid and token from URL params and calls the verify action.
    const verifyAccount = e => {
        const uid = params.uid // Retrieves the user ID from URL parameters.
        const token = params.token // Retrieves the token from URL parameters.

        verify(uid, token); // Calls the verify action with the user ID and token.
        setVerified(true); // Updates the verified state to true.

    };

    // If the account is verified, redirects to the "/market" page.
    if (verified) {
        redirect("/market")
    }

    // Renders the account verification UI.
    return (
      <div>
        <div className="pt-[120px] flex justify-center">
          <div className="bg-black1 bg-opacity-0 w-4/5 px-16 py-16 self-center mt-2 md:w-4/5 lg:max-w-lg rounded-md ">
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold">Verify your Account:</h1>
              {/* Button component is used here with an onClick event handler to trigger the verifyAccount function. */}
              <Button classStyles="mt-1 flex self-end w-2/5 justify-center bg-yellow" type="submit" btnName="Verify" handleClick={() => verifyAccount()}/>
            </div>
          </div>
        </div>    
      </div>
    );
};

// Connects the Activate component to the Redux store and maps the verify action to the component's props.
export default connect(null, { verify })(Activate);