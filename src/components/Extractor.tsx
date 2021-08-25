import React, { useRef, useState } from 'react';
import isValidURL from '../utils/isValidURL';
import { extractImages } from '../utils/extractorAPI';
import ImagesLayout from './ImagesLayout';

const Extractor = (): JSX.Element => {
  const [images, setImages] = useState<Array<string>>([]);
  const [error, setError] = useState<{ error: boolean; message: string }>({
    error: false,
    message: '',
  });

  const webUrlInputRef = useRef<HTMLInputElement>(null);

  const handleExtract = () => {
    if (webUrlInputRef.current) {
      const url = webUrlInputRef.current.value;
      if (isValidURL(url)) {
        extractImages(url)
          .then((response) => {
            if (response.images) {
              setImages(response.images);
            }
          })
          .catch((err) => {
            setError({
              error: true,
              message: err.message,
            });
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
        <h2 className="text-lg text-center">
          Get images from any public website!
        </h2>
        <div className="md:w-3/4 mx-auto flex">
          <input
            type="text"
            className="text-gray-800 w-full rounded-md p-2 mx-1"
            placeholder="Enter URL"
            name="weburl"
            ref={webUrlInputRef}
          />
          <button
            className="bg-indigo-500 rounded-md mx-1 p-2"
            onClick={handleExtract}
          >
            EXTRACT
          </button>
        </div>
        <div className="md:w-3/4 mx-auto flex mt-2">
          <button className="mx-1 text-gray-400 underline">Settings</button>
        </div>
      </div>
      <ImagesLayout images={images} />
    </>
  );
};

export default Extractor;
