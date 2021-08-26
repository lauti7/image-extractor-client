import React, { SyntheticEvent, useState } from 'react';
import { ImageResponse } from '../utils/interfaces';

const Image = ({ image }: { image: ImageResponse }): JSX.Element => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-md p-2">
      <div className="w-full h-3/4 rounded-md bg-white bg-opacity-10 flex flex-col justify-center items-center">
        <img
          onLoad={handleImageLoad}
          src={image.url}
          className="object-scale-down h-3/4 w-full"
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="px-1">{`${size.width} x ${size.height}`}</p>
        <p className="p-1 rounded bg-indigo-500 text-indigo-800">
          {image.type}
        </p>
      </div>
      <p className="text-sm text-gray-400">
        {image.name.length >= 34 ? `${image.name.slice(1, 20)}...` : image.name}
      </p>
    </div>
  );
};

export default Image;
