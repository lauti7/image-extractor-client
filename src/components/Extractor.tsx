import React, { useRef, useState } from 'react';

const Extractor = (): JSX.Element => {

  const webUrlInputRef = useRef<HTMLInputElement>(null)

  const handleExtract = () => {
    if (webUrlInputRef.current) {
      const url = webUrlInputRef.current.value
      const regularURLRegex = new RegExp(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
      );

      if (regularURLRegex.test(url)) {
        
      }



    }
  }

  return (
    <div className="md:w-1/2 md:mx-auto bg-gray-800 rounded-md pb-2 px-1 mt-4">
      <h2 className="text-lg text-center">Get images from any public website!</h2>
      <div className="md:w-3/4 mx-auto flex">
        <input 
          type="text" 
          className="text-gray-800 w-full rounded-md p-2 mx-1"
          placeholder="Enter URL"
          name="weburl"
          ref={webUrlInputRef} 
        />
        <button className="bg-indigo-500 rounded-md mx-1 p-2">EXTRACT</button>
      </div>
      <div className="md:w-3/4 mx-auto flex mt-2">
        <button className="mx-1 text-gray-400 underline">Settings</button>
      </div>
    </div>
  )
}

export default Extractor;