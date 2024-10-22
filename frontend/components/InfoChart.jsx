import React from 'react' // Imports the React library.

// Defines the InfoChart functional component with props `data` and `whichOne`.
const InfoChart = ({data, whichOne}) => {
  // Returns JSX for rendering the component.
  return (
    // A div that serves as the container for the component, styled with TailwindCSS classes for width, height, border, border color, and rounded corners.
    <div className="w-1/5 h-[67px] border-2 rounded-2xl border-yellow grid-rows-2">
      <div className="pl-3"> {/* Padding is added to the left of the inner div. */}
        <div className='pt-[11px] text-white text-md font-semibold'> {/* Styling for the data presentation. */}
          <p>{data}</p> {/* Displays the `data` prop inside a paragraph element. */}
        </div>
        <div className="text-white text-xs font-medium">  {/* Styling for the label of the data. */}
          <p>{whichOne}</p> {/*  Displays the `whichOne` prop inside a paragraph element. */}
        </div>
      </div>
    </div>
  )
}

export default InfoChart; // Exports the InfoChart component for use in other parts of the application.
