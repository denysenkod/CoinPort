// Import combineReducers function from redux. 
// This function is used to combine multiple reducers into a single reducing function.
import  { combineReducers } from 'redux'; 

// Imports the auth reducer from a local file. 
// The auth reducer is responsible for managing authentication-related state in the application.
import auth from './auth'; 

// Exports the combined reducer.
export default combineReducers({
    auth // Incorporates the auth reducer under the 'auth' key of the global application state.
});