"use client"; // Indicates this script is intended to run in a client-side environment.


import 'tailwindcss/tailwind.css'; // Import Tailwind CSS for styling.
import { Fragment, useCallback } from 'react'; // Import Fragment for grouping and useCallback for memoizing callbacks.
import { useTheme } from "next-themes"; // Hook for handling theme switching in Next.js applications.
import Image from "next/image"; // Next.js optimized image component for responsive and optimized images.
import Link from "next/link"; // Next.js component for client-side navigation.
import { FaRegMoon } from "react-icons/fa"; // Moon icon for dark mode toggle.
import { ImSun } from "react-icons/im"; // Sun icon for light mode toggle.
import { logout } from "../app/actions/auth"; // Redux action for logging out the user.
import { connect } from "react-redux"; // Function to connect a React component to the Redux store.
import useSelectPortfolioModal from "@/hooks/useSelectPortfolioModal"; // Custom hook for handling the portfolio selection modal.
import useCreatePortfolioModal from "@/hooks/useCreatePortfolioModal"; // Custom hook for handling the portfolio selection modal.
import Button from "./Button"; // Custom button component.
import logo from "../assets/logo.png"; // Logo image for the navbar.


// Navbar component accepting `logout` action and `isAuthenticated` state as props.
const Navbar = ({ logout, isAuthenticated }) => {
    // Hook to access and set the current theme.
    const { theme, setTheme } = useTheme();
    // Hook to manage the state and functions of the portfolio modal.
    const selectPortfolioModal = useSelectPortfolioModal();
    const createPortfolioModal = useCreatePortfolioModal();


    // Component for non-authenticated user links (Login and Sign up).
    const guestLinks = () => (
        <Fragment>
            <Link href="/verification/login">
                <p className="
                    font-bold 
                    text-2xl                                
                    py-[15px]
                    px-2
                ">
                    Login
                </p>
            </Link>
            <Link href="/verification">
                <p className="
                    font-bold 
                    text-2xl                                
                    py-[15px]
                    px-2
                ">
                    Sign up
                </p>
            </Link>
        </Fragment>
    );

    // Component for authenticated user links (Portfolio and Logout).
    const authLinks = () => (
            <Fragment className="font-bold text-2xl">
                <Button 
                      btnName={
                        "Add Portfolio"
                        }
                      handleClick={
                        () => onCreatePortfolio()
                      }
                      classStyles={"font-bold text-2xl py-[15px] px-2 text-yellow cursor-pointer"}
                      type="submit"
                    />
                <Button 
                      btnName={
                        "Portfolios"
                        }
                      handleClick={
                        () => onSelectPortfolio()
                      }
                      classStyles={"font-bold text-2xl py-[15px] px-2 text-yellow cursor-pointer"}
                      type="submit"
                    />
                <a className="font-bold text-2xl py-[15px] px-2"
                    href="#!"
                    onClick={logout}
                >
                    Logout
                </a>
            </Fragment>
        
        
    );

    // Memoized callback function to open the portfolio selection modal.
    const onSelectPortfolio = useCallback(() => {
        selectPortfolioModal.onOpen();
      }, [selectPortfolioModal]);

    // Memoized callback function to open the portfolio selection modal.
    const onCreatePortfolio = useCallback(() => {
        createPortfolioModal.onOpen();
      }, [createPortfolioModal]);
  
    // Main navbar JSX structure.
    return (
            <nav 
                className="
                    flex
                    w-full
                    fixed 
                    z-10 
                    p-3
                    sm:justify-between
                    justify-center
                    border-2
                    border-dashed
                    rounded-3xl
                    border-yellow
                    bg-blue
                    dark:bg-black
                    ">
                {/* Logo and navigation links */}
                <div className="flex flex-row justify-start">
                        <Link href="/">
                            <Image src={logo} width={60} h={50} objectFit="contain" alt="logo"/>                        
                        </Link>
                    <Link href="/">
                        <div className="hidden md:flex">
                            <p className="
                          text-yellow
                            font-bold 
                            text-2xl
                            py-[15px]
                            px-2
                            ">
                                CoinPort
                            </p>
                        </div>
                    </Link>
                    <Link href="/market">
                            <p className="
                            hidden
                            sm:flex
                            dark:text-yellow
                            font-bold 
                            text-2xl
                            py-[15px]
                            px-2
                            ">
                                Market
                            </p>
                    </Link>
                </div>
                {/* Theme toggle and authentication links */}
                <div className="flex flex-row ">
                    {/* Theme toggle button only visible on small screens and up. */}
                    <div className="hidden sm:flex">
                        <div className="flex items-center pr-2 cursor-pointer">
                            {/* Container for the theme toggle switch */}
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <div className="flex justify-center items-center">
                                    <span className="mr-1">   
                                        <FaRegMoon />
                                    </span>
                                    <label className="relative flex justify-start items-center cursor-pointer">
                                        {/* Theme toggle input */}
                                        <input type="checkbox" value="" className="sr-only peer" onClick={() => setTheme(theme === "light" ? "dark" : "light")}/>
                                        {/* Custom styling for the toggle switch */}
                                        <div className="pr-8 w-14 h-7 bg-yellow rounded-full peer dark:bg-yellow  peer-checked:after:translate-x-7 after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white dark:after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow"></div>
                                    </label>
                                    <span className="ml-1">
                                        <ImSun />
                                    </span>
                                </div>
                            </div>                   
                        </div>
                    </div>
                    <div className="flex flex-row">
                    {/* Conditionally render guest links or auth links based on authentication status. */}
                    {isAuthenticated ? authLinks() : guestLinks()}
                </div>
            </div>
        </nav>
    );
};

// Function to map Redux state to component props.
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

// Connects the Navbar component to the Redux store and exports it.
export default connect(mapStateToProps,{ logout })(Navbar);
