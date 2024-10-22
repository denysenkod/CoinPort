"use client"; // Indicates that the following code should only run on the client-side.

// Import custom Input and Button components for the form.
import Input from "../components/Input";
import Button from "../components/Button";

// Import the connect function from react-redux to connect the component to the Redux store.
import { connect } from "react-redux";
// Import useState hook from React for state management within the component.
import { useState } from "react";
// Import redirect and useParams hooks from Next.js for navigation and accessing URL parameters.
import { redirect, useParams } from 'next/navigation';
// Import the reset_password_confirm action from the auth actions file for dispatching.
import { reset_password_confirm } from "../app/actions/auth";

// Define the ResetPasswordConfirm functional component.
const ResetPasswordConfirm = ({ reset_password_confirm }) => {
    // State to track if the password reset request has been sent.
    const [requestSent, setRequestSent] = useState(false);

    // State for form data management, initializing password fields as empty strings.
    const [formData, setFormData] = useState({
        new_password: "",
        re_new_password: ""
    });

    // Use useParams hook to access URL parameters.
    const params = useParams();

    // Destructure formData to easily access the new passwords.
    const { new_password, re_new_password } = formData;

    // Handler for form inputs changes, updating formData state.
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handler for form submission.
    const onSubmit = e => {
        // Extract uid and token from URL parameters for password reset confirmation.
        const uid = params.uid;
        const token = params.token;

        // Dispatch the reset_password_confirm action with the form data and URL parameters.
        reset_password_confirm(uid, token, new_password, re_new_password);
        
        // Set requestSent to true to indicate that the request has been processed.
        setRequestSent(true);
    };

    // Redirect the user to the homepage if the request has been sent.
    if (requestSent) {
        redirect("/");
    }

    // Render the password reset confirmation form.
    return (
      <div>
        <div className="pt-[120px] flex justify-center">
          <div className="w-4/5 px-16 py-16 mt-2 lg:max-w-lg rounded-md ">
            <h2 className="text-3xl mb-8 font-semibold">
              Reset Password Confirm
            </h2>
            <div className="flex flex-col gap-4">
              {/* Input components for new password and confirmation with validation */}
              <Input label="New Password" inputType="password" name="new_password" minLength='6' handleClick={(e) => onChange(e)} required={true}/>
              <Input label="Confirm New Password" inputType="password" name="re_new_password" minLength='6' handleClick={(e) => onChange(e)} required={true}/>
              
              {/* Button component for form submission */}
              <Button classStyles="mt-1 flex self-end w-2/5 justify-center bg-yellow" type="submit" btnName="Submit" handleClick={() => onSubmit(formData)}/>
            </div>
          </div>
        </div>    
      </div>
    );
};

// Connect the component to Redux store and bind the reset_password_confirm action as a prop.
export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);