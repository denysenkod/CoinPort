"use client"; // Indicates that the following code should only run on the client-side.
// Import a theme provider for consistent theming across the application.
import Providers_theme from "./themeProvider";
// Import global CSS styles to be applied application-wide.
import './globals.css';
// Import Montserrat font from Google Fonts for use in the application.
import { Montserrat } from 'next/font/google';
// Import Navbar component for navigation.
import Navbar from "../components/Navbar";

// Import Provider from react-redux for Redux state management.
import { Provider } from "react-redux";
// Import the configured Redux store.
import store from "./store";
// Import Layout component, likely for consistent page layout across the app.
import Layout from "../hooks/Layout";
// Import modal components for various functionalities.
import TransactionModal from "../containers/TransactionModal";
import CreatePortfolioModal from "@/containers/CreatePortfolioModal";
import SelectPortfolioModal from "@/containers/SelectPortfolioModal";
// Import a toaster provider for managing toast notifications.
import ToasterProvider from "./providers/ToasterProvider";

// Initialize the Montserrat font with specific subsets.
const montserrat = Montserrat({ subsets: ['latin'] })

// Define and export the RootLayout component, accepting children props for nested content.
export default function RootLayout({ children }) {
  return (
    // Define the root HTML element with the language set to English.
    <html lang="en">
      {/* Head section is empty, potentially for further meta tags or scripts inclusion. */}
      <head />
        {/* Body applies Montserrat font class and dark mode background styling. */}
        <body className={`${montserrat.className} dark:bg-black`}>
            {/* The main wrapper also applies the same styling. */}
            <div className={`${montserrat.className} dark:bg-black`}>
                {/* Provide the Redux store to child components. */}
                <Provider store={store}>
                  {/* Layout component wraps the application's structural layout. */}
                  <Layout store={store} >
                      {/* A div wrapper for the main content, applying the Montserrat font class. */}
                      <div className={`${montserrat.className}`}>
                        {/* ToasterProvider component for managing toast notifications. */}
                        <ToasterProvider />
                        {/* Navbar component for navigation, styled with Montserrat font. */}
                        <Navbar className={`${montserrat.className}`}/>
                        {/* Modal components for transaction, portfolio creation, and selection. */}
                        <TransactionModal />
                        <CreatePortfolioModal />
                        <SelectPortfolioModal />
                      </div>
                      {/* Theme provider wraps children components, enabling theming support. */}
                      <Providers_theme attribute="class">{children}</Providers_theme>
                    </Layout>
                </Provider>
            </div>
        </body>
    </html>
  )
}
