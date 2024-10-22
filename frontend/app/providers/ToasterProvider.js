"use client"; // Indicates that the following code should only run on the client-side.

import { Toaster } from "react-hot-toast"; // Import a toaster from React Hot Toast library.

// Defines a provider which can further be reused to nofify users of anything there is a need of.
const ToasterProvider = () => {
    return(
        <Toaster />
    );
}

// Exports the provider so that it can be reused elsewhere in the application.
export default ToasterProvider;