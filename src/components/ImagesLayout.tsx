import React from 'react';
import Image from './Image';
import { ImageResponse } from '../utils/interfaces';

const ImagesLayout = ({
  images,
  serverMessage,
}: {
  images: ImageResponse[];
  serverMessage: string;
}): JSX.Element => {
  return (
    <>
      {images.length > 0 ? (
        <div
          data-testid="images-layout"
          className="grid grid-cols-1 md:grid-cols-6 gap-2 grid-flow-row auto-rows-fr mt-2"
        >
          {images.map((img) => (
            <Image key={img.fileName} image={img} />
          ))}
        </div>
      ) : serverMessage ? (
        <h3
          data-testid="server-message"
          className="mt-2 md:text-xl text-lg text-center"
        >
          {serverMessage}
        </h3>
      ) : null}
    </>
  );
};

export default ImagesLayout;
