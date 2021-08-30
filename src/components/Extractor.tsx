import React, { useRef, useState } from 'react';
import isValidURL from '../utils/isValidURL';
import { extractImages } from '../utils/extractorAPI';
import { ImageResponse } from '../utils/interfaces';
import ImagesLayout from './ImagesLayout';

const Extractor = (): JSX.Element => {
  const [images, setImages] = useState<Array<ImageResponse>>([]);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });
  const [serverMessage, setServerMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const webUrlInputRef = useRef<HTMLInputElement>(null);

  const handleExtract = () => {
    setError({
      error: false,
      message: '',
    });
    if (webUrlInputRef.current) {
      const url = webUrlInputRef.current.value;
      if (isValidURL(url)) {
        setLoading(true);
        extractImages(url)
          .then((response) => {
            if (response.images) {
              setImages(response.images);
            }

            if (response.message) {
              setServerMessage(response.message);
            }

            setLoading(false);
          })
          .catch((err) => {
            setError({
              error: true,
              message: err.message,
            });
            setLoading(false);
          });
      } else {
        setError({
          error: true,
          message: 'You must enter a valid URL',
        });
      }
    }
  };

  return (
    <>
      <div className="md:w-1/2 md:mx-auto bg-gray-800 rounded-md pb-2 px-1 mt-4">
        <h2 className="md:text-lg text-center">
          Get images from any public website!
        </h2>
        <div className="md:w-3/4 mx-auto flex">
          <input
            type="text"
            className="text-sm md:text-base text-gray-800 w-full rounded-md p-2 mx-1 focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter URL"
            name="weburl"
            ref={webUrlInputRef}
          />
          <button
            className="text-sm md:text-base bg-indigo-500 rounded-md mx-1 p-2 w-1/6"
            onClick={handleExtract}
          >
            {loading ? (
              <span className="flex justify-center">
                <svg
                  className="animate-spin mr-1 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : (
              'Extract'
            )}
          </button>
        </div>
        {error.error && (
          <p className="text-center text-red-400 font-bold fade-in">
            {error.message}
          </p>
        )}
      </div>
      <ImagesLayout images={images} serverMessage={serverMessage} />
    </>
  );
};

export default Extractor;
