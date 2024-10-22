"use client"; // Indicates that the following code should only run on the client-side.

// Importing reusable Input and Button components from a local directory, and Link from Next.js for client-side navigation.
import Input from "../components/Input";
import Button from "../components/Button";
import Link from 'next/link';

// Import connect function from react-redux for connecting the component to the Redux store, and useState hook from React for state management.
import { connect } from "react-redux";
import { useState } from "react";

// Importing the login action creator for dispatching the login action.
import { login } from "../app/actions/auth";

// Importing the redirect function from Next.js for server-side redirects.
import { redirect } from 'next/navigation'

// The Login component, receiving props including the login action creator and a prop to check if the user is authenticated.
const Login = ({ login, isAuthenticated }) => {
    // Local state for form data, using useState hook.
    const [ formData, setFormData ] = useState({
        username:"",
        email: "",
        password: "",
    });

    // Destructuring formData to get individual fields.
    const { username, email, password } = formData;
   

    // Handler for form field changes, updating local state with the new values.
    const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value }); 

    // Handler for form submission, calls the login action creator with the form data.
    const onSubmit = e => {
    login(username, email, password)
    };

    // Redirects to the "/market" page if the user is already authenticated.
    if (isAuthenticated) {
        redirect("/market")
    }

    // The component's JSX. Renders a login form with Input components for username, email, and password, and a Button component for form submission.
    // Includes Links for navigation to account creation and password reset pages.
    return (
      <div>
        <div className="pt-[120px] flex justify-center">
          <div className="bg-black1 bg-opacity-0 w-4/5 px-16 py-16 self-center mt-2 md:w-4/5 lg:max-w-lg rounded-md ">
            <h2 className="text-yellow text-4xl mb-8 font-semibold">
              Login
            </h2>
            <div className="flex flex-col gap-4">
              {/* Input components for username, email, and password with change handlers. */}
              <Input id="username" label="Username" inputType="text" register={() => {}} name="username" handleClick={(e) => onChange(e)} required = {true} /> 
              <Input id="email" label="Email" inputType="email" register={() => {}} name="email" handleClick={(e) => onChange(e)} required = {true} />
              <Input id="password" label="Password" inputType="password" register={() => {}} name="password" minLength='6' handleClick={(e) => onChange(e)} required = {true}/>
              {/* Link componens for navigating to the account creation page. */}
              <Link href="/verification" className="flex self-end">
                <p className="text-lg font-semibold light">
                  Create an account
                </p>
              </Link>
              {/* Button component for submitting the form, invoking the onSubmit handler. */}
              <Button classStyles="mt-1 bg-yellow flex self-end w-2/5 justify-center" type="submit" btnName="Sign in" handleClick={() => onSubmit(formData)}/>
              {/* Link component for navigating to the password reset page. */}
              <Link href="/verification/login/reset-password" className="flex self-center">
                <p className="text-xl font-semibold">
                  Forgot your password?
                </p>
              </Link>
            </div>
          </div>
        </div>    
      </div>
    );
};

// Maps Redux state to the component's props.
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated

});

// Connects the Login component to the Redux store, providing the mapStateToProps and the login action creator as props.
export default connect(mapStateToProps, { login })(Login);