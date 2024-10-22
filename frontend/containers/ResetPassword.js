"use client"; // Indicates that the following code should only run on the client-side.

// Imports the Input and Button components from the local components folder.
import Input from "../components/Input";
import Button from "../components/Button";

// Imports the connect function from React Redux for connecting the component to the Redux store,
// useState hook from React for managing local state,
// and redirect function from Next.js for navigation.
import { connect } from "react-redux";
import { useState } from "react";
import { redirect } from 'next/navigation';
// Imports the reset_password action from the auth actions within the app's Redux actions.
import { reset_password } from "../app/actions/auth";

// The ResetPassword component is defined as a functional component that receives reset_password as a prop,
// which is an action creator for resetting passwords.
const ResetPassword = ({ reset_password }) => {
    // useState hook to manage the requestSent state, indicating whether the reset request has been sent.
    const [ requestSent, setRequestSent ] = useState(false);

    // useState hook to manage the formData state, initially set to an object with an email field.
    const [ formData, setFormData ] = useState({
        email: ""
    });

    // Destructures the email value from formData for easy access.
    const { email } = formData;

    // Function to update formData state based on input changes, dynamically using the input's id as the key.
    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value }); console.log(formData);

    // Function to handle form submission, which dispatches the reset_password action with the email,
    // and sets requestSent to true.
    const onSubmit = e => {
        reset_password(email);
        setRequestSent(true);
    };

    // Checks if requestSent is true, and if so, redirects to the home page.
    if (requestSent) {
        redirect("/")
    }

    // The component returns JSX for the reset password form, including Input and Button components.
    // Styling and layout are handled through Tailwind CSS classes.
    return (
      <div>
        <div className="pt-[120px] flex justify-center">
          <div className="bg-black1 bg-opacity-0 w-4/5 px-16 py-16 self-center mt-2 md:w-4/5 lg:max-w-lg rounded-md ">
            <h2 className="text-yellow text-3xl mb-8 font-semibold">
              Reset Password
            </h2>
            <div className="flex flex-col gap-4">
              <Input id="email" label="Email" inputType="email" name="email" register={() => {}} handleClick={(e) => onChange(e)} required = {true} />   
              <Button classStyles="mt-1 flex self-end w-2/5 justify-center bg-yellow" type="submit" btnName="Submit" handleClick={() => onSubmit(formData)}/>
            </div>
          </div>
        </div>    
      </div>
    );
};

// Connects the ResetPassword component to the Redux store mapping the reset_password prop.
export default connect(null, { reset_password })(ResetPassword);
