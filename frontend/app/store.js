// Imports the configureStore function from Redux Toolkit for configuring the store.
import { configureStore } from '@reduxjs/toolkit';

// Imports the combined reducers from the "reducers" directory. This rootReducer combines all the slice reducers.
import rootReducer from "./reducers";

// Imports redux-logger, a middleware for logging actions and state changes in the console, useful for development.
import logger from 'redux-logger'

// Defines an initial state object.
const initialState = {};

// Configures and exports the Redux store.
export const store = configureStore({
  reducer: rootReducer, // Specifies the root reducer that combines all slice reducers.
  initialState, // Sets the initial state for the Redux store.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger), // Adds redux-logger to the default middleware provided by Redux Toolkit.
  devTools: true, // Enables Redux DevTools extension for a better debugging experience.
})

// Exports the configured store as the default export of the module.
export default store;
