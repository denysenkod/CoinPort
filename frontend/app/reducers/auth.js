// Importing action types for handling authentication-related actions
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
} from "../actions/types";

// Initial state setup for the reducer, accesing tokens from localstorage 
// when they are available or assigning a boolean false value otherwise
const initialState = {
    access: typeof window !== "undefined" ? window.localStorage.getItem('access') : false,
    refresh: typeof window !== "undefined" ?  window.localStorage.getItem('refresh') : false,
    isAuthenticated: null, // Initially, the authentication state is unknown (null).
    user: null // No user loaded initially.
}

// The reducer function updates the state based on the received action type and payload.
export default function(state = initialState, action) {
    const { type, payload } = action; // Destructures the action to get type and payload.

    switch(type) {
        // On successful authentication, sets isAuthenticated to true.
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }

        // On successful login, stores the access and refresh tokens in localStorage and updates state.
        case LOGIN_SUCCESS:
            localStorage.setItem("access", payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access, // Updates the access token in the state.
                refresh: payload.refresh // Updates the refresh token in the state.
            }
        
        // On successful signup, doesn't immediately authenticate the user (isAuthenticated remains false).
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        
        // On successful user load, updates the user state with the loaded user data.
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }

        // On authentication failure, sets isAuthenticated to false.
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }

        // If user loading fails, resets the user state to null.
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }

        // Handles login failure, signup failure, and logout by removing tokens from localStorage
        // and resetting relevant parts of the state.
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            return {
                ...state,
                access: null, // Clears the access token.
                refresh: null, // Clears the refresh token.
                isAuthenticated: false, // Sets isAuthenticated to false.
                user: null // Clears the user data.
            }
        
        // Password reset and activation actions don't alter the state but must be handled.
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAIL:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return {
                ...state // Returns the current state unchanged.
            }
        default:
            // If the action type doesn't match any cases, returns the current state unchanged.
            return state
    }
}