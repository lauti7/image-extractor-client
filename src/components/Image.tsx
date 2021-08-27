import React, { SyntheticEvent, useState } from 'react';
import { ImageResponse } from '../utils/interfaces';
import downloadIcon from '../assets/download.svg';
import { downloadSingleImage } from '../utils/extractorAPI';

const Image = ({ image }: { image: ImageResponse }): JSX.Element => {
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

  const [inverted, setInverted] = useState<boolean>(false);

  const handleImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setSize({
      width: event.currentTarget.naturalWidth,
      height: event.currentTarget.naturalHeight,
    });
  };

  const handleDownloadImage = () => {
    downloadSingleImage(image.url)
      .then((img) => {
        const imageURL = URL.createObjectURL(img);
        const link = document.createElement('a');
        link.href = imageURL;
        link.download = image.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInvert = () => {
    setInverted(!inverted);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-md p-2">
      <div
        className={`w-full h-3/4 rounded-md bg-white ${
          inverted ? '' : 'bg-opacity-10'
        } flex flex-col justify-center items-center`}
      >
        <img
          onLoad={handleImageLoad}
          src={image.url}
          className="object-scale-down h-3/4 w-full"
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <p className="px-1">{`${size.width} x ${size.height}`}</p>
        <p className="p-1 rounded bg-indigo-500 bg-opacity-50 text-indigo-200 font-bold">
          {image.type}
        </p>
      </div>
      <p className="text-sm text-gray-400">
        {image.name.length >= 34 ? `${image.name.slice(1, 20)}...` : image.name}
      </p>
      <div className="flex justify-between w-full mt-2">
        <button type="button" onClick={handleDownloadImage}>
          <img width="24" src={downloadIcon} />
        </button>
        <button
          type="button"
          className="p-1 bg-indigo-500 rounded-md justify-between text-sm"
          onClick={handleInvert}
        >
          Invert Background
        </button>
      </div>
    </div>
  );
};

export default Image;
