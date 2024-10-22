"use client" // Indicates that the following code should only run on the client-side.
import axios from 'axios'; // Import axios for making HTTP requests
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast for showing messages

// Import action type constants
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
} from "./types";


// Action to check if the user is authenticated
export const checkAuthenticated = () => async dispatch => {
    // Check if the 'access' token exists in localStorage
    if (localStorage.getItem("access")) {
        // Configuration for the axios request
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        };

        // Create request body with the token
        const body = JSON.stringify({ token: localStorage.getItem("access") });

        try {
            // Attempt to verify the token by making a POST request
            const res = await axios.post("http://localhost:8000/auth/jwt/verify/", body, config)

            // Check the response code to determine if the token is valid
            if (res.data.code !== "token_not_valid") {
                // Dispatch AUTHENTICATED_SUCCESS action if the token is valid
                 dispatch({
                     type: AUTHENTICATED_SUCCESS
                 });
            } else {
                // Dispatch AUTHENTICATED_FAIL action if the token is not valid
                 dispatch({
                     type: AUTHENTICATED_FAIL
                 });
            }
        } catch (err) {
            // Dispatch AUTHENTICATED_FAIL action if the request fails
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        // Dispatch AUTHENTICATED_FAIL action if no token is found
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
}


// Action to load the user's data
export const load_user = () => async dispatch => {
    // Check if the 'access' token exists in localStorage
    if (localStorage.getItem("access")) {
        // Configuration for the axios request including the Authorization header
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem("access")}`,
                'Accept': 'application/json',
            }
        };

        try {
            // Attempt to fetch the user's data
            const res = await axios.get(`http://localhost:8000/auth/users/me/`, config);
            
            // Dispatch USER_LOADED_SUCCESS action along with the user's data if request is successful
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            // Log error and dispatch USER_LOADED_FAIL action if the request fails
            console.log("LOADUSER ERROR", err);
            dispatch({
                type: USER_LOADED_FAIL
            })
        }
    } else {
        // Log message and dispatch USER_LOADED_FAIL action if no token is found.
        dispatch({
            type: USER_LOADED_FAIL
        })
    }
};


// Defines an asynchronous action creator for logging in a user.
export const login = (username, email, password) => async dispatch => {
    // Configuration for axios request, setting Content-Type to application/json.
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Serializes the email and password into a JSON string for the request body.
    const body = JSON.stringify({ email, password });

    try {
        // Attempts to post login credentials to obtain a JWT token.
        const res = await axios.post(`http://localhost:8000/auth/jwt/create/`, body, config);
        // Attempts to post login credentials to a different endpoint to obtain a different token.
        const res_two = await axios.post('http://localhost:8000/token/', body, config);

        // Stores token in localStorage for session management.
        localStorage.setItem("token", res_two.data.token);
        
        // Dispatches LOGIN_SUCCESS action with the data from the first response.
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        // Calls the load_user action to fetch and load user details.
        dispatch(load_user());
        // Shows a success toast notification to the user.
        toast.success("You are logged in");
    } catch (err) {
        // On failure, shows an error toast and logs the error.
        toast.error("Something went wrong");
        // Dispatches LOGIN_FAIL action to update the application state.
        dispatch({
            type: LOGIN_FAIL
        })
    }
};


// Defines an asynchronous action creator for signing up a new user.
export const signup = (username, email, password, re_password) => async dispatch => {

    // Configuration for axios request, setting Content-Type to application/json.
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Serializes the user data into a JSON string for the request body.
    const body = JSON.stringify({ username, email, password, re_password });

    try {
        // Attempts to post the signup data to the server.
        const res = await axios.post(`http://localhost:8000/auth/users/`, body, config);

        // Dispatches SIGNUP_SUCCESS action with the response data.
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });

        // Shows a success toast prompting the user to check their email.
        toast.success("Check out your mail");
        
    } catch (err) {
        // On failure, shows an error toast and dispatches SIGNUP_FAIL action.
        toast.error("Something went wrong");
        dispatch({
            type: SIGNUP_FAIL
        });
        
    }
};


// Defines an asynchronous action creator for verifying a user's account with a UID and token.
export const verify = (uid, token) => async dispatch => {
    // Configuration for axios request, setting Content-Type to application/json.
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Serializes the UID and token into a JSON string for the request body.
    const body = JSON.stringify({ uid, token });

    try {
        // Attempts to post the verification data to the server.
        await axios.post(`http://localhost:8000/auth/users/activation/`, body, config);

        // Dispatches ACTIVATION_SUCCESS action if the verification is successful.
        dispatch({
            type: ACTIVATION_SUCCESS,
        });
        // Shows a success toast notification to the user.
        toast.success("Verified!")
    } catch (err) {
        // On failure, shows an error toast and dispatches ACTIVATION_FAIL action.
        toast.error("Something went wrong")
        dispatch({
            type: ACTIVATION_FAIL,
        })
    }
};


// Defines an asynchronous action creator for initiating a password reset request.
export const reset_password = (email) => async dispatch => {
    // Sets up the headers for the HTTP request, specifying JSON content type.
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Serializes the email address into a JSON string for the request body.
    const body = JSON.stringify({ email });

    try {
        // Attempts to post the password reset request to the backend.
        axios.post("http://localhost:8000/auth/users/reset_password/", body, config);

        // Dispatches PASSWORD_RESET_SUCCESS action type on successful request submission.
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
        // Shows a success toast notification instructing the user to check their email.
        toast.success("Check out your mail");
    } catch (err) {
        // On failure, shows an error toast notification and dispatches PASSWORD_RESET_FAIL action type.
        toast.error("Something went wrong");
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};


// Defines an asynchronous action creator for confirming a password reset with a token.
export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    // Sets up the headers for the HTTP request, specifying JSON content type.
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };

    // Serializes the provided data (UID, token, new passwords) into a JSON string for the request body.
    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        // Attempts to post the password reset confirmation to the backend.
        axios.post("http://localhost:8000/auth/users/reset_password_confirm/", body, config);

        // Dispatches PASSWORD_RESET_CONFIRM_SUCCESS action type on successful password reset confirmation.
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
        // Shows a success toast notification indicating the password reset was successful.
        toast.success("Password reset");
    } catch (err) {
        // On failure, shows an error toast notification and dispatches PASSWORD_RESET_CONFIRM_FAIL action type.
        toast.error("Something went wrong");
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};

// Defines an action creator for logging out.
export const logout = () => dispatch => {
    // Dispatches LOGOUT action type to update the application state accordingly.
    dispatch({
        type: LOGOUT
    })
    // Shows a success toast notification indicating the user has been logged out.
    toast.success("You are logged out!");
};
