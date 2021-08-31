import React, { SyntheticEvent, useState } from 'react';
import { ImageResponse } from '../utils/interfaces';
import downloadIcon from '../assets/download.svg';
import { downloadSingleImage } from '../utils/extractorAPI';

const Image = ({ image }: { image: ImageResponse }): JSX.Element => {
  const [downloadingError, setDownloadingError] = useState<{
    error: boolean;
    message: string;
  }>({
    error: false,
    message: '',
  });
  const [size, setSize] = useState<{ width: number; height: number }>({
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
      .catch((responseError) => {
        if (responseError.error && responseError.message) {
          setDownloadingError({
            error: true,
            message:
              "something went wrong while getting your image. Try with 'Go to' button instead.",
          });
        } else {
          setDownloadingError({
            error: true,
            message:
              "unexpected error while downloading your image. Try with 'Go to' button instead.",
          });
        }

        setTimeout(() => {
          setDownloadingError({
            error: false,
            message: '',
          });
        }, 2000);
      });
  };

  const handleInvert = () => {
    setInverted(!inverted);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-md p-2 w-3/4 mx-auto md:w-full md:mx-none">
      <div
        data-testid="img-bg"
        className={`w-full h-3/4 rounded-md bg-white ${
          inverted ? '' : 'bg-opacity-10'
        } flex flex-col justify-center items-center`}
      >
        {downloadingError.error && downloadingError.message ? (
          <p className="text-sm text-center text-red-400 fade-in">
            {downloadingError.message}
          </p>
        ) : (
          <img
            data-testid="img"
            onLoad={handleImageLoad}
            src={image.url}
            className="object-scale-down md:h-3/4 md:w-full fade-in"
          />
        )}
      </div>
      <div className="flex justify-between items-center mt-2">
        <p
          data-testid="img-size"
          className="px-1"
        >{`${size.width} x ${size.height}`}</p>
        <p className="p-1 rounded bg-indigo-500 bg-opacity-50 text-indigo-200 font-bold">
          {image.type}
        </p>
      </div>
      <p className="text-sm text-gray-400">
        {image.name.length >= 34 ? `${image.name.slice(1, 20)}...` : image.name}
      </p>
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex flex-col">
          <button
            data-testid="download-btn"
            type="button"
            onClick={handleDownloadImage}
          >
            <img data-testid="img-download" width="24" src={downloadIcon} />
          </button>
          <a href={image.url} target="_blank" className="underline text-sm">
            Go to
          </a>
        </div>
        <button
          type="button"
          className="p-1 h-3/4 bg-indigo-500 rounded-md justify-between text-sm hover:bg-indigo-800"
          onClick={handleInvert}
        >
          Invert Background
        </button>
      </div>
    </div>
  );
};

export default Image;
