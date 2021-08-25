import React from 'react';

const Image = ({ image }: { image: string }): JSX.Element => (
  <div className="md:w-3/4 mx-auto bg-gray-800 rounded-md p-2">
    <div className="w-full">
      <img src={image} />
    </div>
  </div>
);

export default Image;
