"use client"

import ResetPassword from "../../../../containers/ResetPassword";

import { Provider } from "react-redux";
import store from "../../../store";
import Layout from "../../../../hooks/Layout";



export default function login() {
    return (
        <Provider store={store}>
            <Layout store={store}>
                <div className="dark:bg-black">
                    <ResetPassword />
                </div>
            </Layout>
        </Provider>

    )
  }

