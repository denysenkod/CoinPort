"use client" // Indicates that the following code should only run on the client-side.

// React's useState hook for component state management
import { useState } from "react";
// Connects React component to Redux store
import { connect } from "react-redux";
// Next.js's Link for client-side routing
import Link from 'next/link';
// Next.js's redirect for programmatically navigating to different routes
import { redirect } from 'next/navigation';
// Action creator for signing up a user
import { signup } from "../app/actions/auth";
// Custom Input component for form fields
import Input from "../components/Input";
// Custom Button component for actions like submit
import Button from "../components/Button";


// The Signup functional component receives the signup action and isAuthenticated prop from Redux.
const Signup = ({ signup, isAuthenticated }) => {
    // Local state to manage form data and account creation status.
    const [accountCreated, setAccountCreated] = useState(false);
    const [ formData, setFormData ] = useState({
        username: "",
        email: "",
        password: "",
        re_password: "",
    });

    // Destructuring formData for easy access.
    const { username, email, password, re_password } = formData;
    
    // Handler for form input changes, updating formData state.
    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value }); console.log(formData);
    
    // Handler for form submission.
    const onSubmit = e => {
    // Check if passwords match before submitting.
    if (password === re_password) {
        // Calls the signup action with form data.
        signup(username, email, password, re_password);
        // Sets account creation status to true.
        setAccountCreated(true);
      }
    };
    
    // Redirects authenticated users to the market page.
    if (isAuthenticated) {
      redirect("/market")
    }

    // Redirects users to the login page once the account is created.
    if (accountCreated) {
        redirect("/verification/login")
    }

    // Render method for the signup form.
    return (
      <div>
        <div className="pt-[120px] flex justify-center">
          <div className="bg-black1 bg-opacity-0 w-4/5 px-16 py-16 self-center mt-2  md:w-4/5 lg:max-w-lg rounded-md ">
            <h2 className="text-yellow text-4xl mb-8 font-semibold">
              Sign Up
            </h2>
            <div className="flex flex-col ">
              {/* Input components for username, email, password, and password confirmation with change handlers. */}
              <Input id="username" label="Username" register={() => {}} inputType="text" name="name" handleClick={(e) => onChange(e)} required = {true} />
              <Input id="email" label="Email" register={() => {}} inputType="email" name="email" handleClick={(e) => onChange(e)} required = {true} />
              <Input id="password" label="Password" register={() => {}} inputType="password" name="password" minLength='6' handleClick={(e) => onChange(e)} required = {true}/>
              <Input id="re_password" label="Confirm Password" register={() => {}} inputType="password" name="re_password" minLength='6' handleClick={(e) => onChange(e)} required = {true}/>
              {/* Link to the login page for users who already have an account. */}
              <Link href="/verification/login" className="flex self-end">
                  <div className="self-right my-[10px]">
                    <p className="text-lg font-semibold light">
                      Already have an Account?
                    </p>
                  </div>  
              </Link>
              {/* Button component for submitting the form. */}
              <Button classStyles=" mt-1 flex self-end w-2/5 justify-center bg-yellow" type="submit" btnName="Register" handleClick={() => onSubmit(formData)}/>
            </div>
          </div>
        </div>    
      </div>
    );
};

// Mapping Redux state to props for the component.
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

});

// Connecting the Signup component to Redux store with mapStateToProps and the signup action.
export default connect(mapStateToProps, { signup })(Signup);