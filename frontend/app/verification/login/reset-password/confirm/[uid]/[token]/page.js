"use client"

import ResetPasswordConfirm from "../../../../../../../containers/ResetPasswordConfirm";

import { Provider } from "react-redux";
import store from "../../../../../../store";
import Layout from "../../../../../../../hooks/Layout";

export default function login() {
    return (
        <Provider store={store}>
            <Layout store={store}>
                <div className="dark:bg-black">
             
                    <ResetPasswordConfirm />
                </div>
            </Layout>
        </Provider>

    )
  }



  