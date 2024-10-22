"use client"; // Indicates that the following code should only run on the client-side.
import Market from "../../../frontend/containers/Market"; // Imports Market component from a local file.


export default function market() {
  return (
      // Renders the Market component to display it.
      <div className="dark:bg-black">
        <Market /> 
      </div>
  )
}